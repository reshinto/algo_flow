package main

import (
	"reflect"
	"testing"
)

func makeValue(value int) NestedItem {
	return NestedItem{isValue: true, value: value}
}

func makeList(items []NestedItem) NestedItem {
	return NestedItem{isValue: false, items: items}
}

func TestFlattenNestedListIteratorComplex(t *testing.T) {
	input := []NestedItem{
		makeList([]NestedItem{makeValue(1), makeList([]NestedItem{makeValue(2)})}),
		makeValue(3),
		makeList([]NestedItem{makeValue(4), makeList([]NestedItem{makeValue(5), makeValue(6)})}),
	}
	if !reflect.DeepEqual(flattenNestedListIterator(input), []int{1, 2, 3, 4, 5, 6}) {
		t.Errorf("expected [1 2 3 4 5 6]")
	}
}

func TestFlattenNestedListIteratorFlat(t *testing.T) {
	input := []NestedItem{makeValue(1), makeValue(2), makeValue(3), makeValue(4)}
	if !reflect.DeepEqual(flattenNestedListIterator(input), []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4]")
	}
}

func TestFlattenNestedListIteratorDeeplyNested(t *testing.T) {
	input := []NestedItem{makeList([]NestedItem{makeList([]NestedItem{makeValue(7)})})}
	if !reflect.DeepEqual(flattenNestedListIterator(input), []int{7}) {
		t.Errorf("expected [7]")
	}
}

func TestFlattenNestedListIteratorEmpty(t *testing.T) {
	result := flattenNestedListIterator([]NestedItem{})
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}

func TestFlattenNestedListIteratorLeetcodeExample(t *testing.T) {
	input := []NestedItem{
		makeList([]NestedItem{makeValue(1), makeValue(1)}),
		makeValue(2),
		makeList([]NestedItem{makeValue(1), makeValue(1)}),
	}
	if !reflect.DeepEqual(flattenNestedListIterator(input), []int{1, 1, 2, 1, 1}) {
		t.Errorf("expected [1 1 2 1 1]")
	}
}
