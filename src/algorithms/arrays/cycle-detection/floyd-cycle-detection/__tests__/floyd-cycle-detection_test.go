package floydcycledetection

import "testing"

func TestDefaultInput(t *testing.T) {
	hasCycle, cycleStart := floydCycleDetection([]int{1, 3, 4, 2, 2})
	if !hasCycle {
		t.Error("Expected hasCycle=true")
	}
	if cycleStart != 2 {
		t.Errorf("Expected cycleStart=2, got %d", cycleStart)
	}
}

func TestCycleStart3(t *testing.T) {
	hasCycle, cycleStart := floydCycleDetection([]int{3, 1, 3, 4, 2})
	if !hasCycle {
		t.Error("Expected hasCycle=true")
	}
	if cycleStart != 3 {
		t.Errorf("Expected cycleStart=3, got %d", cycleStart)
	}
}

func TestMinimalCycle(t *testing.T) {
	hasCycle, cycleStart := floydCycleDetection([]int{1, 1})
	if !hasCycle {
		t.Error("Expected hasCycle=true")
	}
	if cycleStart != 1 {
		t.Errorf("Expected cycleStart=1, got %d", cycleStart)
	}
}

func TestEmptyArray(t *testing.T) {
	hasCycle, cycleStart := floydCycleDetection([]int{})
	if hasCycle {
		t.Error("Expected hasCycle=false")
	}
	if cycleStart != -1 {
		t.Errorf("Expected cycleStart=-1, got %d", cycleStart)
	}
}

func TestCycleStartIsValidIndex(t *testing.T) {
	testCases := [][]int{
		{1, 3, 4, 2, 2},
		{3, 1, 3, 4, 2},
		{1, 1},
	}
	for _, testCase := range testCases {
		hasCycle, cycleStart := floydCycleDetection(testCase)
		if !hasCycle {
			t.Error("Expected hasCycle=true")
		}
		if cycleStart < 0 || cycleStart >= len(testCase) {
			t.Errorf("cycleStart %d is out of bounds for array of length %d", cycleStart, len(testCase))
		}
	}
}
