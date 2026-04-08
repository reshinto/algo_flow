package foursum

import (
	"reflect"
	"testing"
)

func containsQuad(quads [][]int, target []int) bool {
	for _, quad := range quads {
		if reflect.DeepEqual(quad, target) {
			return true
		}
	}
	return false
}

func TestDefaultInput(t *testing.T) {
	result := fourSum([]int{1, 0, -1, 0, -2, 2}, 0)
	if len(result) != 3 {
		t.Errorf("Expected 3 quadruplets, got %d", len(result))
	}
	if !containsQuad(result, []int{-2, -1, 1, 2}) {
		t.Error("Missing [-2,-1,1,2]")
	}
	if !containsQuad(result, []int{-2, 0, 0, 2}) {
		t.Error("Missing [-2,0,0,2]")
	}
	if !containsQuad(result, []int{-1, 0, 0, 1}) {
		t.Error("Missing [-1,0,0,1]")
	}
}

func TestNoQuadruplets(t *testing.T) {
	result := fourSum([]int{1, 2, 3, 4}, 100)
	if len(result) != 0 {
		t.Errorf("Expected empty, got %d quadruplets", len(result))
	}
}

func TestAllZeroQuadruplet(t *testing.T) {
	result := fourSum([]int{0, 0, 0, 0}, 0)
	if len(result) != 1 {
		t.Errorf("Expected 1 quadruplet, got %d", len(result))
	}
	if !containsQuad(result, []int{0, 0, 0, 0}) {
		t.Error("Missing [0,0,0,0]")
	}
}

func TestFewerThanFourElements(t *testing.T) {
	result := fourSum([]int{1, 2, 3}, 6)
	if len(result) != 0 {
		t.Errorf("Expected empty for <4 elements, got %d", len(result))
	}
}

func TestEmptyInput(t *testing.T) {
	result := fourSum([]int{}, 0)
	if len(result) != 0 {
		t.Errorf("Expected empty for empty input, got %d", len(result))
	}
}

func TestNoDuplicatesWithRepeatedInput(t *testing.T) {
	result := fourSum([]int{0, 0, 0, 0, 0}, 0)
	if len(result) != 1 {
		t.Errorf("Expected 1 unique quadruplet, got %d", len(result))
	}
}

func TestAllSumsEqualTarget(t *testing.T) {
	result := fourSum([]int{1, 0, -1, 0, -2, 2}, 0)
	for _, quad := range result {
		quadSum := quad[0] + quad[1] + quad[2] + quad[3]
		if quadSum != 0 {
			t.Errorf("Quadruplet sum should be 0, got %d", quadSum)
		}
	}
}
