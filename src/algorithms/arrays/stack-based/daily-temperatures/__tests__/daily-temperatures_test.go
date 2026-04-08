package dailytemperatures

import (
	"reflect"
	"testing"
)

func TestDefaultInput(t *testing.T) {
	result := dailyTemperatures([]int{73, 74, 75, 71, 69, 72, 76, 73})
	expected := []int{1, 1, 4, 2, 1, 1, 0, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestStrictlyDecreasing(t *testing.T) {
	result := dailyTemperatures([]int{5, 4, 3, 2, 1})
	expected := []int{0, 0, 0, 0, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestStrictlyIncreasing(t *testing.T) {
	result := dailyTemperatures([]int{1, 2, 3, 4, 5})
	expected := []int{1, 1, 1, 1, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAllEqual(t *testing.T) {
	result := dailyTemperatures([]int{5, 5, 5, 5})
	expected := []int{0, 0, 0, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestSingleDay(t *testing.T) {
	result := dailyTemperatures([]int{72})
	expected := []int{0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := dailyTemperatures([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestTwoDaysSecondWarmer(t *testing.T) {
	result := dailyTemperatures([]int{60, 70})
	expected := []int{1, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestIncreasingSequence(t *testing.T) {
	result := dailyTemperatures([]int{30, 40, 50, 60})
	expected := []int{1, 1, 1, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}
