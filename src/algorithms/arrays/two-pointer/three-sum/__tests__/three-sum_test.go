package threesum

import (
	"reflect"
	"testing"
)

func containsTriplet(triplets [][]int, target []int) bool {
	for _, triplet := range triplets {
		if reflect.DeepEqual(triplet, target) {
			return true
		}
	}
	return false
}

func TestDefaultInput(t *testing.T) {
	result := threeSum([]int{-1, 0, 1, 2, -1, -4})
	if len(result) != 2 {
		t.Errorf("Expected 2 triplets, got %d", len(result))
	}
	if !containsTriplet(result, []int{-1, -1, 2}) {
		t.Error("Missing [-1,-1,2]")
	}
	if !containsTriplet(result, []int{-1, 0, 1}) {
		t.Error("Missing [-1,0,1]")
	}
}

func TestNoTriplets(t *testing.T) {
	result := threeSum([]int{1, 2, 3})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %d triplets", len(result))
	}
}

func TestSingleZeroTriplet(t *testing.T) {
	result := threeSum([]int{0, 0, 0})
	if len(result) != 1 {
		t.Errorf("Expected 1 triplet, got %d", len(result))
	}
	if !containsTriplet(result, []int{0, 0, 0}) {
		t.Error("Missing [0,0,0]")
	}
}

func TestSingleElement(t *testing.T) {
	result := threeSum([]int{1})
	if len(result) != 0 {
		t.Errorf("Expected empty for single element, got %d", len(result))
	}
}

func TestEmptyInput(t *testing.T) {
	result := threeSum([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %d", len(result))
	}
}

func TestNoDuplicatesWithManyZeros(t *testing.T) {
	result := threeSum([]int{0, 0, 0, 0})
	if len(result) != 1 {
		t.Errorf("Expected 1 unique triplet, got %d", len(result))
	}
}

func TestAllSumsAreZero(t *testing.T) {
	result := threeSum([]int{-1, 0, 1, 2, -1, -4})
	for _, triplet := range result {
		tripletSum := triplet[0] + triplet[1] + triplet[2]
		if tripletSum != 0 {
			t.Errorf("Triplet sum should be 0, got %d", tripletSum)
		}
	}
}
