package main

import "testing"

func TestSetCoverCoversDefaultUniverse(t *testing.T) {
	universe := []int{1, 2, 3, 4, 5, 6, 7, 8}
	sets := [][]int{{1, 2, 3}, {2, 4}, {3, 4, 5}, {5, 6, 7}, {6, 7, 8}}
	result := setCover(universe, sets)
	covered := make(map[int]struct{})
	for _, selectedSet := range result.selectedSets {
		for _, elem := range selectedSet {
			covered[elem] = struct{}{}
		}
	}
	if _, has1 := covered[1]; !has1 {
		t.Error("expected universe element 1 to be covered")
	}
	if _, has8 := covered[8]; !has8 {
		t.Error("expected universe element 8 to be covered")
	}
	if len(result.selectedSets) == 0 || len(result.selectedSets) > 5 {
		t.Errorf("expected between 1 and 5 selected sets, got %d", len(result.selectedSets))
	}
}

func TestSetCoverSingleSetCoversUniverse(t *testing.T) {
	sets := [][]int{{1, 2, 3}, {1}, {2}}
	result := setCover([]int{1, 2, 3}, sets)
	if len(result.selectedSets) != 1 {
		t.Errorf("expected 1 selected set, got %d", len(result.selectedSets))
	}
	if result.selectedIndices[0] != 0 {
		t.Errorf("expected index 0 selected first, got %d", result.selectedIndices[0])
	}
}

func TestSetCoverDisjointSingletons(t *testing.T) {
	sets := [][]int{{1}, {2}, {3}}
	result := setCover([]int{1, 2, 3}, sets)
	covered := make(map[int]struct{})
	for _, selectedSet := range result.selectedSets {
		for _, elem := range selectedSet {
			covered[elem] = struct{}{}
		}
	}
	for _, elem := range []int{1, 2, 3} {
		if _, exists := covered[elem]; !exists {
			t.Errorf("expected element %d to be covered", elem)
		}
	}
	if len(result.selectedSets) != 3 {
		t.Errorf("expected 3 selected sets, got %d", len(result.selectedSets))
	}
}

func TestSetCoverSelectsGreediestFirst(t *testing.T) {
	sets := [][]int{{1, 2, 3}, {4}}
	result := setCover([]int{1, 2, 3, 4}, sets)
	if result.selectedIndices[0] != 0 {
		t.Errorf("expected greediest set (index 0) selected first, got index %d", result.selectedIndices[0])
	}
}

func TestSetCoverEmptyUniverseReturnsEmptySelection(t *testing.T) {
	result := setCover([]int{}, [][]int{{1, 2}, {3, 4}})
	if len(result.selectedIndices) != 0 {
		t.Errorf("expected empty selection, got %v", result.selectedIndices)
	}
	if len(result.selectedSets) != 0 {
		t.Errorf("expected empty selected sets, got %v", result.selectedSets)
	}
}

func TestSetCoverSelectedIndicesMatchSelectedSets(t *testing.T) {
	allSets := [][]int{{1, 2, 3}, {2, 4}, {3, 4, 5}, {5, 6, 7}, {6, 7, 8}}
	result := setCover([]int{1, 2, 3, 4, 5, 6, 7, 8}, allSets)
	for pos, idx := range result.selectedIndices {
		if len(result.selectedSets[pos]) != len(allSets[idx]) {
			t.Errorf("selected set at position %d does not match set at index %d", pos, idx)
		}
		for elemIdx, elem := range allSets[idx] {
			if result.selectedSets[pos][elemIdx] != elem {
				t.Errorf("selected set at position %d differs from set at index %d", pos, idx)
				break
			}
		}
	}
}
