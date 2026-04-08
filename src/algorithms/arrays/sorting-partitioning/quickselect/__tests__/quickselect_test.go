package quickselect

import "testing"

func TestFourthSmallest(t *testing.T) {
	kthElement, _ := quickselect([]int{7, 2, 1, 6, 8, 5, 3, 4}, 4)
	if kthElement != 4 {
		t.Errorf("Expected kthElement=4, got %d", kthElement)
	}
}

func TestMinimum(t *testing.T) {
	kthElement, _ := quickselect([]int{7, 2, 1, 6, 8, 5, 3, 4}, 1)
	if kthElement != 1 {
		t.Errorf("Expected kthElement=1, got %d", kthElement)
	}
}

func TestMaximum(t *testing.T) {
	kthElement, _ := quickselect([]int{7, 2, 1, 6, 8, 5, 3, 4}, 8)
	if kthElement != 8 {
		t.Errorf("Expected kthElement=8, got %d", kthElement)
	}
}

func TestSingleElement(t *testing.T) {
	kthElement, _ := quickselect([]int{42}, 1)
	if kthElement != 42 {
		t.Errorf("Expected kthElement=42, got %d", kthElement)
	}
}

func TestInvalidKZero(t *testing.T) {
	kthElement, _ := quickselect([]int{1, 2, 3}, 0)
	if kthElement != -1 {
		t.Errorf("Expected kthElement=-1 for k=0, got %d", kthElement)
	}
}

func TestInvalidKTooLarge(t *testing.T) {
	kthElement, _ := quickselect([]int{1, 2, 3}, 5)
	if kthElement != -1 {
		t.Errorf("Expected kthElement=-1 for k>n, got %d", kthElement)
	}
}

func TestEmptyArray(t *testing.T) {
	kthElement, _ := quickselect([]int{}, 1)
	if kthElement != -1 {
		t.Errorf("Expected kthElement=-1 for empty, got %d", kthElement)
	}
}

func TestDuplicates(t *testing.T) {
	kthElement, _ := quickselect([]int{3, 3, 1, 2}, 2)
	if kthElement != 2 {
		t.Errorf("Expected kthElement=2, got %d", kthElement)
	}
}

func TestMedian(t *testing.T) {
	kthElement, _ := quickselect([]int{3, 1, 4, 1, 5, 9, 2, 6, 5}, 5)
	if kthElement != 4 {
		t.Errorf("Expected kthElement=4, got %d", kthElement)
	}
}
