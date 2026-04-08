import java.util.*;

// Compile: javac Bridges.java Bridges_test.java
// Run:     java -ea Bridges_test
public class Bridges_test {
    public static void main(String[] args) {
        testFindsTwoBridgesInDefault7NodeGraph();
        testReturnsNoBridgesForCycleGraph();
        testFindsSingleBridgeInTwoNodeGraph();
        testFindsAllEdgesAsBridgesInPathGraph();
        testReturnsEmptyForFullyConnectedGraph();
        testHandlesDisconnectedGraphWithBridgesInEachComponent();
        testReturnsNoBridgesForSingleIsolatedNode();
        System.out.println("All tests passed!");
    }

    static Set<String> bridgeSet(String[] bridge) {
        return new HashSet<>(Arrays.asList(bridge));
    }

    static void testFindsTwoBridgesInDefault7NodeGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "A", "D"));
        adjacencyList.put("D", Arrays.asList("C", "E"));
        adjacencyList.put("E", Arrays.asList("D", "F", "G"));
        adjacencyList.put("F", Arrays.asList("E", "G"));
        adjacencyList.put("G", Arrays.asList("F", "E"));
        List<String> nodeIds = Arrays.asList("A", "B", "C", "D", "E", "F", "G");

        Bridges bridges = new Bridges();
        List<String[]> result = bridges.findBridges(adjacencyList, nodeIds);
        assert result.size() == 2 : "Expected 2 bridges, got " + result.size();
        List<Set<String>> bridgeSets = new ArrayList<>();
        for (String[] bridge : result) bridgeSets.add(new HashSet<>(Arrays.asList(bridge)));
        assert bridgeSets.contains(new HashSet<>(Arrays.asList("C", "D"))) : "Missing C-D bridge";
        assert bridgeSets.contains(new HashSet<>(Arrays.asList("D", "E"))) : "Missing D-E bridge";
    }

    static void testReturnsNoBridgesForCycleGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("A", "B"));
        Bridges bridges = new Bridges();
        List<String[]> result = bridges.findBridges(adjacencyList, Arrays.asList("A", "B", "C"));
        assert result.isEmpty() : "Expected empty, got " + result.size();
    }

    static void testFindsSingleBridgeInTwoNodeGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A"));
        Bridges bridges = new Bridges();
        List<String[]> result = bridges.findBridges(adjacencyList, Arrays.asList("A", "B"));
        assert result.size() == 1 : "Expected 1 bridge, got " + result.size();
        assert new HashSet<>(Arrays.asList(result.get(0))).equals(new HashSet<>(Arrays.asList("A", "B")));
    }

    static void testFindsAllEdgesAsBridgesInPathGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "D"));
        adjacencyList.put("D", Arrays.asList("C"));
        Bridges bridges = new Bridges();
        List<String[]> result = bridges.findBridges(adjacencyList, Arrays.asList("A", "B", "C", "D"));
        assert result.size() == 3 : "Expected 3 bridges, got " + result.size();
    }

    static void testReturnsEmptyForFullyConnectedGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C", "D"));
        adjacencyList.put("B", Arrays.asList("A", "C", "D"));
        adjacencyList.put("C", Arrays.asList("A", "B", "D"));
        adjacencyList.put("D", Arrays.asList("A", "B", "C"));
        Bridges bridges = new Bridges();
        List<String[]> result = bridges.findBridges(adjacencyList, Arrays.asList("A", "B", "C", "D"));
        assert result.isEmpty() : "Expected empty, got " + result.size();
    }

    static void testHandlesDisconnectedGraphWithBridgesInEachComponent() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A"));
        adjacencyList.put("C", Arrays.asList("D"));
        adjacencyList.put("D", Arrays.asList("C"));
        Bridges bridges = new Bridges();
        List<String[]> result = bridges.findBridges(adjacencyList, Arrays.asList("A", "B", "C", "D"));
        assert result.size() == 2 : "Expected 2 bridges, got " + result.size();
        List<Set<String>> bridgeSets = new ArrayList<>();
        for (String[] bridge : result) bridgeSets.add(new HashSet<>(Arrays.asList(bridge)));
        assert bridgeSets.contains(new HashSet<>(Arrays.asList("A", "B")));
        assert bridgeSets.contains(new HashSet<>(Arrays.asList("C", "D")));
    }

    static void testReturnsNoBridgesForSingleIsolatedNode() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Collections.emptyList());
        Bridges bridges = new Bridges();
        List<String[]> result = bridges.findBridges(adjacencyList, Arrays.asList("A"));
        assert result.isEmpty() : "Expected empty, got " + result.size();
    }
}
