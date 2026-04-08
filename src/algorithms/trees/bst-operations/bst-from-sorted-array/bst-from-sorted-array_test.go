package main

import "testing"

func TestBSTFromSortedArrayRootAtMid(t *testing.T) {
	result := bstFromSortedArray([]int{1, 2, 3, 4, 5, 6, 7})
	if result == nil || result.value != 4 {
		t.Errorf("expected root 4, got %v", result)
	}
}

func TestBSTFromSortedArraySingleElement(t *testing.T) {
	result := bstFromSortedArray([]int{42})
	if result == nil || result.value != 42 {
		t.Error("single element failed")
	}
	if result.left != nil || result.right != nil {
		t.Error("single element should have no children")
	}
}

func TestBSTFromSortedArrayEmptyArray(t *testing.T) {
	if bstFromSortedArray([]int{}) != nil {
		t.Error("empty array should return nil")
	}
}

func TestBSTFromSortedArrayTwoElements(t *testing.T) {
	result := bstFromSortedArray([]int{1, 2})
	if result == nil || result.value != 1 {
		t.Errorf("expected root 1, got %v", result)
	}
	if result.right == nil || result.right.value != 2 {
		t.Error("right should be 2")
	}
}

func TestBSTFromSortedArrayFiveElements(t *testing.T) {
	result := bstFromSortedArray([]int{1, 2, 3, 4, 5})
	if result == nil || result.value != 3 {
		t.Errorf("expected root 3, got %v", result)
	}
	if result.left == nil || result.left.value != 1 {
		t.Error("left should be 1")
	}
	if result.right == nil || result.right.value != 4 {
		t.Error("right should be 4")
	}
}
