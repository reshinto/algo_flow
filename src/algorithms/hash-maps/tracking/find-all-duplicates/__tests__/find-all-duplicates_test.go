package main

import (
	"reflect"
	"testing"
)

func TestFindAllDuplicates_Returns2_3ForDefault(t *testing.T) {
	result := findAllDuplicates([]int{4, 3, 2, 7, 8, 2, 3, 1})
	if !reflect.DeepEqual(result, []int{2, 3}) {
		t.Errorf("expected [2, 3], got %v", result)
	}
}

func TestFindAllDuplicates_Returns1For1_1_2(t *testing.T) {
	result := findAllDuplicates([]int{1, 1, 2})
	if !reflect.DeepEqual(result, []int{1}) {
		t.Errorf("expected [1], got %v", result)
	}
}

func TestFindAllDuplicates_ReturnsEmptyForNoDuplicates(t *testing.T) {
	result := findAllDuplicates([]int{1, 2, 3})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestFindAllDuplicates_ReturnsEmptyForEmptyArray(t *testing.T) {
	result := findAllDuplicates([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestFindAllDuplicates_Returns5For5_5(t *testing.T) {
	result := findAllDuplicates([]int{5, 5})
	if !reflect.DeepEqual(result, []int{5}) {
		t.Errorf("expected [5], got %v", result)
	}
}

func TestFindAllDuplicates_Returns1_2For1_2_1_2(t *testing.T) {
	result := findAllDuplicates([]int{1, 2, 1, 2})
	if !reflect.DeepEqual(result, []int{1, 2}) {
		t.Errorf("expected [1, 2], got %v", result)
	}
}

func TestFindAllDuplicates_ReturnsEmptyForSingleElement(t *testing.T) {
	result := findAllDuplicates([]int{7})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestFindAllDuplicates_HandlesAllSameElements(t *testing.T) {
	result := findAllDuplicates([]int{3, 3, 3})
	if !reflect.DeepEqual(result, []int{3, 3}) {
		t.Errorf("expected [3, 3], got %v", result)
	}
}
