package kosarajuscc

import (
	"testing"
)

func makeCompSets(result [][]string) []map[string]bool {
	sets := make([]map[string]bool, len(result))
	for idx, comp := range result {
		sets[idx] = make(map[string]bool)
		for _, nodeId := range comp {
			sets[idx][nodeId] = true
		}
	}
	return sets
}

func containsSet(sets []map[string]bool, expected map[string]bool) bool {
	for _, setItem := range sets {
		if len(setItem) != len(expected) {
			continue
		}
		match := true
		for key := range expected {
			if !setItem[key] {
				match = false
				break
			}
		}
		if match {
			return true
		}
	}
	return false
}

func TestFindsThreeSccsInDefault8NodeGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"}, "B": {"C"}, "C": {"A", "D"},
		"D": {"E"}, "E": {"D", "F"}, "F": {"G"},
		"G": {"H"}, "H": {"F"},
	}
	nodeIds := []string{"A", "B", "C", "D", "E", "F", "G", "H"}
	result := kosarajuSCC(adjacencyList, nodeIds)
	if len(result) != 3 {
		t.Fatalf("Expected 3 SCCs, got %d", len(result))
	}
	sets := makeCompSets(result)
	if !containsSet(sets, map[string]bool{"A": true, "B": true, "C": true}) {
		t.Error("Missing {A,B,C} SCC")
	}
	if !containsSet(sets, map[string]bool{"D": true, "E": true}) {
		t.Error("Missing {D,E} SCC")
	}
	if !containsSet(sets, map[string]bool{"F": true, "G": true, "H": true}) {
		t.Error("Missing {F,G,H} SCC")
	}
}

func TestFindsSingleSccForFullyCyclicGraph(t *testing.T) {
	adjacencyList := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"A"}}
	result := kosarajuSCC(adjacencyList, []string{"A", "B", "C"})
	if len(result) != 1 {
		t.Errorf("Expected 1 SCC, got %d", len(result))
	}
}

func TestReturnsEachNodeAsOwnSccForDag(t *testing.T) {
	adjacencyList := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {}}
	result := kosarajuSCC(adjacencyList, []string{"A", "B", "C"})
	if len(result) != 3 {
		t.Errorf("Expected 3 SCCs, got %d", len(result))
	}
	for _, comp := range result {
		if len(comp) != 1 {
			t.Errorf("Expected component of size 1, got %v", comp)
		}
	}
}

func TestHandlesSingleNodeWithNoEdges(t *testing.T) {
	result := kosarajuSCC(map[string][]string{"A": {}}, []string{"A"})
	if len(result) != 1 || result[0][0] != "A" {
		t.Errorf("Expected [[A]], got %v", result)
	}
}

func TestHandlesDisconnectedDirectedGraphWithTwoMutualPairs(t *testing.T) {
	adjacencyList := map[string][]string{"A": {"B"}, "B": {"A"}, "C": {"D"}, "D": {"C"}}
	result := kosarajuSCC(adjacencyList, []string{"A", "B", "C", "D"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 SCCs, got %d", len(result))
	}
	sets := makeCompSets(result)
	if !containsSet(sets, map[string]bool{"A": true, "B": true}) {
		t.Error("Missing {A,B} SCC")
	}
	if !containsSet(sets, map[string]bool{"C": true, "D": true}) {
		t.Error("Missing {C,D} SCC")
	}
}

func TestAssignsEveryNodeToExactlyOneSccWithNoDuplicates(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"}, "B": {"C"}, "C": {"A", "D"}, "D": {"E"}, "E": {"D"},
	}
	nodeIds := []string{"A", "B", "C", "D", "E"}
	result := kosarajuSCC(adjacencyList, nodeIds)
	allNodes := []string{}
	for _, comp := range result {
		allNodes = append(allNodes, comp...)
	}
	if len(allNodes) != len(nodeIds) {
		t.Errorf("Expected %d nodes, got %d", len(nodeIds), len(allNodes))
	}
}

func TestProducesSameSccGroupingsForKnownGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"}, "B": {"C"}, "C": {"A"}, "D": {"E"}, "E": {"D"},
	}
	result := kosarajuSCC(adjacencyList, []string{"A", "B", "C", "D", "E"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 SCCs, got %d", len(result))
	}
	sets := makeCompSets(result)
	if !containsSet(sets, map[string]bool{"A": true, "B": true, "C": true}) {
		t.Error("Missing {A,B,C} SCC")
	}
	if !containsSet(sets, map[string]bool{"D": true, "E": true}) {
		t.Error("Missing {D,E} SCC")
	}
}
