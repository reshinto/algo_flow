package boruvkas

import "testing"

func totalWeightBoruvkas(edges []WeightedEdge) int {
	total := 0
	for _, edge := range edges {
		total += edge.Weight
	}
	return total
}

func TestFindsCorrectMstForDefault6NodeWeightedGraph(t *testing.T) {
	edges := []WeightedEdge{
		{"A", "B", 4}, {"A", "C", 2}, {"B", "C", 1}, {"B", "D", 5},
		{"C", "D", 8}, {"C", "E", 10}, {"D", "E", 2}, {"D", "F", 6}, {"E", "F", 3},
	}
	nodeIds := []string{"A", "B", "C", "D", "E", "F"}
	result := boruvkasAlgorithm(edges, nodeIds)
	if len(result) != 5 {
		t.Fatalf("Expected 5 MST edges, got %d", len(result))
	}
	if totalWeightBoruvkas(result) != 13 {
		t.Errorf("Expected total weight 13, got %d", totalWeightBoruvkas(result))
	}
}

func TestReturnsVMinus1EdgesForConnectedGraph(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 3}, {"A", "C", 1}, {"B", "C", 2}}
	result := boruvkasAlgorithm(edges, []string{"A", "B", "C"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 MST edges, got %d", len(result))
	}
}

func TestEachComponentSelectsCheapestOutgoingEdge(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 1}, {"B", "C", 5}, {"A", "C", 3}}
	result := boruvkasAlgorithm(edges, []string{"A", "B", "C"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 MST edges, got %d", len(result))
	}
	weights := []int{result[0].Weight, result[1].Weight}
	if weights[0] > weights[1] {
		weights[0], weights[1] = weights[1], weights[0]
	}
	if weights[0] != 1 || weights[1] != 3 {
		t.Errorf("Expected weights [1,3], got %v", weights)
	}
}

func TestProducesMinimumTotalWeightSpanningTree(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 2}, {"B", "C", 3}, {"A", "C", 10}}
	result := boruvkasAlgorithm(edges, []string{"A", "B", "C"})
	if totalWeightBoruvkas(result) != 5 {
		t.Errorf("Expected total weight 5, got %d", totalWeightBoruvkas(result))
	}
	if len(result) != 2 {
		t.Errorf("Expected 2 edges, got %d", len(result))
	}
}

func TestHandlesTwoNodeGraph(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 6}}
	result := boruvkasAlgorithm(edges, []string{"A", "B"})
	if len(result) != 1 {
		t.Fatalf("Expected 1 edge, got %d", len(result))
	}
	if result[0].Weight != 6 {
		t.Errorf("Expected weight 6, got %d", result[0].Weight)
	}
}

func TestHandlesLinearFourNodeChain(t *testing.T) {
	edges := []WeightedEdge{{"A", "B", 1}, {"B", "C", 2}, {"C", "D", 3}}
	result := boruvkasAlgorithm(edges, []string{"A", "B", "C", "D"})
	if len(result) != 3 {
		t.Fatalf("Expected 3 edges, got %d", len(result))
	}
	if totalWeightBoruvkas(result) != 6 {
		t.Errorf("Expected total weight 6, got %d", totalWeightBoruvkas(result))
	}
}

func TestProducesSameTotalWeightAsKruskals(t *testing.T) {
	edges := []WeightedEdge{
		{"A", "B", 4}, {"A", "C", 2}, {"B", "C", 1}, {"B", "D", 5},
		{"D", "E", 2}, {"E", "F", 3}, {"D", "F", 6},
	}
	result := boruvkasAlgorithm(edges, []string{"A", "B", "C", "D", "E", "F"})
	if len(result) != 5 {
		t.Fatalf("Expected 5 edges, got %d", len(result))
	}
	if totalWeightBoruvkas(result) != 13 {
		t.Errorf("Expected total weight 13, got %d", totalWeightBoruvkas(result))
	}
}
