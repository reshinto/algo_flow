package main

import (
	"reflect"
	"testing"
)

func TestGameOfLifeStandard4x3Example(t *testing.T) {
	board := [][]int{{0, 1, 0}, {0, 0, 1}, {1, 1, 1}, {0, 0, 0}}
	result := gameOfLife(board)
	expected := [][]int{{0, 0, 0}, {1, 0, 1}, {0, 1, 1}, {0, 1, 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestGameOfLifeAllDeadStaysUnchanged(t *testing.T) {
	board := [][]int{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}
	result := gameOfLife(board)
	expected := [][]int{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected all dead, got %v", result)
	}
}

func TestGameOfLifeAllAlive3x3Overpopulation(t *testing.T) {
	board := [][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}}
	result := gameOfLife(board)
	expected := [][]int{{1, 0, 1}, {0, 0, 0}, {1, 0, 1}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestGameOfLife1x1DeadStaysDead(t *testing.T) {
	board := [][]int{{0}}
	result := gameOfLife(board)
	if result[0][0] != 0 {
		t.Errorf("expected 0, got %d", result[0][0])
	}
}

func TestGameOfLife1x1LiveDiesFromUnderpopulation(t *testing.T) {
	board := [][]int{{1}}
	result := gameOfLife(board)
	if result[0][0] != 0 {
		t.Errorf("expected 0, got %d", result[0][0])
	}
}

func TestGameOfLife2x2StillLifeBlock(t *testing.T) {
	board := [][]int{{0, 0, 0, 0}, {0, 1, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}}
	result := gameOfLife(board)
	if !reflect.DeepEqual(result[1], []int{0, 1, 1, 0}) {
		t.Errorf("row 1 wrong: %v", result[1])
	}
	if !reflect.DeepEqual(result[2], []int{0, 1, 1, 0}) {
		t.Errorf("row 2 wrong: %v", result[2])
	}
}

func TestGameOfLifeVerticalBlinkerBecomesHorizontal(t *testing.T) {
	board := [][]int{{0, 1, 0}, {0, 1, 0}, {0, 1, 0}}
	result := gameOfLife(board)
	expected := [][]int{{0, 0, 0}, {1, 1, 1}, {0, 0, 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestGameOfLifeReproductionLShape(t *testing.T) {
	board := [][]int{{1, 1, 0}, {1, 0, 0}, {0, 0, 0}}
	result := gameOfLife(board)
	expected := [][]int{{1, 1, 0}, {1, 1, 0}, {0, 0, 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}
