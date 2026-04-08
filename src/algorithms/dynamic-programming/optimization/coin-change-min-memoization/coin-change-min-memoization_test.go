package main

import "testing"

func TestCoinChangeMinMemoizationAmountZero(t *testing.T) {
	if coinChangeMinMemoization(0, []int{1, 5, 10}) != 0 {
		t.Errorf("amount=0 should return 0")
	}
}

func TestCoinChangeMinMemoizationImpossible(t *testing.T) {
	if coinChangeMinMemoization(3, []int{2}) != -1 {
		t.Errorf("amount=3 coins=[2] should return -1")
	}
}

func TestCoinChangeMinMemoizationExactCoin(t *testing.T) {
	if coinChangeMinMemoization(5, []int{1, 5, 10}) != 1 {
		t.Errorf("amount=5 coins=[1,5,10] should return 1")
	}
}

func TestCoinChangeMinMemoizationDefaultInput(t *testing.T) {
	if coinChangeMinMemoization(11, []int{1, 5, 10, 25}) != 2 {
		t.Errorf("default input should return 2")
	}
}

func TestCoinChangeMinMemoization11With1569(t *testing.T) {
	if coinChangeMinMemoization(11, []int{1, 5, 6, 9}) != 2 {
		t.Errorf("amount=11 coins=[1,5,6,9] should return 2")
	}
}

func TestCoinChangeMinMemoization3With12(t *testing.T) {
	if coinChangeMinMemoization(3, []int{1, 2}) != 2 {
		t.Errorf("amount=3 coins=[1,2] should return 2")
	}
}

func TestCoinChangeMinMemoization6With134(t *testing.T) {
	if coinChangeMinMemoization(6, []int{1, 3, 4}) != 2 {
		t.Errorf("amount=6 coins=[1,3,4] should return 2")
	}
}

func TestCoinChangeMinMemoization100WithStandardCoins(t *testing.T) {
	if coinChangeMinMemoization(100, []int{1, 5, 10, 25}) != 4 {
		t.Errorf("amount=100 should return 4")
	}
}
