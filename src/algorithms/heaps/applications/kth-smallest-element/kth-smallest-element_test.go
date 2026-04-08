package heaps

import "testing"

func TestKthSmallestElement3rd(t *testing.T) {
	if kthSmallestElement([]int{7, 10, 4, 3, 20, 15, 8}, 3) != 7 {
		t.Error("Expected 7")
	}
}

func TestKthSmallestElement1st(t *testing.T) {
	if kthSmallestElement([]int{7, 10, 4, 3, 20, 15, 8}, 1) != 3 {
		t.Error("Expected 3")
	}
}

func TestKthSmallestElementLast(t *testing.T) {
	if kthSmallestElement([]int{7, 10, 4, 3, 20, 15, 8}, 7) != 20 {
		t.Error("Expected 20")
	}
}

func TestKthSmallestElementSingle(t *testing.T) {
	if kthSmallestElement([]int{42}, 1) != 42 {
		t.Error("Expected 42")
	}
}

func TestKthSmallestElementDuplicates(t *testing.T) {
	if kthSmallestElement([]int{5, 5, 5, 5}, 2) != 5 {
		t.Error("Expected 5")
	}
}

func TestKthSmallestElementNegative(t *testing.T) {
	if kthSmallestElement([]int{-1, -5, -3, -2, -4}, 2) != -4 {
		t.Error("Expected -4")
	}
}

func TestKthSmallestElementTwo(t *testing.T) {
	if kthSmallestElement([]int{10, 20}, 2) != 20 {
		t.Error("Expected 20")
	}
}

func TestKthSmallestElement2nd(t *testing.T) {
	if kthSmallestElement([]int{7, 10, 4, 3, 20, 15, 8}, 2) != 4 {
		t.Error("Expected 4")
	}
}
