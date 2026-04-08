package main

import "testing"

func TestCoinChangeMinTabulationDefaultInput(t *testing.T) {
	if coinChangeMinTabulation(11, []int{1, 5, 10, 25}) != 2 {
		t.Errorf("default input should return 2")
	}
}

func TestCoinChangeMinTabulationImpossible(t *testing.T) {
	if coinChangeMinTabulation(3, []int{2}) != -1 {
		t.Errorf("amount=3 coins=[2] should return -1")
	}
}

func TestCoinChangeMinTabulationAmountZero(t *testing.T) {
	if coinChangeMinTabulation(0, []int{1}) != 0 {
		t.Errorf("amount=0 should return 0")
	}
}

func TestCoinChangeMinTabulationGreedyFailing(t *testing.T) {
	if coinChangeMinTabulation(6, []int{1, 3, 4}) != 2 {
		t.Errorf("amount=6 coins=[1,3,4] should return 2")
	}
}

func TestCoinChangeMinTabulationExactCoin(t *testing.T) {
	if coinChangeMinTabulation(25, []int{1, 5, 10, 25}) != 1 {
		t.Errorf("exact coin should return 1")
	}
}

func TestCoinChangeMinTabulationNoCombination(t *testing.T) {
	if coinChangeMinTabulation(7, []int{3, 6}) != -1 {
		t.Errorf("amount=7 coins=[3,6] should return -1")
	}
}

func TestCoinChangeMinTabulationDividesEvenly(t *testing.T) {
	if coinChangeMinTabulation(10, []int{5}) != 2 {
		t.Errorf("amount=10 coins=[5] should return 2")
	}
}
