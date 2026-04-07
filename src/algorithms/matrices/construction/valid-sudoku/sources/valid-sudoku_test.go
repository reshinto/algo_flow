package main

import "testing"

func emptyBoard() [][]int {
	board := make([][]int, 9)
	for rowIdx := range board {
		board[rowIdx] = make([]int, 9)
	}
	return board
}

func TestValidSudokuAcceptsValidPartialBoard(t *testing.T) {
	board := [][]int{
		{5, 3, 0, 0, 7, 0, 0, 0, 0},
		{6, 0, 0, 1, 9, 5, 0, 0, 0},
		{0, 9, 8, 0, 0, 0, 0, 6, 0},
		{8, 0, 0, 0, 6, 0, 0, 0, 3},
		{4, 0, 0, 8, 0, 3, 0, 0, 1},
		{7, 0, 0, 0, 2, 0, 0, 0, 6},
		{0, 6, 0, 0, 0, 0, 2, 8, 0},
		{0, 0, 0, 4, 1, 9, 0, 0, 5},
		{0, 0, 0, 0, 8, 0, 0, 7, 9},
	}
	if !validSudoku(board) {
		t.Error("expected true for valid partial board")
	}
}

func TestValidSudokuAcceptsEmptyBoard(t *testing.T) {
	if !validSudoku(emptyBoard()) {
		t.Error("expected true for empty board")
	}
}

func TestValidSudokuRejectsDuplicateInRow(t *testing.T) {
	board := emptyBoard()
	board[0][0] = 5
	board[0][4] = 5
	if validSudoku(board) {
		t.Error("expected false for duplicate in row")
	}
}

func TestValidSudokuRejectsDuplicateInColumn(t *testing.T) {
	board := emptyBoard()
	board[0][0] = 3
	board[5][0] = 3
	if validSudoku(board) {
		t.Error("expected false for duplicate in column")
	}
}

func TestValidSudokuRejectsDuplicateIn3x3Box(t *testing.T) {
	board := emptyBoard()
	board[0][0] = 7
	board[2][2] = 7
	if validSudoku(board) {
		t.Error("expected false for duplicate in 3x3 box")
	}
}

func TestValidSudokuAcceptsFullyValidCompletedBoard(t *testing.T) {
	board := [][]int{
		{5, 3, 4, 6, 7, 8, 9, 1, 2},
		{6, 7, 2, 1, 9, 5, 3, 4, 8},
		{1, 9, 8, 3, 4, 2, 5, 6, 7},
		{8, 5, 9, 7, 6, 1, 4, 2, 3},
		{4, 2, 6, 8, 5, 3, 7, 9, 1},
		{7, 1, 3, 9, 2, 4, 8, 5, 6},
		{9, 6, 1, 5, 3, 7, 2, 8, 4},
		{2, 8, 7, 4, 1, 9, 6, 3, 5},
		{3, 4, 5, 2, 8, 6, 1, 7, 9},
	}
	if !validSudoku(board) {
		t.Error("expected true for fully valid completed board")
	}
}

func TestValidSudokuAcceptsBoardWithSingleFilledCell(t *testing.T) {
	board := emptyBoard()
	board[4][4] = 5
	if !validSudoku(board) {
		t.Error("expected true for board with single filled cell")
	}
}

func TestValidSudokuRejectsSameDigitTwiceInSameBox(t *testing.T) {
	board := emptyBoard()
	board[0][1] = 9
	board[1][2] = 9
	if validSudoku(board) {
		t.Error("expected false for same digit twice in same box")
	}
}
