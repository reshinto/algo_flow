package bfs

import "testing"

func TestBFSTraversesLinearGraphInOrder(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"D"}, "D": {}}
	result := breadthFirstSearch(adj, "A")
	expected := []string{"A", "B", "C", "D"}
	if len(result) != len(expected) {
		t.Fatalf("Expected %v, got %v", expected, result)
	}
	for idx, node := range expected {
		if result[idx] != node {
			t.Errorf("Expected %v, got %v", expected, result)
			break
		}
	}
}

func TestBFSTraversesTreeGraphLevelByLevel(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C"}, "B": {"D", "E"}, "C": {"F"}, "D": {}, "E": {}, "F": {},
	}
	result := breadthFirstSearch(adj, "A")
	expected := []string{"A", "B", "C", "D", "E", "F"}
	if len(result) != len(expected) {
		t.Fatalf("Expected %v, got %v", expected, result)
	}
	for idx, node := range expected {
		if result[idx] != node {
			t.Errorf("Mismatch at index %d: expected %s, got %s", idx, node, result[idx])
		}
	}
}

func TestBFSHandlesDisconnectedGraphVisitingOnlyReachableNodes(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}, "C": {"D"}, "D": {}}
	result := breadthFirstSearch(adj, "A")
	if len(result) != 2 || result[0] != "A" || result[1] != "B" {
		t.Errorf("Expected [A B], got %v", result)
	}
	for _, node := range result {
		if node == "C" || node == "D" {
			t.Errorf("Should not have visited %s", node)
		}
	}
}

func TestBFSHandlesSingleNodeGraph(t *testing.T) {
	adj := map[string][]string{"A": {}}
	result := breadthFirstSearch(adj, "A")
	if len(result) != 1 || result[0] != "A" {
		t.Errorf("Expected [A], got %v", result)
	}
}

func TestBFSDoesNotVisitSameNodeTwiceInCyclicGraph(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"A"}}
	result := breadthFirstSearch(adj, "A")
	if len(result) != 3 {
		t.Fatalf("Expected 3 nodes, got %d: %v", len(result), result)
	}
}

func TestBFSVisitsNeighborsInOrderTheyAppear(t *testing.T) {
	adj := map[string][]string{"A": {"C", "B"}, "B": {}, "C": {}}
	result := breadthFirstSearch(adj, "A")
	if len(result) != 3 || result[0] != "A" || result[1] != "C" || result[2] != "B" {
		t.Errorf("Expected [A C B], got %v", result)
	}
}

func TestBFSHandlesNodeWithNoNeighborsInAdjacencyList(t *testing.T) {
	adj := map[string][]string{"A": {"B"}}
	result := breadthFirstSearch(adj, "A")
	if len(result) != 2 || result[0] != "A" || result[1] != "B" {
		t.Errorf("Expected [A B], got %v", result)
	}
}

func TestBFSTraversesFullyConnectedGraph(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C", "D"}, "B": {"A", "C", "D"},
		"C": {"A", "B", "D"}, "D": {"A", "B", "C"},
	}
	result := breadthFirstSearch(adj, "A")
	if len(result) != 4 || result[0] != "A" {
		t.Errorf("Expected 4 nodes starting with A, got %v", result)
	}
}
