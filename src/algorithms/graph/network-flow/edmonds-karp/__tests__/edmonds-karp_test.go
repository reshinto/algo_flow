package edmondskarp

import "testing"

func TestComputesMaxFlowForSimpleLinearPath(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"T", 5}},
		"T": {},
	}
	result := edmondsKarp(graph, "S", "T")
	if result != 5 {
		t.Errorf("Expected max flow 5, got %d", result)
	}
}

func TestComputesMaxFlowLimitedByBottleneckEdge(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 10}},
		"A": {{"T", 3}},
		"T": {},
	}
	result := edmondsKarp(graph, "S", "T")
	if result != 3 {
		t.Errorf("Expected max flow 3, got %d", result)
	}
}

func TestComputesMaxFlowAcrossTwoParallelPaths(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 5}, {"B", 5}},
		"A": {{"T", 5}},
		"B": {{"T", 5}},
		"T": {},
	}
	result := edmondsKarp(graph, "S", "T")
	if result != 10 {
		t.Errorf("Expected max flow 10, got %d", result)
	}
}

func TestComputesMaxFlowForDefault6NodeNetwork(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 10}, {"B", 8}},
		"A": {{"B", 5}, {"C", 7}},
		"B": {{"D", 10}},
		"C": {{"D", 3}, {"T", 8}},
		"D": {{"T", 10}},
		"T": {},
	}
	result := edmondsKarp(graph, "S", "T")
	if result != 17 {
		t.Errorf("Expected max flow 17, got %d", result)
	}
}

func TestReturnsZeroWhenNoPathFromSourceToSink(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 10}},
		"A": {},
		"T": {},
	}
	result := edmondsKarp(graph, "S", "T")
	if result != 0 {
		t.Errorf("Expected max flow 0, got %d", result)
	}
}

func TestProducesSameMaxFlowAsFordFulkerson(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 4}, {"B", 2}},
		"A": {{"B", 4}, {"T", 2}},
		"B": {{"T", 4}},
		"T": {},
	}
	result := edmondsKarp(graph, "S", "T")
	if result != 6 {
		t.Errorf("Expected max flow 6, got %d", result)
	}
}

func TestHandlesGraphWhereSourceHasNoOutgoingEdges(t *testing.T) {
	graph := map[string][]FlowEdge{"S": {}, "T": {}}
	result := edmondsKarp(graph, "S", "T")
	if result != 0 {
		t.Errorf("Expected max flow 0, got %d", result)
	}
}

func TestHandlesThreePathDiamondGraphCorrectly(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 10}, {"B", 10}},
		"A": {{"T", 10}},
		"B": {{"T", 10}},
		"T": {},
	}
	result := edmondsKarp(graph, "S", "T")
	if result != 20 {
		t.Errorf("Expected max flow 20, got %d", result)
	}
}
