package floydwarshall

import (
	"math"
	"testing"
)

func TestFWComputesAllPairsShortestPathsIn4NodeGraph(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 3}, {"D", -4}},
		"B": {},
		"C": {{"B", -5}},
		"D": {{"C", 6}},
	}
	result := floydWarshall(adj, []string{"A", "B", "C", "D"})
	if result["A"]["A"] != 0 || result["A"]["B"] != -3 || result["A"]["C"] != 2 {
		t.Errorf("Unexpected distances: A→A=%d A→B=%d A→C=%d", result["A"]["A"], result["A"]["B"], result["A"]["C"])
	}
}

func TestFWSetsDiagonalEntriesToZero(t *testing.T) {
	adj := map[string][]AdjEntry{"X": {{"Y", 2}}, "Y": {{"Z", 3}}, "Z": {}}
	result := floydWarshall(adj, []string{"X", "Y", "Z"})
	if result["X"]["X"] != 0 || result["Y"]["Y"] != 0 || result["Z"]["Z"] != 0 {
		t.Error("Expected diagonal entries to be zero")
	}
}

func TestFWReturnsMaxForUnreachableNodePairs(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 1}}, "B": {}, "C": {}}
	result := floydWarshall(adj, []string{"A", "B", "C"})
	if result["A"]["C"] != math.MaxInt32 {
		t.Errorf("Expected MaxInt32, got %d", result["A"]["C"])
	}
	if result["C"]["A"] != math.MaxInt32 {
		t.Errorf("Expected MaxInt32, got %d", result["C"]["A"])
	}
}

func TestFWHandlesSingleNodeGraph(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {}}
	result := floydWarshall(adj, []string{"A"})
	if result["A"]["A"] != 0 {
		t.Errorf("Expected 0, got %d", result["A"]["A"])
	}
}

func TestFWFindsShorterIndirectPathsOverDirectEdges(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 1}, {"C", 10}}, "B": {{"C", 2}}, "C": {}}
	result := floydWarshall(adj, []string{"A", "B", "C"})
	if result["A"]["C"] != 3 {
		t.Errorf("Expected 3, got %d", result["A"]["C"])
	}
}

func TestFWComputesCorrectBidirectionalDistances(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 4}}, "B": {{"A", 4}, {"C", 3}}, "C": {{"B", 3}}}
	result := floydWarshall(adj, []string{"A", "B", "C"})
	if result["A"]["C"] != 7 || result["C"]["A"] != 7 {
		t.Errorf("Expected 7, got A→C=%d C→A=%d", result["A"]["C"], result["C"]["A"])
	}
}

func TestFWHandlesNegativeEdgeWeightsWithoutNegativeCycles(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 5}}, "B": {{"C", -2}}, "C": {}}
	result := floydWarshall(adj, []string{"A", "B", "C"})
	if result["A"]["C"] != 3 || result["A"]["B"] != 5 {
		t.Errorf("Unexpected distances: A→C=%d A→B=%d", result["A"]["C"], result["A"]["B"])
	}
}
