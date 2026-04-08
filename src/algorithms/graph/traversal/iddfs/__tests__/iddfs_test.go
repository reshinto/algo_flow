package iddfs

import "testing"

func TestIDDFSTraversesLinearGraphInDepthFirstOrder(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"D"}, "D": {}}
	result := iterativeDeepeningDFS(adj, "A", -1)
	expected := []string{"A", "B", "C", "D"}
	if len(result) != len(expected) {
		t.Fatalf("Expected %v, got %v", expected, result)
	}
	for idx, node := range expected {
		if result[idx] != node {
			t.Errorf("Mismatch at %d: expected %s, got %s", idx, node, result[idx])
		}
	}
}

func TestIDDFSTraversesTreeGraphVisitingChildrenBeforeSiblings(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C"}, "B": {"D", "E"}, "C": {"F"},
		"D": {}, "E": {}, "F": {},
	}
	result := iterativeDeepeningDFS(adj, "A", -1)
	if len(result) != 6 {
		t.Fatalf("Expected 6 nodes, got %d: %v", len(result), result)
	}
	if result[0] != "A" {
		t.Errorf("Expected A first, got %s", result[0])
	}
	nodeSet := make(map[string]bool)
	for _, node := range result {
		nodeSet[node] = true
	}
	for _, expected := range []string{"A", "B", "C", "D", "E", "F"} {
		if !nodeSet[expected] {
			t.Errorf("Expected %s in result", expected)
		}
	}
}

func TestIDDFSHandlesDisconnectedGraphVisitingOnlyReachableNodes(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}, "C": {"D"}, "D": {}}
	result := iterativeDeepeningDFS(adj, "A", -1)
	nodeSet := make(map[string]bool)
	for _, node := range result {
		nodeSet[node] = true
	}
	if !nodeSet["A"] {
		t.Error("Expected A in result")
	}
	if !nodeSet["B"] {
		t.Error("Expected B in result")
	}
	if nodeSet["C"] {
		t.Error("Did not expect C in result")
	}
	if nodeSet["D"] {
		t.Error("Did not expect D in result")
	}
}

func TestIDDFSHandlesSingleNodeGraph(t *testing.T) {
	adj := map[string][]string{"A": {}}
	result := iterativeDeepeningDFS(adj, "A", -1)
	if len(result) != 1 || result[0] != "A" {
		t.Errorf("Expected [A], got %v", result)
	}
}

func TestIDDFSDoesNotVisitSameNodeTwiceInCyclicGraph(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"A"}}
	result := iterativeDeepeningDFS(adj, "A", -1)
	expected := []string{"A", "B", "C"}
	if len(result) != 3 {
		t.Fatalf("Expected 3 nodes, got %d: %v", len(result), result)
	}
	for idx, node := range expected {
		if result[idx] != node {
			t.Errorf("Mismatch at %d: expected %s, got %s", idx, node, result[idx])
		}
	}
}

func TestIDDFSRespectsExplicitMaxDepth(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C"}, "B": {"D"}, "C": {"E"},
		"D": {"F"}, "E": {}, "F": {},
	}
	result := iterativeDeepeningDFS(adj, "A", 1)
	nodeSet := make(map[string]bool)
	for _, node := range result {
		nodeSet[node] = true
	}
	if !nodeSet["A"] {
		t.Error("Expected A in result")
	}
	if !nodeSet["B"] {
		t.Error("Expected B in result")
	}
	if !nodeSet["C"] {
		t.Error("Expected C in result")
	}
	if nodeSet["D"] {
		t.Error("Did not expect D in result")
	}
	if nodeSet["F"] {
		t.Error("Did not expect F in result")
	}
}

func TestIDDFSVisitsNeighborsInOrderTheyAppearInAdjacencyList(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {}, "C": {}}
	result := iterativeDeepeningDFS(adj, "A", -1)
	if result[0] != "A" {
		t.Errorf("Expected A first, got %s", result[0])
	}
	nodeSet := make(map[string]bool)
	for _, node := range result {
		nodeSet[node] = true
	}
	for _, expected := range []string{"A", "B", "C"} {
		if !nodeSet[expected] {
			t.Errorf("Expected %s in result", expected)
		}
	}
}

func TestIDDFSTraversesFullyConnectedGraphVisitingAllNodes(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C", "D"}, "B": {"A", "C", "D"},
		"C": {"A", "B", "D"}, "D": {"A", "B", "C"},
	}
	result := iterativeDeepeningDFS(adj, "A", -1)
	if len(result) != 4 {
		t.Fatalf("Expected 4 nodes, got %d: %v", len(result), result)
	}
	if result[0] != "A" {
		t.Errorf("Expected A first, got %s", result[0])
	}
	nodeSet := make(map[string]bool)
	for _, node := range result {
		nodeSet[node] = true
	}
	for _, expected := range []string{"A", "B", "C", "D"} {
		if !nodeSet[expected] {
			t.Errorf("Expected %s in result", expected)
		}
	}
}
