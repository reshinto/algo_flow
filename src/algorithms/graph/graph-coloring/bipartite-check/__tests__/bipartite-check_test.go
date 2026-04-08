package bipartitecheck

import "testing"

func TestIdentifiesSimpleTwoNodeGraphAsBipartite(t *testing.T) {
	result := bipartiteCheck(map[string][]string{"A": {"B"}, "B": {"A"}}, []string{"A", "B"})
	if !result.IsBipartite {
		t.Error("Expected bipartite")
	}
}

func TestIdentifiesEvenCycleAsBipartite(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "D"}, "B": {"A", "C"}, "C": {"B", "D"}, "D": {"C", "A"},
	}
	result := bipartiteCheck(adj, []string{"A", "B", "C", "D"})
	if !result.IsBipartite {
		t.Error("Expected bipartite (even cycle)")
	}
}

func TestIdentifiesOddCycleTriangleAsNotBipartite(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"A", "C"}, "C": {"A", "B"}}
	result := bipartiteCheck(adj, []string{"A", "B", "C"})
	if result.IsBipartite {
		t.Error("Expected not bipartite (triangle)")
	}
}

func TestIdentifiesDefault6NodeBipartiteGraphCorrectly(t *testing.T) {
	adj := map[string][]string{
		"A": {"D", "E"}, "B": {"D", "F"}, "C": {"E", "F"},
		"D": {"A", "B"}, "E": {"A", "C"}, "F": {"B", "C"},
	}
	result := bipartiteCheck(adj, []string{"A", "B", "C", "D", "E", "F"})
	if !result.IsBipartite {
		t.Error("Expected bipartite")
	}
	if result.Coloring["A"] == result.Coloring["D"] {
		t.Error("A and D should have different colors")
	}
}

func TestProducesValid2ColoringForBipartiteGraph(t *testing.T) {
	adj := map[string][]string{
		"A": {"C", "D"}, "B": {"C", "D"}, "C": {"A", "B"}, "D": {"A", "B"},
	}
	result := bipartiteCheck(adj, []string{"A", "B", "C", "D"})
	if !result.IsBipartite {
		t.Fatal("Expected bipartite")
	}
	for nodeId, neighbors := range adj {
		for _, neighborId := range neighbors {
			if result.Coloring[nodeId] == result.Coloring[neighborId] {
				t.Errorf("Adjacent nodes %s and %s have same color", nodeId, neighborId)
			}
		}
	}
}

func TestHandlesDisconnectedGraphWhereAllComponentsAreBipartite(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"A"}, "C": {"D"}, "D": {"C"}}
	result := bipartiteCheck(adj, []string{"A", "B", "C", "D"})
	if !result.IsBipartite {
		t.Error("Expected bipartite")
	}
}

func TestHandlesSingleIsolatedNodeAsBipartite(t *testing.T) {
	result := bipartiteCheck(map[string][]string{"A": {}}, []string{"A"})
	if !result.IsBipartite {
		t.Error("Expected bipartite")
	}
	if result.Coloring["A"] != 0 {
		t.Errorf("Expected color 0, got %d", result.Coloring["A"])
	}
}

func TestIdentifies5CycleAsNotBipartite(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "E"}, "B": {"A", "C"}, "C": {"B", "D"}, "D": {"C", "E"}, "E": {"D", "A"},
	}
	result := bipartiteCheck(adj, []string{"A", "B", "C", "D", "E"})
	if result.IsBipartite {
		t.Error("Expected not bipartite (5-cycle)")
	}
}
