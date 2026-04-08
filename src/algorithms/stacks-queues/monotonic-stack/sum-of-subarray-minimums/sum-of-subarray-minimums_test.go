package main

import "testing"

func TestSumOfSubarrayMinimums3124(t *testing.T) {
	if sumOfSubarrayMinimums([]int64{3, 1, 2, 4}) != 17 {
		t.Errorf("expected 17")
	}
}

func TestSumOfSubarrayMinimumsLeetcodeExample(t *testing.T) {
	if sumOfSubarrayMinimums([]int64{11, 81, 94, 43, 3}) != 444 {
		t.Errorf("expected 444")
	}
}

func TestSumOfSubarrayMinimumsSingleElement(t *testing.T) {
	if sumOfSubarrayMinimums([]int64{5}) != 5 {
		t.Errorf("expected 5")
	}
}

func TestSumOfSubarrayMinimumsAllEqual(t *testing.T) {
	if sumOfSubarrayMinimums([]int64{2, 2, 2}) != 12 {
		t.Errorf("expected 12")
	}
}

func TestSumOfSubarrayMinimumsIncreasing(t *testing.T) {
	if sumOfSubarrayMinimums([]int64{1, 2, 3}) != 10 {
		t.Errorf("expected 10")
	}
}

func TestSumOfSubarrayMinimumsDecreasing(t *testing.T) {
	if sumOfSubarrayMinimums([]int64{3, 2, 1}) != 10 {
		t.Errorf("expected 10")
	}
}

func TestSumOfSubarrayMinimumsDuplicates(t *testing.T) {
	if sumOfSubarrayMinimums([]int64{1, 1}) != 3 {
		t.Errorf("expected 3")
	}
}

func TestSumOfSubarrayMinimumsLargeModulo(t *testing.T) {
	largeArray := make([]int64, 100)
	for idx := range largeArray {
		largeArray[idx] = 30000
	}
	result := sumOfSubarrayMinimums(largeArray)
	if result < 0 || result >= 1_000_000_007 {
		t.Errorf("result out of modulo range: %d", result)
	}
}
