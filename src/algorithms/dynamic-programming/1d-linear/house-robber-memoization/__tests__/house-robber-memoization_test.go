package main

import "testing"

func TestHouseRobberMemoizationEmpty(t *testing.T) {
	if houseRobberMemoization([]int{}) != 0 {
		t.Errorf("empty array should return 0")
	}
}

func TestHouseRobberMemoizationSingleHouse(t *testing.T) {
	if houseRobberMemoization([]int{5}) != 5 {
		t.Errorf("[5] should return 5")
	}
}

func TestHouseRobberMemoizationTwoHouses(t *testing.T) {
	if houseRobberMemoization([]int{3, 10}) != 10 {
		t.Errorf("[3, 10] should return 10")
	}
}

func TestHouseRobberMemoizationDefaultInput(t *testing.T) {
	if houseRobberMemoization([]int{2, 7, 9, 3, 1}) != 12 {
		t.Errorf("[2,7,9,3,1] should return 12")
	}
}

func TestHouseRobberMemoizationEqualHouses(t *testing.T) {
	if houseRobberMemoization([]int{4, 4, 4, 4}) != 8 {
		t.Errorf("[4,4,4,4] should return 8")
	}
}

func TestHouseRobberMemoizationLargerInput(t *testing.T) {
	if houseRobberMemoization([]int{5, 3, 4, 11, 2}) != 16 {
		t.Errorf("[5,3,4,11,2] should return 16")
	}
}
