// Task Scheduler — greedy formula with cooldown queue simulation (LeetCode 621)
package main

import (
	"fmt"
	"sort"
)

type taskEntry struct {
	taskName  string
	freq      int
}

type cooldownEntry struct {
	taskName    string
	remaining   int
	availableAt int
}

func taskSchedulerQueue(tasks []string, cooldown int) int {
	freqMap := map[string]int{} // @step:initialize
	for _, task := range tasks { // @step:initialize
		freqMap[task]++ // @step:initialize
	}

	maxFreq := 0 // @step:initialize
	maxFreqCount := 0 // @step:initialize

	for _, freq := range freqMap { // @step:visit
		if freq > maxFreq { // @step:compare
			maxFreq = freq // @step:compare
			maxFreqCount = 1 // @step:compare
		} else if freq == maxFreq { // @step:compare
			maxFreqCount++ // @step:compare
		}
	}

	// Queue holds {taskName, remaining, availableAt} for cooling-down tasks
	cooldownQueue := []cooldownEntry{} // @step:enqueue

	// Sorted descending by frequency — acts as a max-heap
	taskHeap := []taskEntry{}
	for name, freq := range freqMap {
		taskHeap = append(taskHeap, taskEntry{taskName: name, freq: freq})
	}
	sort.Slice(taskHeap, func(entryA, entryB int) bool {
		return taskHeap[entryA].freq > taskHeap[entryB].freq
	}) // @step:enqueue

	currentTime := 0 // @step:enqueue

	for len(taskHeap) > 0 || len(cooldownQueue) > 0 { // @step:visit
		currentTime++ // @step:visit

		// Release tasks from the cooldown queue when their wait is over
		if len(cooldownQueue) > 0 && cooldownQueue[0].availableAt <= currentTime { // @step:dequeue
			entry := cooldownQueue[0]
			cooldownQueue = cooldownQueue[1:] // @step:dequeue
			taskHeap = append(taskHeap, taskEntry{taskName: entry.taskName, freq: entry.remaining}) // @step:dequeue
			sort.Slice(taskHeap, func(entryA, entryB int) bool {
				return taskHeap[entryA].freq > taskHeap[entryB].freq
			}) // @step:dequeue
		}

		// Execute the highest-frequency available task and enqueue it to cool down
		if len(taskHeap) > 0 { // @step:enqueue
			topEntry := taskHeap[0]
			taskHeap = taskHeap[1:] // @step:enqueue
			remainingFreq := topEntry.freq - 1 // @step:enqueue
			if remainingFreq > 0 { // @step:enqueue
				cooldownQueue = append(cooldownQueue, cooldownEntry{taskName: topEntry.taskName, remaining: remainingFreq, availableAt: currentTime + cooldown + 1}) // @step:enqueue
			}
		}
	}

	// Greedy formula — closed-form solution is equivalent to the simulation result
	formulaResult := (maxFreq-1)*(cooldown+1) + maxFreqCount // @step:complete
	if len(tasks) > formulaResult {
		return len(tasks)
	}
	return formulaResult // @step:complete
}

func main() {
	tasks := []string{"A", "A", "A", "B", "B", "B"}
	fmt.Println(taskSchedulerQueue(tasks, 2))
}
