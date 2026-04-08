package heaps

import "testing"

func TestKthLargestElement3rd(t *testing.T) {
	if kthLargestElement([]int{3, 1, 5, 12, 2, 11, 7, 9}, 3) != 9 {
		t.Error("Expected 9")
	}
}

func TestKthLargestElement1st(t *testing.T) {
	if kthLargestElement([]int{3, 1, 5, 12, 2, 11, 7, 9}, 1) != 12 {
		t.Error("Expected 12")
	}
}

func TestKthLargestElementLast(t *testing.T) {
	if kthLargestElement([]int{3, 1, 5, 12, 2, 11, 7, 9}, 8) != 1 {
		t.Error("Expected 1")
	}
}

func TestKthLargestElementSingle(t *testing.T) {
	if kthLargestElement([]int{42}, 1) != 42 {
		t.Error("Expected 42")
	}
}

func TestKthLargestElementDuplicates(t *testing.T) {
	if kthLargestElement([]int{5, 5, 5, 5}, 2) != 5 {
		t.Error("Expected 5")
	}
}

func TestKthLargestElementNegative(t *testing.T) {
	if kthLargestElement([]int{-1, -5, -3, -2, -4}, 2) != -2 {
		t.Error("Expected -2")
	}
}

func TestKthLargestElementTwo(t *testing.T) {
	if kthLargestElement([]int{10, 20}, 2) != 10 {
		t.Error("Expected 10")
	}
}

func TestKthLargestElement2nd(t *testing.T) {
	if kthLargestElement([]int{7, 10, 4, 3, 20, 15, 8}, 2) != 15 {
		t.Error("Expected 15")
	}
}
