package greedycoloring

import "testing"

func TestColorsSingleNodeWithColor0(t *testing.T) {
	result := greedyColoring(map[string][]string{"A": {}}, []string{"A"})
	if result["A"] != 0 {
		t.Errorf("Expected color 0, got %d", result["A"])
	}
}

func TestColorsTwoConnectedNodesWithDifferentColors(t *testing.T) {
	result := greedyColoring(map[string][]string{"A": {"B"}, "B": {"A"}}, []string{"A", "B"})
	if result["A"] == result["B"] {
		t.Error("Adjacent nodes should have different colors")
	}
}

func TestColorsTriangleWith3DistinctColors(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"A", "C"}, "C": {"A", "B"}}
	result := greedyColoring(adj, []string{"A", "B", "C"})
	if result["A"] == result["B"] || result["A"] == result["C"] || result["B"] == result["C"] {
		t.Error("Triangle nodes should all have different colors")
	}
}

func TestColorsBipartiteGraphWithAtMost2Colors(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "D"}, "B": {"A", "C"}, "C": {"B", "D"}, "D": {"C", "A"},
	}
	result := greedyColoring(adj, []string{"A", "B", "C", "D"})
	usedColors := make(map[int]bool)
	for _, color := range result {
		usedColors[color] = true
	}
	if len(usedColors) > 2 {
		t.Errorf("Expected at most 2 colors, got %d", len(usedColors))
	}
}

func TestAssignsSmallestAvailableColor(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"A", "C"}, "C": {"B"}}
	result := greedyColoring(adj, []string{"A", "B", "C"})
	if result["A"] != 0 {
		t.Errorf("Expected A=0, got %d", result["A"])
	}
	if result["B"] != 1 {
		t.Errorf("Expected B=1, got %d", result["B"])
	}
	if result["C"] != 0 {
		t.Errorf("Expected C=0, got %d", result["C"])
	}
}

func TestProducesValidColoringNoTwoAdjacentNodesShareColor(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C"}, "B": {"A", "C"}, "C": {"A", "B", "D"},
		"D": {"C", "E", "F"}, "E": {"D", "F"}, "F": {"D", "E"},
	}
	result := greedyColoring(adj, []string{"A", "B", "C", "D", "E", "F"})
	for nodeId, neighbors := range adj {
		for _, neighborId := range neighbors {
			if result[nodeId] == result[neighborId] {
				t.Errorf("Adjacent nodes %s and %s share color %d", nodeId, neighborId, result[nodeId])
			}
		}
	}
}

func TestColorsDisconnectedGraphIsolatedNodesGetColor0(t *testing.T) {
	result := greedyColoring(map[string][]string{"A": {}, "B": {}, "C": {}}, []string{"A", "B", "C"})
	if result["A"] != 0 || result["B"] != 0 || result["C"] != 0 {
		t.Errorf("Expected all color 0, got A=%d B=%d C=%d", result["A"], result["B"], result["C"])
	}
}
