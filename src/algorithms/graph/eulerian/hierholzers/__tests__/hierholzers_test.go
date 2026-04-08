package hierholzers

import "testing"

func isValidCircuit(circuit []string, adjacencyList map[string][]string, startNodeId string) bool {
	if len(circuit) == 0 {
		return false
	}
	if circuit[0] != startNodeId {
		return false
	}
	if circuit[len(circuit)-1] != startNodeId {
		return false
	}
	totalEdges := 0
	for _, neighbors := range adjacencyList {
		totalEdges += len(neighbors)
	}
	totalEdges /= 2
	return len(circuit)-1 == totalEdges
}

func TestFindsEulerianCircuitOnSimpleTriangle(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"A", "C"}, "C": {"B", "A"}}
	circuit := hierholzersAlgorithm(adj, "A")
	if circuit[0] != "A" || circuit[len(circuit)-1] != "A" {
		t.Errorf("Circuit must start and end at A, got %v", circuit)
	}
	if !isValidCircuit(circuit, adj, "A") {
		t.Error("Circuit is not valid Eulerian")
	}
}

func TestFindsEulerianCircuitOnDefault5NodeGraph(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C", "D", "E"},
		"B": {"A", "C"},
		"C": {"B", "A"},
		"D": {"A", "E"},
		"E": {"D", "A"},
	}
	circuit := hierholzersAlgorithm(adj, "A")
	if circuit[0] != "A" || circuit[len(circuit)-1] != "A" {
		t.Error("Circuit must start and end at A")
	}
	if !isValidCircuit(circuit, adj, "A") {
		t.Error("Circuit is not valid Eulerian")
	}
}

func TestReturnsSingleNodeCircuitForGraphWithNoEdges(t *testing.T) {
	adj := map[string][]string{"A": {}}
	circuit := hierholzersAlgorithm(adj, "A")
	if len(circuit) != 1 || circuit[0] != "A" {
		t.Errorf("Expected [A], got %v", circuit)
	}
}

func TestFindsEulerianCircuitOnSquare(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "D"}, "B": {"A", "C"}, "C": {"B", "D"}, "D": {"C", "A"},
	}
	circuit := hierholzersAlgorithm(adj, "A")
	if circuit[0] != "A" || circuit[len(circuit)-1] != "A" {
		t.Error("Circuit must start and end at A")
	}
	if !isValidCircuit(circuit, adj, "A") {
		t.Error("Circuit is not valid Eulerian")
	}
}

func TestFindsEulerianCircuitOnTwoTrianglesSharingANode(t *testing.T) {
	adj := map[string][]string{
		"A": {"B", "C", "D", "E"},
		"B": {"A", "C"},
		"C": {"B", "A"},
		"D": {"A", "E"},
		"E": {"D", "A"},
	}
	circuit := hierholzersAlgorithm(adj, "A")
	if circuit[0] != "A" || circuit[len(circuit)-1] != "A" {
		t.Error("Circuit must start and end at A")
	}
	if len(circuit) != 7 {
		t.Errorf("Expected length 7, got %d", len(circuit))
	}
}

func TestFindsEulerianCircuitStartingFromNonHubNode(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"A", "C"}, "C": {"B", "A"}}
	circuit := hierholzersAlgorithm(adj, "B")
	if circuit[0] != "B" || circuit[len(circuit)-1] != "B" {
		t.Error("Circuit must start and end at B")
	}
	if len(circuit) != 4 {
		t.Errorf("Expected length 4, got %d", len(circuit))
	}
}

func TestProducesCircuitOnlyIncludingNodesWithEdges(t *testing.T) {
	adj := map[string][]string{"A": {"B", "C"}, "B": {"A", "C"}, "C": {"B", "A"}}
	circuit := hierholzersAlgorithm(adj, "A")
	validNodes := map[string]bool{"A": true, "B": true, "C": true}
	for _, nodeId := range circuit {
		if !validNodes[nodeId] {
			t.Errorf("Unexpected node %s in circuit", nodeId)
		}
	}
}
