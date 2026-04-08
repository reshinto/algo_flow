package main

import "testing"

func TestMinStackDefault(t *testing.T) {
	if minStack([]int{5, 3, 7, 1, 8}) != 1 {
		t.Errorf("expected 1")
	}
}

func TestMinStackAscending(t *testing.T) {
	if minStack([]int{1, 2, 3}) != 1 {
		t.Errorf("expected 1")
	}
}

func TestMinStackDescending(t *testing.T) {
	if minStack([]int{3, 2, 1}) != 1 {
		t.Errorf("expected 1")
	}
}

func TestMinStackSingleElement(t *testing.T) {
	if minStack([]int{42}) != 42 {
		t.Errorf("expected 42")
	}
}

func TestMinStackAllEqual(t *testing.T) {
	if minStack([]int{7, 7, 7}) != 7 {
		t.Errorf("expected 7")
	}
}

func TestMinStackNegativeNumbers(t *testing.T) {
	if minStack([]int{5, -3, 2, -1}) != -3 {
		t.Errorf("expected -3")
	}
}

func TestMinStackMinFirst(t *testing.T) {
	if minStack([]int{1, 5, 10, 20}) != 1 {
		t.Errorf("expected 1")
	}
}

func TestMinStackMinLast(t *testing.T) {
	if minStack([]int{20, 10, 5, 1}) != 1 {
		t.Errorf("expected 1")
	}
}
