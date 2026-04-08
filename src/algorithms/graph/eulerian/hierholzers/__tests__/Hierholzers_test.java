import java.util.*;

// Compile: javac Hierholzers.java Hierholzers_test.java
// Run:     java -ea Hierholzers_test
public class Hierholzers_test {
    public static void main(String[] args) {
        testFindsEulerianCircuitOnSimpleTriangle();
        testFindsEulerianCircuitOnDefault5NodeGraph();
        testReturnsSingleNodeCircuitForGraphWithNoEdges();
        testFindsEulerianCircuitOnSquare();
        testFindsEulerianCircuitOnTwoTrianglesSharingANode();
        testFindsEulerianCircuitStartingFromNonHubNode();
        testProducesCircuitOnlyIncludingNodesWithEdges();
        System.out.println("All tests passed!");
    }

    static boolean isValidEulerianCircuit(List<String> circuit, Map<String, List<String>> adjacencyList, String startNodeId) {
        if (circuit.isEmpty()) return false;
        if (!circuit.get(0).equals(startNodeId)) return false;
        if (!circuit.get(circuit.size() - 1).equals(startNodeId)) return false;
        int totalEdges = adjacencyList.values().stream().mapToInt(List::size).sum() / 2;
        return circuit.size() - 1 == totalEdges;
    }

    static void testFindsEulerianCircuitOnSimpleTriangle() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "A"));
        List<String> circuit = Hierholzers.hierholzersAlgorithm(adjacencyList, "A");
        assert circuit.get(0).equals("A");
        assert circuit.get(circuit.size() - 1).equals("A");
        assert isValidEulerianCircuit(circuit, adjacencyList, "A");
    }

    static void testFindsEulerianCircuitOnDefault5NodeGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C", "D", "E"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "A"));
        adjacencyList.put("D", Arrays.asList("A", "E"));
        adjacencyList.put("E", Arrays.asList("D", "A"));
        List<String> circuit = Hierholzers.hierholzersAlgorithm(adjacencyList, "A");
        assert circuit.get(0).equals("A");
        assert circuit.get(circuit.size() - 1).equals("A");
        assert isValidEulerianCircuit(circuit, adjacencyList, "A");
    }

    static void testReturnsSingleNodeCircuitForGraphWithNoEdges() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Collections.emptyList());
        List<String> circuit = Hierholzers.hierholzersAlgorithm(adjacencyList, "A");
        assert circuit.equals(Arrays.asList("A"));
    }

    static void testFindsEulerianCircuitOnSquare() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "D"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "D"));
        adjacencyList.put("D", Arrays.asList("C", "A"));
        List<String> circuit = Hierholzers.hierholzersAlgorithm(adjacencyList, "A");
        assert circuit.get(0).equals("A");
        assert circuit.get(circuit.size() - 1).equals("A");
        assert isValidEulerianCircuit(circuit, adjacencyList, "A");
    }

    static void testFindsEulerianCircuitOnTwoTrianglesSharingANode() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C", "D", "E"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "A"));
        adjacencyList.put("D", Arrays.asList("A", "E"));
        adjacencyList.put("E", Arrays.asList("D", "A"));
        List<String> circuit = Hierholzers.hierholzersAlgorithm(adjacencyList, "A");
        assert circuit.get(0).equals("A");
        assert circuit.get(circuit.size() - 1).equals("A");
        assert circuit.size() == 7;
    }

    static void testFindsEulerianCircuitStartingFromNonHubNode() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "A"));
        List<String> circuit = Hierholzers.hierholzersAlgorithm(adjacencyList, "B");
        assert circuit.get(0).equals("B");
        assert circuit.get(circuit.size() - 1).equals("B");
        assert circuit.size() == 4;
    }

    static void testProducesCircuitOnlyIncludingNodesWithEdges() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "A"));
        List<String> circuit = Hierholzers.hierholzersAlgorithm(adjacencyList, "A");
        Set<String> validNodes = new HashSet<>(Arrays.asList("A", "B", "C"));
        for (String nodeId : circuit) assert validNodes.contains(nodeId);
    }
}
