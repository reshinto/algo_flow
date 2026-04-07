package bellmanford

import (
	"math"
	"testing"
)

func TestBFComputesShortestDistancesWithPositiveWeights(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 4}, {"C", 2}},
		"B": {{"D", 5}},
		"C": {{"B", 1}, {"D", 8}},
		"D": {},
	}
	result := bellmanFord(adj, "A", []string{"A", "B", "C", "D"})
	if result["A"] != 0 || result["C"] != 2 || result["B"] != 3 || result["D"] != 8 {
		t.Errorf("Unexpected distances: %v", result)
	}
}

func TestBFReturnsZeroForStartNode(t *testing.T) {
	adj := map[string][]AdjEntry{"X": {{"Y", 3}}, "Y": {}}
	result := bellmanFord(adj, "X", []string{"X", "Y"})
	if result["X"] != 0 {
		t.Errorf("Expected distance 0 for start node, got %d", result["X"])
	}
}

func TestBFReturnsMaxForUnreachableNodes(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {{"B", 1}}, "B": {}, "C": {}}
	result := bellmanFord(adj, "A", []string{"A", "B", "C"})
	if result["C"] != math.MaxInt32 {
		t.Errorf("Expected MaxInt32 for unreachable node, got %d", result["C"])
	}
}

func TestBFHandlesSingleNodeGraph(t *testing.T) {
	adj := map[string][]AdjEntry{"A": {}}
	result := bellmanFord(adj, "A", []string{"A"})
	if result["A"] != 0 {
		t.Errorf("Expected distance 0, got %d", result["A"])
	}
}

func TestBFHandlesLinearChainWithMixedWeights(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 3}},
		"B": {{"C", -1}},
		"C": {{"D", 4}},
		"D": {},
	}
	result := bellmanFord(adj, "A", []string{"A", "B", "C", "D"})
	if result["B"] != 3 || result["C"] != 2 || result["D"] != 6 {
		t.Errorf("Unexpected distances: %v", result)
	}
}

func TestBFMarksNegativeCycleNodesAsMinInt(t *testing.T) {
	adj := map[string][]AdjEntry{
		"A": {{"B", 1}},
		"B": {{"C", -3}},
		"C": {{"B", 1}},
		"D": {},
	}
	result := bellmanFord(adj, "A", []string{"A", "B", "C", "D"})
	if result["B"] != math.MinInt32 {
		t.Errorf("Expected MinInt32 for negative cycle node, got %d", result["B"])
	}
}
