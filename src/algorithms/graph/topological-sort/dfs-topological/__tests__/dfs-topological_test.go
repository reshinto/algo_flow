package dfstopological

import "testing"

func isValidTopologicalOrderDFS(order []string, adj map[string][]string) bool {
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

func TestDFSTProducesValidTopologicalOrderForDefaultDag(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C"}, "B": {"D"}, "C": {"D", "E"}, "D": {"F"}, "E": {"F"}, "F": {},
	}
	result := dfsTopologicalSort(adj, []string{"A", "B", "C", "D", "E", "F"})
	if len(result) != 6 {
		t.Fatalf("Expected 6 nodes, got %d", len(result))
	}
	if !isValidTopologicalOrderDFS(result, adj) {
		t.Errorf("Result is not a valid topological order: %v", result)
	}
}

func TestDFSTPlacesSourceNodeFirstInLinearChain(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"D"}, "D": {}}
	result := dfsTopologicalSort(adj, []string{"A", "B", "C", "D"})
	expected := []string{"A", "B", "C", "D"}
	for idx, node := range expected {
		if result[idx] != node {
			t.Errorf("Expected %v, got %v", expected, result)
			break
		}
	}
}

func TestDFSTHandlesSingleNodeWithNoEdges(t *testing.T) {
	adj := map[string][]string{"A": {}}
	result := dfsTopologicalSort(adj, []string{"A"})
	if len(result) != 1 || result[0] != "A" {
		t.Errorf("Expected [A], got %v", result)
	}
}

func TestDFSTHandlesDiamondShapedDag(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"D"}, "C": {"D"}, "D": {}}
	result := dfsTopologicalSort(adj, []string{"A", "B", "C", "D"})
	if len(result) != 4 || result[0] != "A" || result[len(result)-1] != "D" {
		t.Errorf("Unexpected result: %v", result)
	}
	if !isValidTopologicalOrderDFS(result, adj) {
		t.Errorf("Result is not a valid topological order: %v", result)
	}
}

func TestDFSTReturnsAllNodesForFullyIndependentNodeSet(t *testing.T) {
	adj := map[string][]string{"A": {}, "B": {}, "C": {}, "D": {}}
	result := dfsTopologicalSort(adj, []string{"A", "B", "C", "D"})
	if len(result) != 4 {
		t.Fatalf("Expected 4 nodes, got %d", len(result))
	}
}

func TestDFSTDoesNotRevisitAlreadyVisitedNodes(t *testing.T) {
	adj := map[string][]string{"A": {"C"}, "B": {"C"}, "C": {"D"}, "D": {}}
	result := dfsTopologicalSort(adj, []string{"A", "B", "C", "D"})
	if len(result) != 4 {
		t.Fatalf("Expected 4 nodes, got %d", len(result))
	}
	countC := 0
	for _, node := range result {
		if node == "C" {
			countC++
		}
	}
	if countC != 1 {
		t.Errorf("Expected C to appear once, got %d times", countC)
	}
	if !isValidTopologicalOrderDFS(result, adj) {
		t.Errorf("Result is not a valid topological order: %v", result)
	}
}
