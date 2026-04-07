package main

import "testing"

func TestPartitionEqualSubset1_5_11_5(t *testing.T) {
	if !partitionEqualSubset([]int{1, 5, 11, 5}) {
		t.Errorf("[1,5,11,5] should return true")
	}
}

func TestPartitionEqualSubset1_2_3_5(t *testing.T) {
	if partitionEqualSubset([]int{1, 2, 3, 5}) {
		t.Errorf("[1,2,3,5] should return false")
	}
}

func TestPartitionEqualSubset1_1(t *testing.T) {
	if !partitionEqualSubset([]int{1, 1}) {
		t.Errorf("[1,1] should return true")
	}
}

func TestPartitionEqualSubsetSingleElement(t *testing.T) {
	if partitionEqualSubset([]int{1}) {
		t.Errorf("[1] should return false")
	}
}

func TestPartitionEqualSubsetOddSum(t *testing.T) {
	if partitionEqualSubset([]int{1, 2, 4}) {
		t.Errorf("[1,2,4] has odd sum and should return false")
	}
}

func TestPartitionEqualSubsetEqualHalves(t *testing.T) {
	if !partitionEqualSubset([]int{3, 3, 3, 3}) {
		t.Errorf("[3,3,3,3] should return true")
	}
}

func TestPartitionEqualSubset2_2_1_1(t *testing.T) {
	if !partitionEqualSubset([]int{2, 2, 1, 1}) {
		t.Errorf("[2,2,1,1] should return true")
	}
}
