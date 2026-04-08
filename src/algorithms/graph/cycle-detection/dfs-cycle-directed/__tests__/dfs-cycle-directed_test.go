package dfscycledirected

import "testing"

func TestDetectsSimpleBackEdgeCycle(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"A"}}
	if !dfsCycleDirected(adj, []string{"A", "B", "C"}) {
		t.Error("Expected cycle detected")
	}
}

func TestReturnsFalseForSimpleDag(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"D"}, "C": {"D"}, "D": {}}
	if dfsCycleDirected(adj, []string{"A", "B", "C", "D"}) {
		t.Error("Expected no cycle")
	}
}

func TestDetectsSelfLoop(t *testing.T) {
	adj := map[string][]string{"A": {"A"}, "B": {}}
	if !dfsCycleDirected(adj, []string{"A", "B"}) {
		t.Error("Expected cycle detected (self-loop)")
	}
}

func TestReturnsFalseForSingleNodeWithNoEdges(t *testing.T) {
	if dfsCycleDirected(map[string][]string{"A": {}}, []string{"A"}) {
		t.Error("Expected no cycle")
	}
}

func TestDetectsCycleInDefault5NodeGraph(t *testing.T) {
	adj := map[string][]string{
		"A": {"B"}, "B": {"C"}, "C": {"D"}, "D": {"B"}, "E": {"A"},
	}
	if !dfsCycleDirected(adj, []string{"A", "B", "C", "D", "E"}) {
		t.Error("Expected cycle detected")
	}
}

func TestReturnsFalseForLinearDirectedChain(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"C"}, "C": {"D"}, "D": {}}
	if dfsCycleDirected(adj, []string{"A", "B", "C", "D"}) {
		t.Error("Expected no cycle")
	}
}

func TestReturnsFalseForDisconnectedAcyclicGraph(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}, "C": {"D"}, "D": {}}
	if dfsCycleDirected(adj, []string{"A", "B", "C", "D"}) {
		t.Error("Expected no cycle")
	}
}

func TestDetectsCycleInDisconnectedGraphWhereOnlyOneComponentHasCycle(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {}, "C": {"D"}, "D": {"C"}}
	if !dfsCycleDirected(adj, []string{"A", "B", "C", "D"}) {
		t.Error("Expected cycle detected")
	}
}

func TestHandlesCrossEdgeCorrectlyNoFalsePositive(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"D"}, "C": {"D"}, "D": {}}
	if dfsCycleDirected(adj, []string{"A", "B", "C", "D"}) {
		t.Error("Expected no cycle (cross edge)")
	}
}
