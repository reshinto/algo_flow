package articulationpoints

import (
	"testing"
)

func TestFindsTwoArticulationPointsInDefault7NodeGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B", "C"},
		"B": {"A", "C"},
		"C": {"A", "B", "D"},
		"D": {"C", "E", "F"},
		"E": {"D", "G"},
		"F": {"D", "G"},
		"G": {"E", "F"},
	}
	nodeIds := []string{"A", "B", "C", "D", "E", "F", "G"}
	result := findArticulationPoints(adjacencyList, nodeIds)
	resultSet := make(map[string]bool)
	for _, nodeId := range result {
		resultSet[nodeId] = true
	}
	if !resultSet["C"] || !resultSet["D"] || len(result) != 2 {
		t.Errorf("Expected {C, D}, got %v", result)
	}
}

func TestReturnsNoArticulationPointsForTriangle(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B", "C"},
		"B": {"A", "C"},
		"C": {"A", "B"},
	}
	result := findArticulationPoints(adjacencyList, []string{"A", "B", "C"})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestFindsSingleArticulationPointInPathGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"},
		"B": {"A", "C"},
		"C": {"B"},
	}
	result := findArticulationPoints(adjacencyList, []string{"A", "B", "C"})
	if len(result) != 1 || result[0] != "B" {
		t.Errorf("Expected [B], got %v", result)
	}
}

func TestFindsMultipleArticulationPointsInLongerPath(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B"},
		"B": {"A", "C"},
		"C": {"B", "D"},
		"D": {"C"},
	}
	result := findArticulationPoints(adjacencyList, []string{"A", "B", "C", "D"})
	resultSet := make(map[string]bool)
	for _, nodeId := range result {
		resultSet[nodeId] = true
	}
	if !resultSet["B"] || !resultSet["C"] || len(result) != 2 {
		t.Errorf("Expected {B, C}, got %v", result)
	}
}

func TestReturnsNoArticulationPointsForSingleNode(t *testing.T) {
	result := findArticulationPoints(map[string][]string{"A": {}}, []string{"A"})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestReturnsNoArticulationPointsForFullyConnectedGraph(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B", "C", "D"},
		"B": {"A", "C", "D"},
		"C": {"A", "B", "D"},
		"D": {"A", "B", "C"},
	}
	result := findArticulationPoints(adjacencyList, []string{"A", "B", "C", "D"})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestFindsStarCenterAsArticulationPoint(t *testing.T) {
	adjacencyList := map[string][]string{
		"Center": {"A", "B", "C"},
		"A":      {"Center"},
		"B":      {"Center"},
		"C":      {"Center"},
	}
	result := findArticulationPoints(adjacencyList, []string{"Center", "A", "B", "C"})
	if len(result) != 1 || result[0] != "Center" {
		t.Errorf("Expected [Center], got %v", result)
	}
}

func TestHandlesDisconnectedGraphsWithNoArticulationPoints(t *testing.T) {
	adjacencyList := map[string][]string{
		"A": {"B", "C"},
		"B": {"A", "C"},
		"C": {"A", "B"},
		"D": {"E", "F"},
		"E": {"D", "F"},
		"F": {"D", "E"},
	}
	result := findArticulationPoints(adjacencyList, []string{"A", "B", "C", "D", "E", "F"})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}
