package bridges

import (
	"testing"
)

func TestFindsTwoBridgesInDefault7NodeGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B", "C"},
		"B": {"A", "C"},
		"C": {"B", "A", "D"},
		"D": {"C", "E"},
		"E": {"D", "F", "G"},
		"F": {"E", "G"},
		"G": {"F", "E"},
	}
	nodeIds := []string{"A", "B", "C", "D", "E", "F", "G"}
	result := findBridges(adjacencyList, nodeIds)
	if len(result) != 2 {
		t.Fatalf("Expected 2 bridges, got %d", len(result))
	}
	found := make(map[string]bool)
	for _, edge := range result {
		key := edge.Source + "-" + edge.Target
		key2 := edge.Target + "-" + edge.Source
		found[key] = true
		found[key2] = true
	}
	if !found["C-D"] && !found["D-C"] {
		t.Error("Expected C-D bridge")
	}
	if !found["D-E"] && !found["E-D"] {
		t.Error("Expected D-E bridge")
	}
}

func TestReturnsNoBridgesForCycleGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B", "C"},
		"B": {"A", "C"},
		"C": {"A", "B"},
	}
	result := findBridges(adjacencyList, []string{"A", "B", "C"})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestFindsSingleBridgeInTwoNodeGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"},
		"B": {"A"},
	}
	result := findBridges(adjacencyList, []string{"A", "B"})
	if len(result) != 1 {
		t.Fatalf("Expected 1 bridge, got %d", len(result))
	}
	edge := result[0]
	pairSet := map[string]bool{edge.Source: true, edge.Target: true}
	if !pairSet["A"] || !pairSet["B"] {
		t.Errorf("Expected A-B bridge, got %v", edge)
	}
}

func TestFindsAllEdgesAsBridgesInPathGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"},
		"B": {"A", "C"},
		"C": {"B", "D"},
		"D": {"C"},
	}
	result := findBridges(adjacencyList, []string{"A", "B", "C", "D"})
	if len(result) != 3 {
		t.Errorf("Expected 3 bridges, got %d", len(result))
	}
}

func TestReturnsEmptyForFullyConnectedGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B", "C", "D"},
		"B": {"A", "C", "D"},
		"C": {"A", "B", "D"},
		"D": {"A", "B", "C"},
	}
	result := findBridges(adjacencyList, []string{"A", "B", "C", "D"})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestHandlesDisconnectedGraphWithBridgesInEachComponent(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"},
		"B": {"A"},
		"C": {"D"},
		"D": {"C"},
	}
	result := findBridges(adjacencyList, []string{"A", "B", "C", "D"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 bridges, got %d", len(result))
	}
	found := make(map[string]bool)
	for _, edge := range result {
		found[edge.Source+"-"+edge.Target] = true
		found[edge.Target+"-"+edge.Source] = true
	}
	if !found["A-B"] && !found["B-A"] {
		t.Error("Expected A-B bridge")
	}
	if !found["C-D"] && !found["D-C"] {
		t.Error("Expected C-D bridge")
	}
}

func TestReturnsNoBridgesForSingleIsolatedNode(t *testing.T) {
	result := findBridges(map[string][]string{"A": {}}, []string{"A"})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}
