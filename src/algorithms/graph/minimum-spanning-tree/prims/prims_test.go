package prims

import "testing"

func totalWeightPrims(edges []MstEdge) int {
	total := 0
	for _, edge := range edges {
		total += edge.Weight
	}
	return total
}

func TestPFindsCorrectMstForDefault6NodeWeightedGraph(t *testing.T) {
	adjacencyList := map[string][]AdjEntry{
		"A": {{"B", 4}, {"C", 2}},
		"B": {{"A", 4}, {"C", 1}, {"D", 5}},
		"C": {{"A", 2}, {"B", 1}, {"D", 8}, {"E", 10}},
		"D": {{"B", 5}, {"C", 8}, {"E", 2}, {"F", 6}},
		"E": {{"C", 10}, {"D", 2}, {"F", 3}},
		"F": {{"D", 6}, {"E", 3}},
	}
	result := primsAlgorithm(adjacencyList, "A")
	if len(result) != 5 {
		t.Fatalf("Expected 5 MST edges, got %d", len(result))
	}
	if totalWeightPrims(result) != 13 {
		t.Errorf("Expected total weight 13, got %d", totalWeightPrims(result))
	}
}

func TestPReturnsVMinus1EdgesForFullyConnectedGraph(t *testing.T) {
	adjacencyList := map[string][]AdjEntry{
		"A": {{"B", 3}, {"C", 1}},
		"B": {{"A", 3}, {"C", 2}},
		"C": {{"A", 1}, {"B", 2}},
	}
	result := primsAlgorithm(adjacencyList, "A")
	if len(result) != 2 {
		t.Fatalf("Expected 2 MST edges, got %d", len(result))
	}
}

func TestSelectsMinimumWeightEdgeAtEachStep(t *testing.T) {
	adjacencyList := map[string][]AdjEntry{
		"A": {{"B", 10}, {"C", 1}},
		"B": {{"A", 10}, {"C", 2}},
		"C": {{"A", 1}, {"B", 2}},
	}
	result := primsAlgorithm(adjacencyList, "A")
	if len(result) != 2 {
		t.Fatalf("Expected 2 edges, got %d", len(result))
	}
	if totalWeightPrims(result) != 3 {
		t.Errorf("Expected total weight 3, got %d", totalWeightPrims(result))
	}
}

func TestDoesNotRevisitAlreadyIncludedNodes(t *testing.T) {
	adjacencyList := map[string][]AdjEntry{
		"A": {{"B", 1}, {"C", 2}},
		"B": {{"A", 1}, {"C", 3}},
		"C": {{"A", 2}, {"B", 3}},
	}
	result := primsAlgorithm(adjacencyList, "A")
	targetSet := make(map[string]bool)
	for _, edge := range result {
		targetSet[edge.Target] = true
	}
	if len(targetSet) != len(result) {
		t.Error("Expected distinct target nodes — nodes were revisited")
	}
}

func TestHandlesLinearChainGraphFromStartToEnd(t *testing.T) {
	adjacencyList := map[string][]AdjEntry{
		"A": {{"B", 5}},
		"B": {{"A", 5}, {"C", 3}},
		"C": {{"B", 3}, {"D", 7}},
		"D": {{"C", 7}},
	}
	result := primsAlgorithm(adjacencyList, "A")
	if len(result) != 3 {
		t.Fatalf("Expected 3 edges, got %d", len(result))
	}
	if totalWeightPrims(result) != 15 {
		t.Errorf("Expected total weight 15, got %d", totalWeightPrims(result))
	}
}

func TestProducesCorrectMstStartingFromNonFirstNode(t *testing.T) {
	adjacencyList := map[string][]AdjEntry{
		"A": {{"B", 1}, {"C", 4}},
		"B": {{"A", 1}, {"C", 2}},
		"C": {{"A", 4}, {"B", 2}},
	}
	fromB := primsAlgorithm(adjacencyList, "B")
	fromA := primsAlgorithm(adjacencyList, "A")
	if totalWeightPrims(fromB) != totalWeightPrims(fromA) {
		t.Errorf("Expected same total weight from any start node")
	}
}

func TestPHandlesTwoNodeGraph(t *testing.T) {
	adjacencyList := map[string][]AdjEntry{
		"A": {{"B", 9}},
		"B": {{"A", 9}},
	}
	result := primsAlgorithm(adjacencyList, "A")
	if len(result) != 1 {
		t.Fatalf("Expected 1 edge, got %d", len(result))
	}
	if result[0].Weight != 9 {
		t.Errorf("Expected weight 9, got %d", result[0].Weight)
	}
}
