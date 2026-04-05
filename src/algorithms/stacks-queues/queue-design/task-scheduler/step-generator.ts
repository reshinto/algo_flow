/** Step generator for Task Scheduler — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TASK_SCHEDULER!);

export interface TaskSchedulerInput {
  tasks: string[];
  cooldown: number;
}

export function generateTaskSchedulerSteps(input: TaskSchedulerInput): ExecutionStep[] {
  const { tasks, cooldown } = input;

  // Build frequency map
  const freqMap = new Map<string, number>();
  for (const task of tasks) {
    freqMap.set(task, (freqMap.get(task) ?? 0) + 1);
  }

  let maxFreq = 0;
  let maxFreqCount = 0;
  for (const freq of freqMap.values()) {
    if (freq > maxFreq) {
      maxFreq = freq;
      maxFreqCount = 1;
    } else if (freq === maxFreq) {
      maxFreqCount++;
    }
  }

  const formulaResult = (maxFreq - 1) * (cooldown + 1) + maxFreqCount;
  const totalTime = Math.max(tasks.length, formulaResult);

  const tracker = new QueueTracker([], TS_LINE_MAP);

  tracker.initialize({
    tasks: [...tasks],
    cooldown,
    maxFreq,
    maxFreqCount,
    formulaResult,
    totalTime,
  });

  // Simulate round-robin scheduling across frames to show the queue in action
  // cooldownWaiting entries store the remaining frequency alongside the availability time
  const cooldownWaiting: Array<{ task: string; remainingFreq: number; availableAt: number }> = [];

  // Ready tasks sorted descending by remaining frequency (acts as a max-heap)
  const readyTasks: Array<{ task: string; freq: number }> = Array.from(freqMap.entries()).map(
    ([task, freq]) => ({ task, freq }),
  );
  readyTasks.sort((entryA, entryB) => entryB.freq - entryA.freq);

  let currentTime = 0;

  // Visit each unique task to show frequency counting phase
  for (const [task, freq] of freqMap.entries()) {
    tracker.processElement(0, {
      task,
      freq,
      maxFreq,
      maxFreqCount,
      freqSnapshot: Object.fromEntries(freqMap),
    });
  }

  // Simulate scheduling with queue visualization
  while (readyTasks.length > 0 || cooldownWaiting.length > 0) {
    currentTime++;

    // Release tasks from the cooldown waiting area when their cooldown has elapsed
    const readyIdx = cooldownWaiting.findIndex((entry) => entry.availableAt <= currentTime);
    if (readyIdx !== -1) {
      const releasedEntry = cooldownWaiting.splice(readyIdx, 1)[0]!;
      readyTasks.push({ task: releasedEntry.task, freq: releasedEntry.remainingFreq });
      readyTasks.sort((entryA, entryB) => entryB.freq - entryA.freq);
      tracker.dequeue(
        {
          currentTime,
          releasedTask: releasedEntry.task,
          releasedFreq: releasedEntry.remainingFreq,
          cooldownQueueSize: cooldownWaiting.length,
          readyQueueSize: readyTasks.length,
        },
        `Release task '${releasedEntry.task}' from cooldown — available at time ${currentTime}`,
      );
    }

    // Execute the highest-frequency ready task and enqueue it to cool down if still needed
    const topEntry = readyTasks.shift();
    if (topEntry !== undefined) {
      const newFreq = topEntry.freq - 1;

      if (newFreq > 0) {
        const availableAt = currentTime + cooldown + 1;
        cooldownWaiting.push({ task: topEntry.task, remainingFreq: newFreq, availableAt });
        tracker.enqueue(
          topEntry.task,
          {
            currentTime,
            executedTask: topEntry.task,
            remainingFreq: newFreq,
            cooldownUntil: availableAt,
            cooldownQueueSize: cooldownWaiting.length,
            readyQueueSize: readyTasks.length,
          },
          `Execute task '${topEntry.task}' at time ${currentTime} — enqueue to cooldown until time ${availableAt}`,
        );
      } else {
        tracker.enqueue(
          topEntry.task,
          {
            currentTime,
            executedTask: topEntry.task,
            remainingFreq: 0,
            cooldownQueueSize: cooldownWaiting.length,
            readyQueueSize: readyTasks.length,
          },
          `Execute task '${topEntry.task}' at time ${currentTime} — all occurrences complete`,
        );
      }
    }
  }

  tracker.complete(
    {
      totalTime,
      formulaResult,
      tasksLength: tasks.length,
      maxFreq,
      maxFreqCount,
      cooldown,
    },
    `Scheduling complete — minimum intervals: max(${tasks.length}, (${maxFreq}-1)×(${cooldown}+1)+${maxFreqCount}) = ${totalTime}`,
  );

  return tracker.getSteps();
}
