package kruskals

import (
	"sort"
	"testing"
)

func totalWeightKruskals(edges []WeightedEdge) int {
	total := 0
	for _, edge := range edges {
		total += edge.Weight
	}
	return total
}

func TestKFindsCorrectMstForDefault6NodeWeightedGraph(t *testing.T) {
	edges := []WeightedEdge{
		{"A", "B", 4}, {"A", "C", 2}, {"B", "C", 1}, {"B", "D", 5},
		{"C", "D", 8}, {"C", "E", 10}, {"D", "E", 2}, {"D", "F", 6}, {"E", "F", 3},
	}
	result := kruskalsAlgorithm(edges, []string{"A", "B", "C", "D", "E", "F"})
	if len(result) != 5 {
		t.Fatalf("Expected 5 MST edges, got %d", len(result))
	}
	if totalWeightKruskals(result) != 13 {
		t.Errorf("Expected total weight 13, got %d", totalWeightKruskals(result))
	}
}

func TestKReturnsVMinus1EdgesForConnectedGraph(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 3}, {"A", "C", 1}, {"B", "C", 2}}
	result := kruskalsAlgorithm(edges, []string{"A", "B", "C"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 MST edges, got %d", len(result))
	}
}

func TestSelectsEdgesInAscendingWeightOrder(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 10}, {"B", "C", 1}, {"A", "C", 5}}
	result := kruskalsAlgorithm(edges, []string{"A", "B", "C"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 edges, got %d", len(result))
	}
	weights := []int{result[0].Weight, result[1].Weight}
	sort.Ints(weights)
	if weights[0] != 1 || weights[1] != 5 {
		t.Errorf("Expected weights [1,5], got %v", weights)
	}
}

func TestRejectsEdgesThatWouldFormCycle(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 1}, {"B", "C", 2}, {"A", "C", 3}}
	result := kruskalsAlgorithm(edges, []string{"A", "B", "C"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 edges, got %d", len(result))
	}
	if totalWeightKruskals(result) != 3 {
		t.Errorf("Expected total weight 3, got %d", totalWeightKruskals(result))
	}
}

func TestKHandlesTwoNodeGraphWithSingleEdge(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 7}}
	result := kruskalsAlgorithm(edges, []string{"A", "B"})
	if len(result) != 1 {
		t.Fatalf("Expected 1 edge, got %d", len(result))
	}
	if result[0].Weight != 7 {
		t.Errorf("Expected weight 7, got %d", result[0].Weight)
	}
}

func TestHandlesLinearChainGraphCorrectly(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 2}, {"B", "C", 4}, {"C", "D", 1}}
	result := kruskalsAlgorithm(edges, []string{"A", "B", "C", "D"})
	if len(result) != 3 {
		t.Fatalf("Expected 3 edges, got %d", len(result))
	}
	if totalWeightKruskals(result) != 7 {
		t.Errorf("Expected total weight 7, got %d", totalWeightKruskals(result))
	}
}

func TestProducesMstWithMinimumTotalWeight(t *testing.T) {
	edges := []WeightedEdge{
		{"A", "B", 1}, {"B", "C", 1}, {"C", "D", 1}, {"D", "A", 1}, {"A", "C", 10},
	}
	result := kruskalsAlgorithm(edges, []string{"A", "B", "C", "D"})
	if len(result) != 3 {
		t.Fatalf("Expected 3 edges, got %d", len(result))
	}
	if totalWeightKruskals(result) != 3 {
		t.Errorf("Expected total weight 3, got %d", totalWeightKruskals(result))
	}
}
