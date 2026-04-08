package dijkstra

import (
	"math"
	"testing"
)

func TestDijkstraComputesShortestDistancesInSimpleWeightedGraph(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 4}, {"C", 2}},
		"B": {{"D", 5}},
		"C": {{"B", 1}, {"D", 8}},
		"D": {},
	}
	result := dijkstraShortestPath(adj, "A")
	if result["A"] != 0 || result["B"] != 3 || result["C"] != 2 || result["D"] != 8 {
		t.Errorf("Unexpected distances: %v", result)
	}
}

func TestDijkstraReturnsZeroDistanceForStartNode(t *testing.T) {
	adj := map[string][]AdjEntry{"X": {{"Y", 10}}, "Y": {}}
	result := dijkstraShortestPath(adj, "X")
	if result["X"] != 0 {
		t.Errorf("Expected 0, got %d", result["X"])
	}
}

func TestDijkstraReturnsMaxForUnreachableNodes(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 1}}, "B": {}, "C": {}}
	result := dijkstraShortestPath(adj, "A")
	if result["C"] != math.MaxInt32 {
		t.Errorf("Expected MaxInt32, got %d", result["C"])
	}
}

func TestDijkstraHandlesSingleNodeGraph(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {}}
	result := dijkstraShortestPath(adj, "A")
	if result["A"] != 0 {
		t.Errorf("Expected 0, got %d", result["A"])
	}
}

func TestDijkstraFindsShortestPathThroughMultipleHops(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 4}, {"C", 2}},
		"B": {{"D", 5}},
		"C": {{"B", 1}, {"D", 8}, {"E", 10}},
		"D": {{"F", 2}},
		"E": {{"F", 3}},
		"F": {},
	}
	result := dijkstraShortestPath(adj, "A")
	if result["C"] != 2 || result["B"] != 3 || result["D"] != 8 || result["F"] != 10 || result["E"] != 12 {
		t.Errorf("Unexpected distances: %v", result)
	}
}

func TestDijkstraUsesLowerWeightPathOverDirectPath(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 10}, {"C", 1}},
		"B": {{"D", 1}},
		"C": {{"B", 1}, {"D", 5}},
		"D": {},
	}
	result := dijkstraShortestPath(adj, "A")
	if result["D"] != 3 {
		t.Errorf("Expected 3, got %d", result["D"])
	}
}

func TestDijkstraHandlesLinearChainCorrectly(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 2}}, "B": {{"C", 3}}, "C": {{"D", 4}}, "D": {},
	}
	result := dijkstraShortestPath(adj, "A")
	if result["B"] != 2 || result["C"] != 5 || result["D"] != 9 {
		t.Errorf("Unexpected distances: %v", result)
	}
}

func TestDijkstraHandlesEqualWeightEdges(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 1}, {"C", 1}}, "B": {{"D", 1}}, "C": {{"D", 1}}, "D": {},
	}
	result := dijkstraShortestPath(adj, "A")
	if result["D"] != 2 {
		t.Errorf("Expected 2, got %d", result["D"])
	}
}
