package findallduplicates

import (
	"reflect"
	"sort"
	"testing"
)

func TestDefaultInput(t *testing.T) {
	result := findAllDuplicates([]int{4, 3, 2, 7, 8, 2, 3, 1})
	sort.Ints(result)
	if !reflect.DeepEqual(result, []int{2, 3}) {
		t.Errorf("Expected [2 3], got %v", result)
	}
}

func TestNoDuplicates(t *testing.T) {
	result := findAllDuplicates([]int{1, 2, 3, 4, 5})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestSingleDuplicate(t *testing.T) {
	result := findAllDuplicates([]int{1, 2, 3, 2})
	if !reflect.DeepEqual(result, []int{2}) {
		t.Errorf("Expected [2], got %v", result)
	}
}

func TestMultipleDuplicates(t *testing.T) {
	result := findAllDuplicates([]int{1, 1, 2, 2, 3, 3})
	sort.Ints(result)
	if !reflect.DeepEqual(result, []int{1, 2, 3}) {
		t.Errorf("Expected [1 2 3], got %v", result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := findAllDuplicates([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestAllAppearTwice(t *testing.T) {
	result := findAllDuplicates([]int{2, 1, 2, 1})
	sort.Ints(result)
	if !reflect.DeepEqual(result, []int{1, 2}) {
		t.Errorf("Expected [1 2], got %v", result)
	}
}
