// Task Scheduler — greedy formula with cooldown queue simulation (LeetCode 621)
function taskSchedulerQueue(tasks: string[], cooldown: number): number {
  const freqMap: Map<string, number> = new Map(); // @step:initialize
  for (const task of tasks) {
    // @step:initialize
    freqMap.set(task, (freqMap.get(task) ?? 0) + 1); // @step:initialize
  }

  let maxFreq = 0; // @step:initialize
  let maxFreqCount = 0; // @step:initialize

  for (const freq of freqMap.values()) {
    // @step:visit
    if (freq > maxFreq) {
      // @step:compare
      maxFreq = freq; // @step:compare
      maxFreqCount = 1; // @step:compare
    } else if (freq === maxFreq) {
      // @step:compare
      maxFreqCount++; // @step:compare
    }
  }

  // Queue holds [taskName, remainingFreq, availableAtTime] for cooling-down tasks
  const cooldownQueue: [string, number, number][] = []; // @step:enqueue

  // Sorted descending by frequency — acts as a max-heap
  const taskHeap = Array.from(freqMap.entries())
    .map(([task, freq]) => ({ task, freq }))
    .sort((entryA, entryB) => entryB.freq - entryA.freq); // @step:enqueue

  let currentTime = 0; // @step:enqueue

  while (taskHeap.length > 0 || cooldownQueue.length > 0) {
    // @step:visit
    currentTime++; // @step:visit

    // Release tasks from the cooldown queue when their wait is over
    const nextEntry = cooldownQueue[0]; // @step:dequeue
    if (nextEntry !== undefined && nextEntry[2] <= currentTime) {
      // @step:dequeue
      cooldownQueue.shift(); // @step:dequeue
      taskHeap.push({ task: nextEntry[0], freq: nextEntry[1] }); // @step:dequeue
      taskHeap.sort((entryA, entryB) => entryB.freq - entryA.freq); // @step:dequeue
    }

    // Execute the highest-frequency available task and enqueue it to cool down
    const topEntry = taskHeap.shift(); // @step:enqueue
    if (topEntry !== undefined) {
      // @step:enqueue
      const remainingFreq = topEntry.freq - 1; // @step:enqueue
      if (remainingFreq > 0) {
        // @step:enqueue
        cooldownQueue.push([topEntry.task, remainingFreq, currentTime + cooldown + 1]); // @step:enqueue
      }
    }
  }

  // Greedy formula — closed-form solution is equivalent to the simulation result
  const formulaResult = (maxFreq - 1) * (cooldown + 1) + maxFreqCount; // @step:complete
  return Math.max(tasks.length, formulaResult); // @step:complete
}
