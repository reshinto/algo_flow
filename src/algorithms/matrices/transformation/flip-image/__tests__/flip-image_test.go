package main

import (
	"reflect"
	"testing"
)

func TestFlipImageFlipsAndInverts3x3(t *testing.T) {
	matrix := [][]int{{1, 1, 0}, {1, 0, 1}, {0, 0, 0}}
	result := flipImage(matrix)
	expected := [][]int{{1, 0, 0}, {0, 1, 0}, {1, 1, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestFlipImageAllZeros(t *testing.T) {
	matrix := [][]int{{0, 0}, {0, 0}}
	result := flipImage(matrix)
	expected := [][]int{{1, 1}, {1, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestFlipImageAllOnes(t *testing.T) {
	matrix := [][]int{{1, 1}, {1, 1}}
	result := flipImage(matrix)
	expected := [][]int{{0, 0}, {0, 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestFlipImageSingleRow(t *testing.T) {
	matrix := [][]int{{1, 0, 1}}
	result := flipImage(matrix)
	expected := [][]int{{0, 1, 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestFlipImageSingleColumn(t *testing.T) {
	matrix := [][]int{{1}, {0}, {1}}
	result := flipImage(matrix)
	expected := [][]int{{0}, {1}, {0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestFlipImage1x1With0(t *testing.T) {
	matrix := [][]int{{0}}
	result := flipImage(matrix)
	if result[0][0] != 1 {
		t.Errorf("expected 1, got %d", result[0][0])
	}
}

func TestFlipImage1x1With1(t *testing.T) {
	matrix := [][]int{{1}}
	result := flipImage(matrix)
	if result[0][0] != 0 {
		t.Errorf("expected 0, got %d", result[0][0])
	}
}

func TestFlipImageIdentityLikeMatrix(t *testing.T) {
	matrix := [][]int{{1, 0, 0}, {0, 1, 0}, {0, 0, 1}}
	result := flipImage(matrix)
	expected := [][]int{{1, 1, 0}, {1, 0, 1}, {0, 1, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}
