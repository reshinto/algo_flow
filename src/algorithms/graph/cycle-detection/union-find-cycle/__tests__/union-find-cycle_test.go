package unionfindcycle

import "testing"

func TestDetectsTriangleCycle(t *testing.T) {
	edges := []Edge{{"A", "B"}, {"B", "C"}, {"C", "A"}}
	if !unionFindCycle(edges, []string{"A", "B", "C"}) {
		t.Error("Expected cycle detected")
	}
}

func TestReturnsFalseForTreeWithNoCycle(t *testing.T) {
	edges := []Edge{{"A", "B"}, {"A", "C"}, {"B", "D"}}
	if unionFindCycle(edges, []string{"A", "B", "C", "D"}) {
		t.Error("Expected no cycle")
	}
}

func TestReturnsFalseForEmptyEdgeList(t *testing.T) {
	if unionFindCycle([]Edge{}, []string{"A", "B", "C"}) {
		t.Error("Expected no cycle")
	}
}

func TestReturnsFalseForSingleNodeWithNoEdges(t *testing.T) {
	if unionFindCycle([]Edge{}, []string{"A"}) {
		t.Error("Expected no cycle")
	}
}

func TestDetectsCycleInDefault5NodeGraph(t *testing.T) {
	edges := []Edge{{"A", "B"}, {"B", "C"}, {"C", "D"}, {"D", "A"}, {"D", "E"}}
	if !unionFindCycle(edges, []string{"A", "B", "C", "D", "E"}) {
		t.Error("Expected cycle detected")
	}
}

func TestReturnsFalseForLinearUndirectedChain(t *testing.T) {
	edges := []Edge{{"A", "B"}, {"B", "C"}, {"C", "D"}}
	if unionFindCycle(edges, []string{"A", "B", "C", "D"}) {
		t.Error("Expected no cycle")
	}
}

func TestDetectsCycleWhenCycleFormingEdgeIsLast(t *testing.T) {
	edges := []Edge{{"A", "B"}, {"B", "C"}, {"C", "D"}, {"D", "E"}, {"E", "A"}}
	if !unionFindCycle(edges, []string{"A", "B", "C", "D", "E"}) {
		t.Error("Expected cycle detected")
	}
}

func TestCorrectlyHandlesStarGraphNoCycle(t *testing.T) {
	edges := []Edge{{"A", "B"}, {"A", "C"}, {"A", "D"}, {"A", "E"}}
	if unionFindCycle(edges, []string{"A", "B", "C", "D", "E"}) {
		t.Error("Expected no cycle (star graph)")
	}
}

func TestDetectsMultiComponentGraphWhereOnlyOneHasCycle(t *testing.T) {
	edges := []Edge{{"A", "B"}, {"C", "D"}, {"D", "E"}, {"E", "C"}}
	if !unionFindCycle(edges, []string{"A", "B", "C", "D", "E"}) {
		t.Error("Expected cycle detected")
	}
}
