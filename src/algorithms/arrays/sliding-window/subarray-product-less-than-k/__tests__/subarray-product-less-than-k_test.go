package subarrayproductlessthank

import "testing"

func TestDefaultInput(t *testing.T) {
	result := subarrayProductLessThanK([]int{10, 5, 2, 6, 1, 3}, 100)
	if result != 16 {
		t.Errorf("Expected 16, got %d", result)
	}
}

func TestThresholdZero(t *testing.T) {
	result := subarrayProductLessThanK([]int{1, 2, 3}, 0)
	if result != 0 {
		t.Errorf("Expected 0 for threshold=0, got %d", result)
	}
}

func TestThresholdOne(t *testing.T) {
	result := subarrayProductLessThanK([]int{1, 2, 3}, 1)
	if result != 0 {
		t.Errorf("Expected 0 for threshold=1, got %d", result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := subarrayProductLessThanK([]int{}, 100)
	if result != 0 {
		t.Errorf("Expected 0 for empty array, got %d", result)
	}
}

func TestThresholdFiltersMultiElement(t *testing.T) {
	result := subarrayProductLessThanK([]int{1, 2, 3, 4}, 5)
	if result != 5 {
		t.Errorf("Expected 5, got %d", result)
	}
}

func TestAllOnes(t *testing.T) {
	result := subarrayProductLessThanK([]int{1, 1, 1}, 2)
	if result != 6 {
		t.Errorf("Expected 6, got %d", result)
	}
}

func TestSingleElementBelowThreshold(t *testing.T) {
	result := subarrayProductLessThanK([]int{5}, 10)
	if result != 1 {
		t.Errorf("Expected 1, got %d", result)
	}
}

func TestSingleElementAtThreshold(t *testing.T) {
	result := subarrayProductLessThanK([]int{10}, 10)
	if result != 0 {
		t.Errorf("Expected 0, got %d", result)
	}
}

func TestLargeThresholdAllQualify(t *testing.T) {
	result := subarrayProductLessThanK([]int{1, 2, 3}, 1000)
	if result != 6 {
		t.Errorf("Expected 6, got %d", result)
	}
}
