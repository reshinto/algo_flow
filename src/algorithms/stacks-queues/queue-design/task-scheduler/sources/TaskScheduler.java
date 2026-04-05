// Task Scheduler — greedy formula with cooldown queue simulation (LeetCode 621)
import java.util.*;

public class TaskScheduler {
    public static int taskSchedulerQueue(String[] tasks, int cooldown) {
        Map<String, Integer> freqMap = new HashMap<>(); // @step:initialize
        for (String task : tasks) { // @step:initialize
            freqMap.put(task, freqMap.getOrDefault(task, 0) + 1); // @step:initialize
        }

        int maxFreq = 0; // @step:initialize
        int maxFreqCount = 0; // @step:initialize

        for (int freq : freqMap.values()) { // @step:visit
            if (freq > maxFreq) { // @step:compare
                maxFreq = freq; // @step:compare
                maxFreqCount = 1; // @step:compare
            } else if (freq == maxFreq) { // @step:compare
                maxFreqCount++; // @step:compare
            }
        }

        // Queue holds [taskName, remainingFreq, availableAtTime] for cooling-down tasks
        Queue<int[]> cooldownQueue = new LinkedList<>(); // @step:enqueue

        // Sorted descending by frequency — acts as a max-heap
        List<int[]> taskHeap = new ArrayList<>(); // @step:enqueue
        for (Map.Entry<String, Integer> entry : freqMap.entrySet()) { // @step:enqueue
            taskHeap.add(new int[]{entry.getValue()}); // @step:enqueue
        }
        taskHeap.sort((entryA, entryB) -> entryB[0] - entryA[0]); // @step:enqueue

        int currentTime = 0; // @step:enqueue

        while (!taskHeap.isEmpty() || !cooldownQueue.isEmpty()) { // @step:visit
            currentTime++; // @step:visit

            // Release tasks from the cooldown queue when their wait is over
            if (!cooldownQueue.isEmpty() && cooldownQueue.peek()[2] <= currentTime) { // @step:dequeue
                int[] released = cooldownQueue.poll(); // @step:dequeue
                taskHeap.add(new int[]{released[1]}); // @step:dequeue
                taskHeap.sort((entryA, entryB) -> entryB[0] - entryA[0]); // @step:dequeue
            }

            // Execute the highest-frequency available task and enqueue it to cool down
            if (!taskHeap.isEmpty()) { // @step:enqueue
                int[] topEntry = taskHeap.remove(0); // @step:enqueue
                int remainingFreq = topEntry[0] - 1; // @step:enqueue
                if (remainingFreq > 0) { // @step:enqueue
                    cooldownQueue.add(new int[]{0, remainingFreq, currentTime + cooldown + 1}); // @step:enqueue
                }
            }
        }

        // Greedy formula — closed-form solution is equivalent to the simulation result
        int formulaResult = (maxFreq - 1) * (cooldown + 1) + maxFreqCount; // @step:complete
        return Math.max(tasks.length, formulaResult); // @step:complete
    }
}
