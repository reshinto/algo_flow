package largestrectanglehistogram

import "testing"

func TestDefaultInput(t *testing.T) {
	maxArea, leftIndex, rightIndex, height := largestRectangleHistogram([]int{2, 1, 5, 6, 2, 3})
	if maxArea != 10 {
		t.Errorf("Expected maxArea=10, got %d", maxArea)
	}
	if leftIndex != 2 {
		t.Errorf("Expected leftIndex=2, got %d", leftIndex)
	}
	if rightIndex != 3 {
		t.Errorf("Expected rightIndex=3, got %d", rightIndex)
	}
	if height != 5 {
		t.Errorf("Expected height=5, got %d", height)
	}
}

func TestEmptyArray(t *testing.T) {
	maxArea, leftIndex, rightIndex, _ := largestRectangleHistogram([]int{})
	if maxArea != 0 {
		t.Errorf("Expected maxArea=0, got %d", maxArea)
	}
	if leftIndex != -1 || rightIndex != -1 {
		t.Errorf("Expected leftIndex=-1, rightIndex=-1, got %d, %d", leftIndex, rightIndex)
	}
}

func TestSingleBar(t *testing.T) {
	maxArea, leftIndex, rightIndex, height := largestRectangleHistogram([]int{5})
	if maxArea != 5 {
		t.Errorf("Expected maxArea=5, got %d", maxArea)
	}
	if leftIndex != 0 || rightIndex != 0 {
		t.Errorf("Expected indices (0,0), got (%d,%d)", leftIndex, rightIndex)
	}
	if height != 5 {
		t.Errorf("Expected height=5, got %d", height)
	}
}

func TestAllEqualBars(t *testing.T) {
	maxArea, _, _, _ := largestRectangleHistogram([]int{3, 3, 3, 3})
	if maxArea != 12 {
		t.Errorf("Expected maxArea=12, got %d", maxArea)
	}
}

func TestStrictlyIncreasing(t *testing.T) {
	maxArea, _, _, _ := largestRectangleHistogram([]int{1, 2, 3, 4, 5})
	if maxArea != 9 {
		t.Errorf("Expected maxArea=9, got %d", maxArea)
	}
}

func TestValleyShape(t *testing.T) {
	maxArea, _, _, _ := largestRectangleHistogram([]int{5, 0, 5})
	if maxArea != 5 {
		t.Errorf("Expected maxArea=5, got %d", maxArea)
	}
}

func TestTwoTallBars(t *testing.T) {
	maxArea, _, _, _ := largestRectangleHistogram([]int{6, 6})
	if maxArea != 12 {
		t.Errorf("Expected maxArea=12, got %d", maxArea)
	}
}

func TestSpikeInMiddle(t *testing.T) {
	maxArea, _, _, _ := largestRectangleHistogram([]int{2, 10, 2})
	if maxArea != 10 {
		t.Errorf("Expected maxArea=10, got %d", maxArea)
	}
}
