package kahns

import "testing"

func isValidTopologicalOrderKahns(order []string, adj map[string][]string) bool {
	position := make(map[string]int)
	for idx, node := range order {
		position[node] = idx
	}
	for source, neighbors := range adj {
		sourcePos, sourceOk := position[source]
		if !sourceOk {
			return false
		}
		for _, target := range neighbors {
			targetPos, targetOk := position[target]
			if !targetOk || sourcePos >= targetPos {
				return false
			}
		}
	}
	return true
}

func TestKahnsProducesValidTopologicalOrderForDefaultDag(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C"}, "B": {"D"}, "C": {"D", "E"}, "D": {"F"}, "E": {"F"}, "F": {},
	}
	result := kahnsTopologicalSort(adj, []string{"A", "B", "C", "D", "E", "F"})
	if len(result) != 6 {
		t.Fatalf("Expected 6 nodes, got %d", len(result))
	}
	if !isValidTopologicalOrderKahns(result, adj) {
		t.Errorf("Result is not a valid topological order: %v", result)
	}
}

func TestKahnsPlacesSourceNodeFirstInLinearChain(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"D"}, "D": {}}
	result := kahnsTopologicalSort(adj, []string{"A", "B", "C", "D"})
	expected := []string{"A", "B", "C", "D"}
	for idx, node := range expected {
		if result[idx] != node {
			t.Errorf("Expected %v, got %v", expected, result)
			break
		}
	}
}

func TestKahnsHandlesSingleNodeWithNoEdges(t *testing.T) {
	adj := map[string][]string{"A": {}}
	result := kahnsTopologicalSort(adj, []string{"A"})
	if len(result) != 1 || result[0] != "A" {
		t.Errorf("Expected [A], got %v", result)
	}
}

func TestKahnsReturnsAllNodesForFullyIndependentNodeSet(t *testing.T) {
	adj := map[string][]string{"A": {}, "B": {}, "C": {}, "D": {}}
	result := kahnsTopologicalSort(adj, []string{"A", "B", "C", "D"})
	if len(result) != 4 {
		t.Fatalf("Expected 4 nodes, got %d", len(result))
	}
}

func TestKahnsProducesEmptyResultWhenCycleExists(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"A"}}
	result := kahnsTopologicalSort(adj, []string{"A", "B", "C"})
	if len(result) != 0 {
		t.Errorf("Expected empty result for cyclic graph, got %v", result)
	}
}

func TestKahnsHandlesDiamondShapedDag(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"D"}, "C": {"D"}, "D": {}}
	result := kahnsTopologicalSort(adj, []string{"A", "B", "C", "D"})
	if len(result) != 4 || result[0] != "A" || result[len(result)-1] != "D" {
		t.Errorf("Unexpected result: %v", result)
	}
	if !isValidTopologicalOrderKahns(result, adj) {
		t.Errorf("Result is not a valid topological order: %v", result)
	}
}
