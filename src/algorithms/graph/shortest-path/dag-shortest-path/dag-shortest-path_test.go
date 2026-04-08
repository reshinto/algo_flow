package dagshortestpath

import (
	"math"
	"testing"
)

func TestDAGComputesShortestDistancesInSimpleDag(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 2}, {"C", 6}},
		"B": {{"D", 1}, {"E", 4}},
		"C": {{"E", 2}},
		"D": {{"F", 5}},
		"E": {{"F", 1}},
		"F": {},
	}
	result := dagShortestPath(adj, "A", []string{"A", "B", "C", "D", "E", "F"})
	if result["A"] != 0 || result["B"] != 2 || result["C"] != 6 ||
		result["D"] != 3 || result["E"] != 6 || result["F"] != 7 {
		t.Errorf("Unexpected distances: %v", result)
	}
}

func TestDAGReturnsZeroDistanceForStartNode(t *testing.T) {
	adj := map[string][]AdjEntry{"Start": {{"End", 5}}, "End": {}}
	result := dagShortestPath(adj, "Start", []string{"Start", "End"})
	if result["Start"] != 0 {
		t.Errorf("Expected 0, got %d", result["Start"])
	}
}

func TestDAGReturnsMaxForUnreachableNodes(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 3}}, "B": {}, "C": {{"D", 2}}, "D": {}}
	result := dagShortestPath(adj, "A", []string{"A", "B", "C", "D"})
	if result["C"] != math.MaxInt32 {
		t.Errorf("Expected MaxInt32 for unreachable node, got %d", result["C"])
	}
}

func TestDAGHandlesSingleNodeGraph(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {}}
	result := dagShortestPath(adj, "A", []string{"A"})
	if result["A"] != 0 {
		t.Errorf("Expected 0, got %d", result["A"])
	}
}

func TestDAGHandlesLinearChainCorrectly(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 3}}, "B": {{"C", 4}}, "C": {{"D", 2}}, "D": {},
	}
	result := dagShortestPath(adj, "A", []string{"A", "B", "C", "D"})
	if result["B"] != 3 || result["C"] != 7 || result["D"] != 9 {
		t.Errorf("Unexpected distances: %v", result)
	}
}

func TestDAGHandlesNegativeEdgeWeightsCorrectly(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 2}, {"C", 4}}, "B": {{"C", -3}}, "C": {},
	}
	result := dagShortestPath(adj, "A", []string{"A", "B", "C"})
	if result["C"] != -1 {
		t.Errorf("Expected -1, got %d", result["C"])
	}
}

func TestDAGSelectsShorterOfTwoConvergingPaths(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 1}, {"C", 10}}, "B": {{"D", 2}}, "C": {{"D", 1}}, "D": {},
	}
	result := dagShortestPath(adj, "A", []string{"A", "B", "C", "D"})
	if result["D"] != 3 {
		t.Errorf("Expected 3, got %d", result["D"])
	}
}
