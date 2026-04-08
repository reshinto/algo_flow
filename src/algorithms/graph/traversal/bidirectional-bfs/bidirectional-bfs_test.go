package bidirectionalbfs

import "testing"

func TestBiBFSFindsShortestPathInSimpleLinearGraph(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"D"}, "D": {}}
	result := bidirectionalBFS(adj, "A", "D")
	expected := []string{"A", "B", "C", "D"}
	if result == nil || len(result) != 4 {
		t.Fatalf("Expected %v, got %v", expected, result)
	}
	for idx, node := range expected {
		if result[idx] != node {
			t.Errorf("Mismatch at %d: expected %s, got %s", idx, node, result[idx])
		}
	}
}

func TestBiBFSFindsPathInBranchingGraph(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C"}, "B": {"D"}, "C": {"E"},
		"D": {"F"}, "E": {"F"}, "F": {},
	}
	result := bidirectionalBFS(adj, "A", "F")
	if result == nil {
		t.Fatal("Expected a path, got nil")
	}
	if result[0] != "A" || result[len(result)-1] != "F" {
		t.Errorf("Expected path from A to F, got %v", result)
	}
}

func TestBiBFSReturnsNilWhenNoPathExists(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}, "C": {"D"}, "D": {}}
	result := bidirectionalBFS(adj, "A", "C")
	if result != nil {
		t.Errorf("Expected nil, got %v", result)
	}
}

func TestBiBFSReturnsSingleElementPathWhenStartEqualsTarget(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}}
	result := bidirectionalBFS(adj, "A", "A")
	if result == nil || len(result) != 1 || result[0] != "A" {
		t.Errorf("Expected [A], got %v", result)
	}
}

func TestBiBFSFindsShortestPathNotLongerOne(t *testing.T) {
	adj := map[string][]string{
		"A": {"B"}, "B": {"C", "E"}, "C": {"D"}, "D": {"E"}, "E": {},
	}
	result := bidirectionalBFS(adj, "A", "E")
	if result == nil {
		t.Fatal("Expected a path, got nil")
	}
	if len(result) != 3 || result[0] != "A" || result[len(result)-1] != "E" {
		t.Errorf("Expected 3-node path from A to E, got %v", result)
	}
}

func TestBiBFSHandlesAdjacentStartAndTargetNodes(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}}
	result := bidirectionalBFS(adj, "A", "B")
	if result == nil || len(result) != 2 || result[0] != "A" || result[1] != "B" {
		t.Errorf("Expected [A B], got %v", result)
	}
}

func TestBiBFSTreatsGraphAsUndirectedForBackwardFrontier(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}}
	result := bidirectionalBFS(adj, "B", "A")
	if result == nil || len(result) != 2 {
		t.Errorf("Expected 2-node path, got %v", result)
	}
}

func TestBiBFSReturnsNilForIsolatedStartNode(t *testing.T) {
	adj := map[string][]string{"A": {}, "B": {"C"}, "C": {}}
	result := bidirectionalBFS(adj, "A", "C")
	if result != nil {
		t.Errorf("Expected nil, got %v", result)
	}
}
