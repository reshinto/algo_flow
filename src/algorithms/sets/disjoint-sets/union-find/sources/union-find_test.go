package main

import (
	"sort"
	"testing"
)

func TestMergesAllIntoOneComponent(t *testing.T) {
	operations := []Operation{{0, 1}, {2, 3}, {4, 5}, {6, 7}, {0, 2}, {4, 6}, {0, 4}}
	components := unionFind(8, operations)
	if len(components) != 1 {
		t.Errorf("expected 1 component, got %d", len(components))
	}
	if len(components[0]) != 8 {
		t.Errorf("expected component of size 8, got %d", len(components[0]))
	}
}

func TestNoOperationsEachElementOwnComponent(t *testing.T) {
	components := unionFind(4, []Operation{})
	if len(components) != 4 {
		t.Errorf("expected 4 components, got %d", len(components))
	}
	for componentIdx, component := range components {
		if len(component) != 1 {
			t.Errorf("component %d should have 1 element, got %d", componentIdx, len(component))
		}
	}
}

func TestSingleUnionMergesExactlyTwo(t *testing.T) {
	components := unionFind(4, []Operation{{0, 1}})
	if len(components) != 3 {
		t.Errorf("expected 3 components, got %d", len(components))
	}
	foundMerged := false
	for _, component := range components {
		if len(component) == 2 {
			sorted := make([]int, len(component))
			copy(sorted, component)
			sort.Ints(sorted)
			if sorted[0] == 0 && sorted[1] == 1 {
				foundMerged = true
			}
		}
	}
	if !foundMerged {
		t.Error("expected a component containing elements 0 and 1")
	}
}

func TestDuplicateUnionLeavesCountUnchanged(t *testing.T) {
	components := unionFind(4, []Operation{{0, 1}, {0, 1}})
	if len(components) != 3 {
		t.Errorf("expected 3 components after duplicate union, got %d", len(components))
	}
}

func TestAllElementsAccountedFor(t *testing.T) {
	components := unionFind(6, []Operation{{0, 1}, {2, 3}})
	allElements := make([]int, 0)
	for _, component := range components {
		allElements = append(allElements, component...)
	}
	sort.Ints(allElements)
	expected := []int{0, 1, 2, 3, 4, 5}
	for elemIdx, elem := range expected {
		if allElements[elemIdx] != elem {
			t.Errorf("element mismatch at index %d: expected %d got %d", elemIdx, elem, allElements[elemIdx])
		}
	}
}

func TestSingleElement(t *testing.T) {
	components := unionFind(1, []Operation{})
	if len(components) != 1 {
		t.Errorf("expected 1 component, got %d", len(components))
	}
	if len(components[0]) != 1 || components[0][0] != 0 {
		t.Error("expected single component containing element 0")
	}
}

func TestChainOfUnions(t *testing.T) {
	components := unionFind(4, []Operation{{0, 1}, {1, 2}, {2, 3}})
	if len(components) != 1 {
		t.Errorf("expected 1 component after chain of unions, got %d", len(components))
	}
	if len(components[0]) != 4 {
		t.Errorf("expected component of size 4, got %d", len(components[0]))
	}
}
