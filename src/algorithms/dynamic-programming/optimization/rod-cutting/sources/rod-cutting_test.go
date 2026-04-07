package main

import "testing"

func TestRodCuttingDefaultInput(t *testing.T) {
	if rodCutting([]int{1, 5, 8, 9, 10, 17, 17, 20}) != 22 {
		t.Errorf("default input should return 22")
	}
}

func TestRodCuttingTwoPrices(t *testing.T) {
	if rodCutting([]int{1, 5}) != 5 {
		t.Errorf("[1,5] should return 5")
	}
}

func TestRodCuttingThreePrices(t *testing.T) {
	if rodCutting([]int{3, 5, 8}) != 9 {
		t.Errorf("[3,5,8] should return 9")
	}
}

func TestRodCuttingSinglePrice(t *testing.T) {
	if rodCutting([]int{1}) != 1 {
		t.Errorf("[1] should return 1")
	}
}

func TestRodCuttingEmpty(t *testing.T) {
	if rodCutting([]int{}) != 0 {
		t.Errorf("empty should return 0")
	}
}

func TestRodCuttingHighSingleValue(t *testing.T) {
	if rodCutting([]int{10}) != 10 {
		t.Errorf("[10] should return 10")
	}
}

func TestRodCuttingUnitCutsOptimal(t *testing.T) {
	if rodCutting([]int{3, 1, 1}) != 9 {
		t.Errorf("[3,1,1] should return 9")
	}
}

func TestRodCuttingNoCutOptimal(t *testing.T) {
	if rodCutting([]int{1, 2, 10}) != 10 {
		t.Errorf("[1,2,10] should return 10")
	}
}

func TestRodCuttingUniform(t *testing.T) {
	if rodCutting([]int{2, 2, 2}) != 6 {
		t.Errorf("[2,2,2] should return 6")
	}
}
