package main

import "testing"

func TestNRepeatedElement_Returns3For1_2_3_3(t *testing.T) {
	if nRepeatedElement([]int{1, 2, 3, 3}) != 3 {
		t.Error("expected 3")
	}
}

func TestNRepeatedElement_Returns2For2_1_2_5_3_2(t *testing.T) {
	if nRepeatedElement([]int{2, 1, 2, 5, 3, 2}) != 2 {
		t.Error("expected 2")
	}
}

func TestNRepeatedElement_Returns5ForFiveRepeated(t *testing.T) {
	if nRepeatedElement([]int{5, 1, 5, 2, 5, 3, 5, 4}) != 5 {
		t.Error("expected 5")
	}
}

func TestNRepeatedElement_ReturnsTwoElementArray(t *testing.T) {
	if nRepeatedElement([]int{1, 1}) != 1 {
		t.Error("expected 1")
	}
}

func TestNRepeatedElement_Returns9For9_9_1_2(t *testing.T) {
	if nRepeatedElement([]int{9, 9, 1, 2}) != 9 {
		t.Error("expected 9")
	}
}

func TestNRepeatedElement_HandlesElementAtEnd(t *testing.T) {
	if nRepeatedElement([]int{1, 2, 3, 4, 5, 3, 3, 3}) != 3 {
		t.Error("expected 3")
	}
}

func TestNRepeatedElement_ReturnsRepeatedElementForAllSame(t *testing.T) {
	if nRepeatedElement([]int{7, 7, 7, 7}) != 7 {
		t.Error("expected 7")
	}
}

func TestNRepeatedElement_WorksWithNegativeNumbers(t *testing.T) {
	if nRepeatedElement([]int{-1, -1, 2, 3}) != -1 {
		t.Error("expected -1")
	}
}
