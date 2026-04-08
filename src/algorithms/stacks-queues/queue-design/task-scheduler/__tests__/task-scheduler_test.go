package main

import "testing"

func TestTaskSchedulerCanonicalExample(t *testing.T) {
	if taskSchedulerQueue([]string{"A", "A", "A", "B", "B", "B"}, 2) != 8 {
		t.Errorf("expected 8")
	}
}

func TestTaskSchedulerDenseTasksNoIdle(t *testing.T) {
	if taskSchedulerQueue([]string{"A", "A", "B", "B", "C", "C"}, 1) != 6 {
		t.Errorf("expected 6")
	}
}

func TestTaskSchedulerZeroCooldown(t *testing.T) {
	if taskSchedulerQueue([]string{"A", "A", "A", "B", "B", "B"}, 0) != 6 {
		t.Errorf("expected 6")
	}
}

func TestTaskSchedulerSingleTypeHighCooldown(t *testing.T) {
	if taskSchedulerQueue([]string{"A", "A", "A"}, 100) != 203 {
		t.Errorf("expected 203")
	}
}

func TestTaskSchedulerSingleTask(t *testing.T) {
	if taskSchedulerQueue([]string{"A"}, 5) != 1 {
		t.Errorf("expected 1")
	}
}

func TestTaskSchedulerTwoTypesEqualFrequency(t *testing.T) {
	if taskSchedulerQueue([]string{"A", "A", "B", "B"}, 2) != 5 {
		t.Errorf("expected 5")
	}
}

func TestTaskSchedulerAllIdenticalZeroCooldown(t *testing.T) {
	if taskSchedulerQueue([]string{"A", "A", "A", "A"}, 0) != 4 {
		t.Errorf("expected 4")
	}
}

func TestTaskSchedulerAllDistinctFillsSlots(t *testing.T) {
	distinctTasks := make([]string, 26)
	for charIdx := range distinctTasks {
		distinctTasks[charIdx] = string(rune('A' + charIdx))
	}
	if taskSchedulerQueue(distinctTasks, 25) != 26 {
		t.Errorf("expected 26")
	}
}
