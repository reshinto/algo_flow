package main

import "testing"

func TestFibonacciSearchFindsValuePresent(t *testing.T) {
	result := fibonacciSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 38)
	if result != 6 {
		t.Errorf("expected 6, got %d", result)
	}
}

func TestFibonacciSearchReturnsMinusOneWhenNotFound(t *testing.T) {
	result := fibonacciSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 50)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestFibonacciSearchHandlesEmptyArray(t *testing.T) {
	result := fibonacciSearch([]int{}, 5)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestFibonacciSearchSingleElementFound(t *testing.T) {
	result := fibonacciSearch([]int{42}, 42)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestFibonacciSearchSingleElementNotFound(t *testing.T) {
	result := fibonacciSearch([]int{42}, 10)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestFibonacciSearchFindsFirstElement(t *testing.T) {
	result := fibonacciSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 2)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestFibonacciSearchFindsLastElement(t *testing.T) {
	result := fibonacciSearch([]int{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 91)
	if result != 9 {
		t.Errorf("expected 9, got %d", result)
	}
}

func TestFibonacciSearchFindsMiddleElement(t *testing.T) {
	result := fibonacciSearch([]int{10, 20, 30, 40, 50}, 30)
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestFibonacciSearchReturnsMinusOneForValueSmallerThanAll(t *testing.T) {
	result := fibonacciSearch([]int{5, 10, 15, 20}, 1)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestFibonacciSearchReturnsMinusOneForValueLargerThanAll(t *testing.T) {
	result := fibonacciSearch([]int{5, 10, 15, 20}, 100)
	if result != -1 {
		t.Errorf("expected -1, got %d", result)
	}
}

func TestFibonacciSearchHandlesNegativeNumbers(t *testing.T) {
	result := fibonacciSearch([]int{-10, -5, 0, 3, 7}, -5)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestFibonacciSearchFindsSecondElementInTwoElementArray(t *testing.T) {
	result := fibonacciSearch([]int{1, 2}, 2)
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestFibonacciSearchFindsFirstElementInTwoElementArray(t *testing.T) {
	result := fibonacciSearch([]int{1, 2}, 1)
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}
