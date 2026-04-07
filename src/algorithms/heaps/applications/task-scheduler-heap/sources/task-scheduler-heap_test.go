package heaps

import "testing"

func TestTaskSchedulerHeapAAABBBCooldown2(t *testing.T) {
	if taskSchedulerHeap([]rune{'A', 'A', 'A', 'B', 'B', 'B'}, 2) != 8 {
		t.Error("Expected 8")
	}
}

func TestTaskSchedulerHeapAAABBBCooldown0(t *testing.T) {
	if taskSchedulerHeap([]rune{'A', 'A', 'A', 'B', 'B', 'B'}, 0) != 6 {
		t.Error("Expected 6")
	}
}

func TestTaskSchedulerHeapAAABBBCooldown1(t *testing.T) {
	if taskSchedulerHeap([]rune{'A', 'A', 'A', 'B', 'B', 'B'}, 1) != 6 {
		t.Error("Expected 6")
	}
}

func TestTaskSchedulerHeapSingleTypeCooldown(t *testing.T) {
	if taskSchedulerHeap([]rune{'A', 'A', 'A'}, 2) != 7 {
		t.Error("Expected 7")
	}
}

func TestTaskSchedulerHeapSingleTask(t *testing.T) {
	if taskSchedulerHeap([]rune{'A'}, 0) != 1 {
		t.Error("Expected 1")
	}
}

func TestTaskSchedulerHeapSingleTaskLargeCooldown(t *testing.T) {
	if taskSchedulerHeap([]rune{'A'}, 10) != 1 {
		t.Error("Expected 1")
	}
}

func TestTaskSchedulerHeapACABDB(t *testing.T) {
	if taskSchedulerHeap([]rune{'A', 'C', 'A', 'B', 'D', 'B'}, 1) != 6 {
		t.Error("Expected 6")
	}
}

func TestTaskSchedulerHeapManyTypesCooldown0(t *testing.T) {
	if taskSchedulerHeap([]rune{'A', 'B', 'C', 'D', 'E'}, 0) != 5 {
		t.Error("Expected 5")
	}
}
