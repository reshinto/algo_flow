package fordfulkerson

import "testing"

func TestFFComputesMaxFlowForSimpleLinearPath(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"T", 5}},
		"T": {},
	}
	result := fordFulkerson(graph, "S", "T")
	if result != 5 {
		t.Errorf("Expected max flow 5, got %d", result)
	}
}

func TestFFComputesMaxFlowLimitedByBottleneckEdge(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 10}},
		"A": {{"T", 3}},
		"T": {},
	}
	result := fordFulkerson(graph, "S", "T")
	if result != 3 {
		t.Errorf("Expected max flow 3, got %d", result)
	}
}

func TestFFComputesMaxFlowAcrossTwoParallelPaths(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 5}, {"B", 5}},
		"A": {{"T", 5}},
		"B": {{"T", 5}},
		"T": {},
	}
	result := fordFulkerson(graph, "S", "T")
	if result != 10 {
		t.Errorf("Expected max flow 10, got %d", result)
	}
}

func TestFFComputesMaxFlowForDefault6NodeNetwork(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 10}, {"B", 8}},
		"A": {{"B", 5}, {"C", 7}},
		"B": {{"D", 10}},
		"C": {{"D", 3}, {"T", 8}},
		"D": {{"T", 10}},
		"T": {},
	}
	result := fordFulkerson(graph, "S", "T")
	if result != 17 {
		t.Errorf("Expected max flow 17, got %d", result)
	}
}

func TestFFReturnsZeroWhenNoPathFromSourceToSink(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 10}},
		"A": {},
		"T": {},
	}
	result := fordFulkerson(graph, "S", "T")
	if result != 0 {
		t.Errorf("Expected max flow 0, got %d", result)
	}
}

func TestFFHandlesGraphWhereSourceEqualsSink(t *testing.T) {
	graph := map[string][]FlowEdge{"S": {}}
	result := fordFulkerson(graph, "S", "S")
	if result != 0 {
		t.Errorf("Expected max flow 0, got %d", result)
	}
}

func TestFFRespectsCapacityLimits(t *testing.T) {
	graph := map[string][]FlowEdge{
		"S": {{"A", 4}, {"B", 2}},
		"A": {{"B", 4}, {"T", 2}},
		"B": {{"T", 4}},
		"T": {},
	}
	result := fordFulkerson(graph, "S", "T")
	if result != 6 {
		t.Errorf("Expected max flow 6, got %d", result)
	}
}
