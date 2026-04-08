package connectedcomponents

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

func TestFindsThreeDisconnectedComponents(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"}, "B": {"A", "C"}, "C": {"B"},
		"D": {"E"}, "E": {"D"}, "F": {},
	}
	result := connectedComponents(adjacencyList, []string{"A", "B", "C", "D", "E", "F"})
	if len(result) != 3 {
		t.Fatalf("Expected 3 components, got %d", len(result))
	}
	sets := makeCompSets(result)
	if !containsSet(sets, map[string]bool{"A": true, "B": true, "C": true}) {
		t.Error("Missing {A,B,C} component")
	}
	if !containsSet(sets, map[string]bool{"D": true, "E": true}) {
		t.Error("Missing {D,E} component")
	}
	if !containsSet(sets, map[string]bool{"F": true}) {
		t.Error("Missing {F} component")
	}
}

func TestReturnsSingleComponentForFullyConnectedGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B", "C"}, "B": {"A", "C"}, "C": {"A", "B"},
	}
	result := connectedComponents(adjacencyList, []string{"A", "B", "C"})
	if len(result) != 1 {
		t.Errorf("Expected 1 component, got %d", len(result))
	}
}

func TestReturnsEachNodeAsOwnComponentWhenNoEdges(t *testing.T) {
	adjacencyList := map[string][]string{"A": {}, "B": {}, "C": {}}
	result := connectedComponents(adjacencyList, []string{"A", "B", "C"})
	if len(result) != 3 {
		t.Errorf("Expected 3 components, got %d", len(result))
	}
	for _, comp := range result {
		if len(comp) != 1 {
			t.Errorf("Expected component of size 1, got %v", comp)
		}
	}
}

func TestHandlesSingleNodeGraph(t *testing.T) {
	result := connectedComponents(map[string][]string{"A": {}}, []string{"A"})
	if len(result) != 1 || result[0][0] != "A" {
		t.Errorf("Expected [[A]], got %v", result)
	}
}

func TestHandlesLinearChainAsSingleComponent(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"}, "B": {"A", "C"}, "C": {"B", "D"}, "D": {"C"},
	}
	result := connectedComponents(adjacencyList, []string{"A", "B", "C", "D"})
	if len(result) != 1 {
		t.Errorf("Expected 1 component, got %d", len(result))
	}
}

func TestAssignsAllNodesToComponentsWithNoNodeRepeated(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"}, "B": {"A"}, "C": {"D"}, "D": {"C"}, "E": {},
	}
	nodeIds := []string{"A", "B", "C", "D", "E"}
	result := connectedComponents(adjacencyList, nodeIds)
	allAssigned := []string{}
	for _, comp := range result {
		allAssigned = append(allAssigned, comp...)
	}
	if len(allAssigned) != len(nodeIds) {
		t.Errorf("Expected %d nodes assigned, got %d", len(nodeIds), len(allAssigned))
	}
}

func TestCorrectlyIdentifies3ComponentGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"}, "B": {"A", "C"}, "C": {"B"},
		"D": {"E"}, "E": {"D"},
		"F": {"G"}, "G": {"F", "H"}, "H": {"G"},
	}
	result := connectedComponents(adjacencyList, []string{"A", "B", "C", "D", "E", "F", "G", "H"})
	if len(result) != 3 {
		t.Errorf("Expected 3 components, got %d", len(result))
	}
	sets := makeCompSets(result)
	if !containsSet(sets, map[string]bool{"A": true, "B": true, "C": true}) {
		t.Error("Missing {A,B,C} component")
	}
	if !containsSet(sets, map[string]bool{"D": true, "E": true}) {
		t.Error("Missing {D,E} component")
	}
	if !containsSet(sets, map[string]bool{"F": true, "G": true, "H": true}) {
		t.Error("Missing {F,G,H} component")
	}
}
