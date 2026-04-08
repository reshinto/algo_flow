package heaps

import "testing"

func TestLastStoneWeightDefault(t *testing.T) {
	if lastStoneWeight([]int{2, 7, 4, 1, 8, 1}) != 1 {
		t.Error("Expected 1")
	}
}

func TestLastStoneWeightSingle(t *testing.T) {
	if lastStoneWeight([]int{1}) != 1 {
		t.Error("Expected 1")
	}
}

func TestLastStoneWeightEqualPair(t *testing.T) {
	if lastStoneWeight([]int{5, 5}) != 0 {
		t.Error("Expected 0")
	}
}

func TestLastStoneWeightUnequalPair(t *testing.T) {
	if lastStoneWeight([]int{3, 7}) != 4 {
		t.Error("Expected 4")
	}
}

func TestLastStoneWeightOneThree(t *testing.T) {
	if lastStoneWeight([]int{1, 3}) != 2 {
		t.Error("Expected 2")
	}
}

func TestLastStoneWeightThreeEqual(t *testing.T) {
	if lastStoneWeight([]int{1, 1, 1}) != 1 {
		t.Error("Expected 1")
	}
}

func TestLastStoneWeightFourEqual(t *testing.T) {
	if lastStoneWeight([]int{4, 4, 4, 4}) != 0 {
		t.Error("Expected 0")
	}
}

func TestLastStoneWeight10_4_2_10(t *testing.T) {
	if lastStoneWeight([]int{10, 4, 2, 10}) != 2 {
		t.Error("Expected 2")
	}
}
