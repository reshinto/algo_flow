package trappingrainwater

import (
	"reflect"
	"testing"
)

func TestClassicExample(t *testing.T) {
	totalWater, _ := trappingRainWater([]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1})
	if totalWater != 6 {
		t.Errorf("Expected totalWater=6, got %d", totalWater)
	}
}

func TestEmptyArray(t *testing.T) {
	totalWater, waterPerIndex := trappingRainWater([]int{})
	if totalWater != 0 {
		t.Errorf("Expected totalWater=0, got %d", totalWater)
	}
	if !reflect.DeepEqual(waterPerIndex, []int{}) {
		t.Errorf("Expected empty waterPerIndex, got %v", waterPerIndex)
	}
}

func TestIncreasingNoWater(t *testing.T) {
	totalWater, _ := trappingRainWater([]int{1, 2, 3, 4, 5})
	if totalWater != 0 {
		t.Errorf("Expected totalWater=0 for increasing, got %d", totalWater)
	}
}

func TestDecreasingNoWater(t *testing.T) {
	totalWater, _ := trappingRainWater([]int{5, 4, 3, 2, 1})
	if totalWater != 0 {
		t.Errorf("Expected totalWater=0 for decreasing, got %d", totalWater)
	}
}

func TestSimpleValley(t *testing.T) {
	totalWater, waterPerIndex := trappingRainWater([]int{3, 0, 3})
	if totalWater != 3 {
		t.Errorf("Expected totalWater=3, got %d", totalWater)
	}
	if waterPerIndex[1] != 3 {
		t.Errorf("Expected waterPerIndex[1]=3, got %d", waterPerIndex[1])
	}
}

func TestPerIndexWater(t *testing.T) {
	totalWater, waterPerIndex := trappingRainWater([]int{0, 1, 0, 2})
	if waterPerIndex[2] != 1 {
		t.Errorf("Expected waterPerIndex[2]=1, got %d", waterPerIndex[2])
	}
	if totalWater != 1 {
		t.Errorf("Expected totalWater=1, got %d", totalWater)
	}
}

func TestMultipleValleys(t *testing.T) {
	totalWater, _ := trappingRainWater([]int{4, 2, 0, 3, 2, 5})
	if totalWater != 9 {
		t.Errorf("Expected totalWater=9, got %d", totalWater)
	}
}
