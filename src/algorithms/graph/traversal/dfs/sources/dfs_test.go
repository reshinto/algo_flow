package dfs

import "testing"

func TestDFSTraversesLinearGraphInOrder(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"D"}, "D": {}}
	result := depthFirstSearch(adj, "A")
	expected := []string{"A", "B", "C", "D"}
	if len(result) != 4 {
		t.Fatalf("Expected %v, got %v", expected, result)
	}
	for idx, node := range expected {
		if result[idx] != node {
			t.Errorf("Expected %v, got %v", expected, result)
			break
		}
	}
}

func TestDFSHandlesDisconnectedGraphVisitingOnlyReachableNodes(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}, "C": {"D"}, "D": {}}
	result := depthFirstSearch(adj, "A")
	if len(result) != 2 || result[0] != "A" || result[1] != "B" {
		t.Errorf("Expected [A B], got %v", result)
	}
	for _, node := range result {
		if node == "C" || node == "D" {
			t.Errorf("Should not have visited %s", node)
		}
	}
}

func TestDFSHandlesSingleNodeGraph(t *testing.T) {
	adj := map[string][]string{"A": {}}
	result := depthFirstSearch(adj, "A")
	if len(result) != 1 || result[0] != "A" {
		t.Errorf("Expected [A], got %v", result)
	}
}

func TestDFSDoesNotVisitSameNodeTwiceInCyclicGraph(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"A"}}
	result := depthFirstSearch(adj, "A")
	if len(result) != 3 {
		t.Fatalf("Expected 3 nodes, got %d: %v", len(result), result)
	}
}

func TestDFSHandlesFullyConnectedGraphWithoutRevisitingNodes(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C", "D"}, "B": {"A", "C", "D"},
		"C": {"A", "B", "D"}, "D": {"A", "B", "C"},
	}
	result := depthFirstSearch(adj, "A")
	if len(result) != 4 || result[0] != "A" {
		t.Errorf("Expected 4 nodes starting with A, got %v", result)
	}
}

func TestDFSHandlesNodeWithNoNeighborsInAdjacencyList(t *testing.T) {
	adj := map[string][]string{"A": {"B"}}
	result := depthFirstSearch(adj, "A")
	if len(result) != 2 || result[0] != "A" || result[1] != "B" {
		t.Errorf("Expected [A B], got %v", result)
	}
}

func TestDFSTraversesDiamondShapedGraphVisitingEachNodeExactlyOnce(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"D"}, "C": {"D"}, "D": {}}
	result := depthFirstSearch(adj, "A")
	if len(result) != 4 || result[0] != "A" {
		t.Errorf("Expected 4 nodes starting with A, got %v", result)
	}
	nodeSet := make(map[string]bool)
	for _, node := range result {
		nodeSet[node] = true
	}
	for _, expected := range []string{"A", "B", "C", "D"} {
		if !nodeSet[expected] {
			t.Errorf("Missing node %s in result", expected)
		}
	}
}
