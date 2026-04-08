package main

import "testing"

func TestKnapsack01DefaultInput(t *testing.T) {
	if knapsack01([]int{2, 3, 4, 5}, []int{3, 4, 5, 6}, 8) != 10 {
		t.Errorf("default input should return 10")
	}
}

func TestKnapsack01ClassicExample(t *testing.T) {
	if knapsack01([]int{1, 2, 3}, []int{6, 10, 12}, 5) != 22 {
		t.Errorf("classic example should return 22")
	}
}

func TestKnapsack01ItemTooHeavy(t *testing.T) {
	if knapsack01([]int{2}, []int{3}, 1) != 0 {
		t.Errorf("item too heavy should return 0")
	}
}

func TestKnapsack01ExactFit(t *testing.T) {
	if knapsack01([]int{1}, []int{1}, 1) != 1 {
		t.Errorf("exact fit should return 1")
	}
}

func TestKnapsack01EmptyItems(t *testing.T) {
	if knapsack01([]int{}, []int{}, 10) != 0 {
		t.Errorf("empty items should return 0")
	}
}

func TestKnapsack01ZeroCapacity(t *testing.T) {
	if knapsack01([]int{2, 3}, []int{4, 5}, 0) != 0 {
		t.Errorf("zero capacity should return 0")
	}
}

func TestKnapsack01BestCombo(t *testing.T) {
	if knapsack01([]int{1, 2, 3}, []int{1, 6, 10}, 5) != 16 {
		t.Errorf("best combo should return 16")
	}
}

func TestKnapsack01ZeroOneConstraint(t *testing.T) {
	if knapsack01([]int{3}, []int{5}, 9) != 5 {
		t.Errorf("0/1 constraint should return 5")
	}
}
