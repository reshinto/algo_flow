package main

import (
	"math"
	"testing"
)

func TestFindPeakElementFindsDefaultExample(t *testing.T) {
	result := findPeakElement([]int{1, 3, 20, 4, 1, 0})
	if result != 2 {
		t.Errorf("expected 2, got %d", result)
	}
}

func TestFindPeakElementStrictlyDecreasing(t *testing.T) {
	result := findPeakElement([]int{5, 4, 3, 2, 1})
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestFindPeakElementStrictlyIncreasing(t *testing.T) {
	result := findPeakElement([]int{1, 2, 3, 4, 5})
	if result != 4 {
		t.Errorf("expected 4, got %d", result)
	}
}

func TestFindPeakElementSingleElement(t *testing.T) {
	result := findPeakElement([]int{42})
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestFindPeakElementTwoElementLargerFirst(t *testing.T) {
	result := findPeakElement([]int{10, 5})
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}

func TestFindPeakElementTwoElementLargerSecond(t *testing.T) {
	result := findPeakElement([]int{5, 10})
	if result != 1 {
		t.Errorf("expected 1, got %d", result)
	}
}

func TestFindPeakElementValidPeakWithMultiplePeaks(t *testing.T) {
	array := []int{1, 5, 2, 7, 3}
	peakIndex := findPeakElement(array)
	peakValue := array[peakIndex]
	leftNeighbor := math.MinInt64
	rightNeighbor := math.MinInt64
	if peakIndex > 0 {
		leftNeighbor = array[peakIndex-1]
	}
	if peakIndex < len(array)-1 {
		rightNeighbor = array[peakIndex+1]
	}
	if peakValue <= leftNeighbor {
		t.Errorf("peak %d should be greater than left neighbor %d", peakValue, leftNeighbor)
	}
	if peakValue <= rightNeighbor {
		t.Errorf("peak %d should be greater than right neighbor %d", peakValue, rightNeighbor)
	}
}

func TestFindPeakElementMountainShaped(t *testing.T) {
	result := findPeakElement([]int{1, 2, 3, 5, 3, 2, 1})
	if result != 3 {
		t.Errorf("expected 3, got %d", result)
	}
}

func TestFindPeakElementDescentFromStart(t *testing.T) {
	result := findPeakElement([]int{3, 2, 1})
	if result != 0 {
		t.Errorf("expected 0, got %d", result)
	}
}
