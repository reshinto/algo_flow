package astar

import "testing"

func TestAStarFindsShortestPathInSimpleWeightedGraph(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 4}, {"C", 2}},
		"B": {{"D", 5}},
		"C": {{"B", 1}},
		"D": {},
	}
	heuristic := map[string]int{"A": 10, "B": 5, "C": 7, "D": 0}
	result := aStarSearch(adj, "A", "D", heuristic)
	if len(result) == 0 {
		t.Fatal("Expected a path, got empty")
	}
	if result[0] != "A" || result[len(result)-1] != "D" {
		t.Errorf("Expected path from A to D, got %v", result)
	}
}

func TestAStarReturnsSingleElementPathWhenStartEqualsTarget(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 3}}, "B": {}}
	heuristic := map[string]int{"A": 0, "B": 0}
	result := aStarSearch(adj, "A", "A", heuristic)
	if len(result) != 1 || result[0] != "A" {
		t.Errorf("Expected [A], got %v", result)
	}
}

func TestAStarReturnsNilWhenNoPathExistsToTarget(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 1}}, "B": {}, "C": {}}
	heuristic := map[string]int{"A": 5, "B": 3, "C": 0}
	result := aStarSearch(adj, "A", "C", heuristic)
	if result != nil {
		t.Errorf("Expected nil, got %v", result)
	}
}

func TestAStarHandlesTwoNodeGraphCorrectly(t *testing.T) {
	adj := map[string][]AdjEntry{"Start": {{"End", 7}}, "End": {}}
	heuristic := map[string]int{"Start": 7, "End": 0}
	result := aStarSearch(adj, "Start", "End", heuristic)
	if len(result) != 2 || result[0] != "Start" || result[1] != "End" {
		t.Errorf("Expected [Start, End], got %v", result)
	}
}

func TestAStarFindsPathThrough6NodeGraph(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 4}, {"C", 2}},
		"B": {{"D", 5}},
		"C": {{"B", 1}, {"E", 10}},
		"D": {{"F", 2}},
		"E": {{"F", 3}},
		"F": {},
	}
	heuristic := map[string]int{"A": 20, "B": 10, "C": 12, "D": 5, "E": 8, "F": 0}
	result := aStarSearch(adj, "A", "F", heuristic)
	if len(result) == 0 || result[0] != "A" || result[len(result)-1] != "F" {
		t.Errorf("Expected path from A to F, got %v", result)
	}
}

func TestAStarCorrectlyPrefersHeuristicGuidedPath(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 1}, {"C", 3}},
		"B": {{"D", 10}},
		"C": {{"D", 1}},
		"D": {},
	}
	heuristic := map[string]int{"A": 4, "B": 10, "C": 1, "D": 0}
	result := aStarSearch(adj, "A", "D", heuristic)
	expected := []string{"A", "C", "D"}
	if len(result) != 3 || result[0] != expected[0] || result[1] != expected[1] || result[2] != expected[2] {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}
