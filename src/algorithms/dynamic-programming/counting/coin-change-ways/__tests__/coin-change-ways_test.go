package main

import "testing"

func TestCoinChangeWays5With125(t *testing.T) {
	if coinChangeWays(5, []int{1, 2, 5}) != 4 {
		t.Errorf("amount=5 coins=[1,2,5] should return 4")
	}
}

func TestCoinChangeWays3WithCoin2(t *testing.T) {
	if coinChangeWays(3, []int{2}) != 0 {
		t.Errorf("amount=3 coins=[2] should return 0")
	}
}

func TestCoinChangeWaysAmountZero(t *testing.T) {
	if coinChangeWays(0, []int{1}) != 1 {
		t.Errorf("amount=0 should return 1")
	}
}

func TestCoinChangeWays5With12(t *testing.T) {
	if coinChangeWays(5, []int{1, 2}) != 3 {
		t.Errorf("amount=5 coins=[1,2] should return 3")
	}
}

func TestCoinChangeWaysExactMatch(t *testing.T) {
	if coinChangeWays(2, []int{2}) != 1 {
		t.Errorf("amount=2 coins=[2] should return 1")
	}
}

func TestCoinChangeWaysNoFit(t *testing.T) {
	if coinChangeWays(1, []int{2, 5}) != 0 {
		t.Errorf("amount=1 coins=[2,5] should return 0")
	}
}

func TestCoinChangeWays10With125(t *testing.T) {
	if coinChangeWays(10, []int{1, 2, 5}) != 10 {
		t.Errorf("amount=10 coins=[1,2,5] should return 10")
	}
}
