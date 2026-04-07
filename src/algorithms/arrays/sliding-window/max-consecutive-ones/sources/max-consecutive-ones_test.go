package maxconsecutiveones

import "testing"

func TestMaxConsecutiveOnesWithTwoFlips(t *testing.T) {
	maxLength, startIndex := maxConsecutiveOnes([]int{1, 1, 0, 0, 1, 1, 1, 0, 1, 1}, 2)
	if maxLength != 7 || startIndex != 0 {
		t.Errorf("expected (7, 0), got (%d, %d)", maxLength, startIndex)
	}
}

func TestMaxConsecutiveOnesTwoFlipsFull(t *testing.T) {
	maxLength, _ := maxConsecutiveOnes([]int{1, 0, 1, 0, 1}, 2)
	if maxLength != 5 {
		t.Errorf("expected 5, got %d", maxLength)
	}
}

func TestMaxConsecutiveOnesNoFlipsAllOnes(t *testing.T) {
	maxLength, startIndex := maxConsecutiveOnes([]int{1, 1, 1, 1}, 0)
	if maxLength != 4 || startIndex != 0 {
		t.Errorf("expected (4, 0), got (%d, %d)", maxLength, startIndex)
	}
}

func TestMaxConsecutiveOnesNoFlipsWithZero(t *testing.T) {
	maxLength, _ := maxConsecutiveOnes([]int{1, 1, 0, 1, 1}, 0)
	if maxLength != 2 {
		t.Errorf("expected 2, got %d", maxLength)
	}
}

func TestMaxConsecutiveOnesEmptyArray(t *testing.T) {
	maxLength, _ := maxConsecutiveOnes([]int{}, 2)
	if maxLength != 0 {
		t.Errorf("expected 0, got %d", maxLength)
	}
}

func TestMaxConsecutiveOnesSingleOneNoFlips(t *testing.T) {
	maxLength, startIndex := maxConsecutiveOnes([]int{1}, 0)
	if maxLength != 1 || startIndex != 0 {
		t.Errorf("expected (1, 0), got (%d, %d)", maxLength, startIndex)
	}
}

func TestMaxConsecutiveOnesSingleZeroOneFlip(t *testing.T) {
	maxLength, _ := maxConsecutiveOnes([]int{0}, 1)
	if maxLength != 1 {
		t.Errorf("expected 1, got %d", maxLength)
	}
}

func TestMaxConsecutiveOnesAllZerosTwoFlips(t *testing.T) {
	maxLength, _ := maxConsecutiveOnes([]int{0, 0, 0}, 2)
	if maxLength != 2 {
		t.Errorf("expected 2, got %d", maxLength)
	}
}

func TestMaxConsecutiveOnesOneFlipMiddle(t *testing.T) {
	maxLength, _ := maxConsecutiveOnes([]int{1, 0, 1}, 1)
	if maxLength != 3 {
		t.Errorf("expected 3, got %d", maxLength)
	}
}
