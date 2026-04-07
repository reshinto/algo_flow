package hungarianbip

import "testing"

func TestFindsPerfectMatchingForFullyMatchableBipartiteGraph(t *testing.T) {
	adj := map[string][]string{
		"L1": {"R1", "R2"}, "L2": {"R2", "R3"}, "L3": {"R1", "R3"},
		"R1": {"L1", "L3"}, "R2": {"L1", "L2"}, "R3": {"L2", "L3"},
	}
	result := hungarianMatching(adj, []string{"L1", "L2", "L3"}, []string{"R1", "R2", "R3"})
	if len(result) != 3 {
		t.Fatalf("Expected 3 matches, got %d", len(result))
	}
	rightValues := make(map[string]bool)
	for _, rightNode := range result {
		rightValues[rightNode] = true
	}
	if len(rightValues) != 3 {
		t.Error("Expected 3 distinct right nodes matched")
	}
}

func TestReturnsPartialMatchingWhenNotAllLeftNodesCanBeMatched(t *testing.T) {
	adj := map[string][]string{"L1": {"R1"}, "L2": {"R1"}, "R1": {"L1", "L2"}}
	result := hungarianMatching(adj, []string{"L1", "L2"}, []string{"R1"})
	if len(result) != 1 {
		t.Fatalf("Expected 1 match, got %d", len(result))
	}
	for _, rightNode := range result {
		if rightNode != "R1" {
			t.Errorf("Expected R1, got %s", rightNode)
		}
	}
}

func TestReturnsEmptyMatchingForGraphWithNoEdges(t *testing.T) {
	adj := map[string][]string{"L1": {}, "L2": {}, "R1": {}, "R2": {}}
	result := hungarianMatching(adj, []string{"L1", "L2"}, []string{"R1", "R2"})
	if len(result) != 0 {
		t.Errorf("Expected empty matching, got %v", result)
	}
}

func TestMatchesSingleLeftRightPairCorrectly(t *testing.T) {
	adj := map[string][]string{"L1": {"R1"}, "R1": {"L1"}}
	result := hungarianMatching(adj, []string{"L1"}, []string{"R1"})
	if result["L1"] != "R1" {
		t.Errorf("Expected L1→R1, got %v", result)
	}
}

func TestFindsAugmentingPathToRerouteExistingMatch(t *testing.T) {
	adj := map[string][]string{
		"L1": {"R1", "R2"}, "L2": {"R1"}, "R1": {"L1", "L2"}, "R2": {"L1"},
	}
	result := hungarianMatching(adj, []string{"L1", "L2"}, []string{"R1", "R2"})
	if len(result) != 2 {
		t.Fatalf("Expected 2 matches, got %d", len(result))
	}
	rightValues := make(map[string]bool)
	for _, rightNode := range result {
		rightValues[rightNode] = true
	}
	if len(rightValues) != 2 {
		t.Error("Expected 2 distinct right nodes matched")
	}
}

func TestHandlesOneToOneBipartiteGraphWithGuaranteedPerfectMatching(t *testing.T) {
	adj := map[string][]string{
		"L1": {"R1"}, "L2": {"R2"}, "L3": {"R3"},
		"R1": {"L1"}, "R2": {"L2"}, "R3": {"L3"},
	}
	result := hungarianMatching(adj, []string{"L1", "L2", "L3"}, []string{"R1", "R2", "R3"})
	if result["L1"] != "R1" || result["L2"] != "R2" || result["L3"] != "R3" {
		t.Errorf("Expected L1→R1, L2→R2, L3→R3, got %v", result)
	}
}

func TestReturnsEmptyMatchingForEmptyGraphWithNoNodes(t *testing.T) {
	result := hungarianMatching(map[string][]string{}, []string{}, []string{})
	if len(result) != 0 {
		t.Errorf("Expected empty matching, got %v", result)
	}
}
