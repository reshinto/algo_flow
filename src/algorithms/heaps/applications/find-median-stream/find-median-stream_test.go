package heaps

import (
	"testing"
)

func TestFindMedianStreamDefault(t *testing.T) {
	result := findMedianStream([]int{5, 2, 8, 1, 9, 3, 7})
	expected := []float64{5, 3.5, 5, 3.5, 5, 4, 5}
	if len(result) != len(expected) {
		t.Fatalf("Expected length %d, got %d", len(expected), len(result))
	}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("Index %d: expected %v, got %v", idx, val, result[idx])
		}
	}
}

func TestFindMedianStreamSingleElement(t *testing.T) {
	result := findMedianStream([]int{42})
	if len(result) != 1 || result[0] != 42.0 {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestFindMedianStreamTwoElements(t *testing.T) {
	result := findMedianStream([]int{3, 7})
	expected := []float64{3, 5}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("Index %d: expected %v, got %v", idx, val, result[idx])
		}
	}
}

func TestFindMedianStreamAllIdentical(t *testing.T) {
	result := findMedianStream([]int{4, 4, 4, 4})
	for idx, val := range result {
		if val != 4.0 {
			t.Errorf("Index %d: expected 4.0, got %v", idx, val)
		}
	}
}

func TestFindMedianStreamAscending(t *testing.T) {
	result := findMedianStream([]int{1, 2, 3, 4, 5})
	expected := []float64{1, 1.5, 2, 2.5, 3}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("Index %d: expected %v, got %v", idx, val, result[idx])
		}
	}
}

func TestFindMedianStreamDescending(t *testing.T) {
	result := findMedianStream([]int{5, 4, 3, 2, 1})
	expected := []float64{5, 4.5, 4, 3.5, 3}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("Index %d: expected %v, got %v", idx, val, result[idx])
		}
	}
}

func TestFindMedianStreamNegativeNumbers(t *testing.T) {
	result := findMedianStream([]int{-5, -1, -3})
	expected := []float64{-5, -3, -3}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("Index %d: expected %v, got %v", idx, val, result[idx])
		}
	}
}

func TestFindMedianStreamMixed(t *testing.T) {
	result := findMedianStream([]int{-2, 0, 2})
	expected := []float64{-2, -1, 0}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("Index %d: expected %v, got %v", idx, val, result[idx])
		}
	}
}

func TestFindMedianStreamOddLength(t *testing.T) {
	result := findMedianStream([]int{1, 3, 5, 7, 9})
	expected := []float64{1, 2, 3, 4, 5}
	for idx, val := range expected {
		if result[idx] != val {
			t.Errorf("Index %d: expected %v, got %v", idx, val, result[idx])
		}
	}
}

func TestFindMedianStreamTwoEqualValues(t *testing.T) {
	result := findMedianStream([]int{7, 7})
	if len(result) != 2 || result[0] != 7.0 || result[1] != 7.0 {
		t.Errorf("Expected [7, 7], got %v", result)
	}
}
