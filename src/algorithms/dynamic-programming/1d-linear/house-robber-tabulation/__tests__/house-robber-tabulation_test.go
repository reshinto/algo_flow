package main

import "testing"

func TestHouseRobberTabulationEmpty(t *testing.T) {
	if houseRobberTabulation([]int{}) != 0 {
		t.Errorf("empty array should return 0")
	}
}

func TestHouseRobberTabulationSingleHouse(t *testing.T) {
	if houseRobberTabulation([]int{5}) != 5 {
		t.Errorf("[5] should return 5")
	}
}

func TestHouseRobberTabulationTwoHouses(t *testing.T) {
	if houseRobberTabulation([]int{2, 7}) != 7 {
		t.Errorf("[2,7] should return 7")
	}
}

func TestHouseRobberTabulationDefaultInput(t *testing.T) {
	if houseRobberTabulation([]int{2, 7, 9, 3, 1}) != 12 {
		t.Errorf("[2,7,9,3,1] should return 12")
	}
}

func TestHouseRobberTabulation1231(t *testing.T) {
	if houseRobberTabulation([]int{1, 2, 3, 1}) != 4 {
		t.Errorf("[1,2,3,1] should return 4")
	}
}
