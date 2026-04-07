package main

import "testing"

func TestSetComplementElementsNotInA(t *testing.T) {
	result := setComplement([]int{2, 4, 6}, []int{1, 2, 3, 4, 5, 6, 7, 8})
	expected := []int{1, 3, 5, 7, 8}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetComplementEmptyAReturnsUniversal(t *testing.T) {
	result := setComplement([]int{}, []int{1, 2, 3})
	expected := []int{1, 2, 3}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetComplementAEqualsUniversalReturnsEmpty(t *testing.T) {
	result := setComplement([]int{1, 2, 3}, []int{1, 2, 3})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestSetComplementEmptyUniversalReturnsEmpty(t *testing.T) {
	result := setComplement([]int{1, 2, 3}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestSetComplementPreservesUniversalOrder(t *testing.T) {
	result := setComplement([]int{2}, []int{4, 3, 1, 5})
	expected := []int{4, 3, 1, 5}
	for elemIdx, val := range expected {
		if result[elemIdx] != val {
			t.Errorf("expected %v, got %v", expected, result)
			return
		}
	}
}

func TestSetComplementSingleElementNotInA(t *testing.T) {
	result := setComplement([]int{7}, []int{8})
	if len(result) != 1 || result[0] != 8 {
		t.Errorf("expected [8], got %v", result)
	}
}

func TestSetComplementSingleElementInA(t *testing.T) {
	result := setComplement([]int{7}, []int{7})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}
