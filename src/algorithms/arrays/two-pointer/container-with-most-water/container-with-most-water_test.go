package containerwithmostwater

import "testing"

func TestDefaultInput(t *testing.T) {
	maxArea, _, _ := containerWithMostWater([]int{1, 8, 6, 2, 5, 4, 8, 3, 7})
	if maxArea != 49 {
		t.Errorf("Expected maxArea=49, got %d", maxArea)
	}
}

func TestTwoEqualBars(t *testing.T) {
	maxArea, _, _ := containerWithMostWater([]int{1, 1})
	if maxArea != 1 {
		t.Errorf("Expected maxArea=1, got %d", maxArea)
	}
}

func TestAllEqualBars(t *testing.T) {
	maxArea, _, _ := containerWithMostWater([]int{5, 5, 5, 5})
	if maxArea != 15 {
		t.Errorf("Expected maxArea=15, got %d", maxArea)
	}
}

func TestSingleElement(t *testing.T) {
	maxArea, _, _ := containerWithMostWater([]int{7})
	if maxArea != 0 {
		t.Errorf("Expected maxArea=0 for single element, got %d", maxArea)
	}
}

func TestEmptyArray(t *testing.T) {
	maxArea, _, _ := containerWithMostWater([]int{})
	if maxArea != 0 {
		t.Errorf("Expected maxArea=0 for empty, got %d", maxArea)
	}
}

func TestMonotonicallyIncreasing(t *testing.T) {
	maxArea, _, _ := containerWithMostWater([]int{1, 2, 3, 4, 5})
	if maxArea != 6 {
		t.Errorf("Expected maxArea=6, got %d", maxArea)
	}
}

func TestAreaAtIndicesMatchesMax(t *testing.T) {
	heights := []int{1, 8, 6, 2, 5, 4, 8, 3, 7}
	maxArea, leftIndex, rightIndex := containerWithMostWater(heights)
	minHeight := heights[leftIndex]
	if heights[rightIndex] < minHeight {
		minHeight = heights[rightIndex]
	}
	computedArea := minHeight * (rightIndex - leftIndex)
	if computedArea != maxArea {
		t.Errorf("Area at indices (%d) != maxArea (%d)", computedArea, maxArea)
	}
}
