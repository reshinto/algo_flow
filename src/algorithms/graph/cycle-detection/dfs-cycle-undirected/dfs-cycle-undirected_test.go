package dfscycleundirected

import "testing"

func TestDetectsTriangleCycle(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"A", "C"}, "C": {"B", "A"}}
	if !dfsCycleUndirected(adj, []string{"A", "B", "C"}) {
		t.Error("Expected cycle detected")
	}
}

func TestReturnsFalseForTree(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"A", "D"}, "C": {"A"}, "D": {"B"}}
	if dfsCycleUndirected(adj, []string{"A", "B", "C", "D"}) {
		t.Error("Expected no cycle")
	}
}

func TestReturnsFalseForSingleNode(t *testing.T) {
	if dfsCycleUndirected(map[string][]string{"A": {}}, []string{"A"}) {
		t.Error("Expected no cycle")
	}
}

func TestReturnsFalseForTwoDisconnectedNodes(t *testing.T) {
	if dfsCycleUndirected(map[string][]string{"A": {}, "B": {}}, []string{"A", "B"}) {
		t.Error("Expected no cycle")
	}
}

func TestDetectsCycleInDefault5NodeGraph(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "D"}, "B": {"A", "C"}, "C": {"B", "D"}, "D": {"C", "A", "E"}, "E": {"D"},
	}
	if !dfsCycleUndirected(adj, []string{"A", "B", "C", "D", "E"}) {
		t.Error("Expected cycle detected")
	}
}

func TestReturnsFalseForLinearUndirectedChain(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"A", "C"}, "C": {"B", "D"}, "D": {"C"}}
	if dfsCycleUndirected(adj, []string{"A", "B", "C", "D"}) {
		t.Error("Expected no cycle")
	}
}

func TestDetectsCycleInDisconnectedGraphWhereOneComponentHasCycle(t *testing.T) {
	adj := map[string][]string{
		"A": {"B"}, "B": {"A"},
		"C": {"D", "E"}, "D": {"C", "E"}, "E": {"C", "D"},
	}
	if !dfsCycleUndirected(adj, []string{"A", "B", "C", "D", "E"}) {
		t.Error("Expected cycle detected")
	}
}

func TestDoesNotTreatDirectParentEdgeAsBackEdge(t *testing.T) {
	adj := map[string][]string{"A": {"B"}, "B": {"A"}}
	if dfsCycleUndirected(adj, []string{"A", "B"}) {
		t.Error("Expected no cycle (parent edge is not a back edge)")
	}
}
