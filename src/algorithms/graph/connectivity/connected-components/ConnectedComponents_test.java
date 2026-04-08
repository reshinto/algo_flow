import java.util.*;

// Compile: javac ConnectedComponents.java ConnectedComponents_test.java
// Run:     java -ea ConnectedComponents_test
public class ConnectedComponents_test {
    public static void main(String[] args) {
        testFindsThreeDisconnectedComponents();
        testReturnsSingleComponentForFullyConnectedGraph();
        testReturnsEachNodeAsOwnComponentWhenNoEdges();
        testHandlesSingleNodeGraph();
        testHandlesLinearChainAsSingleComponent();
        testAssignsAllNodesToComponentsWithNoNodeRepeated();
        testCorrectlyIdentifies3ComponentGraphMatchingDefaultInput();
        System.out.println("All tests passed!");
    }

    static void testFindsThreeDisconnectedComponents() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B"));
        adjacencyList.put("D", Arrays.asList("E"));
        adjacencyList.put("E", Arrays.asList("D"));
        adjacencyList.put("F", Collections.emptyList());
        List<List<String>> result = ConnectedComponents.connectedComponents(
            adjacencyList, Arrays.asList("A", "B", "C", "D", "E", "F"));
        assert result.size() == 3 : "Expected 3 components, got " + result.size();
        List<Set<String>> compSets = new ArrayList<>();
        for (List<String> comp : result) compSets.add(new HashSet<>(comp));
        assert compSets.contains(new HashSet<>(Arrays.asList("A", "B", "C")));
        assert compSets.contains(new HashSet<>(Arrays.asList("D", "E")));
        assert compSets.contains(new HashSet<>(Arrays.asList("F")));
    }

    static void testReturnsSingleComponentForFullyConnectedGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("A", "B"));
        List<List<String>> result = ConnectedComponents.connectedComponents(
            adjacencyList, Arrays.asList("A", "B", "C"));
        assert result.size() == 1 : "Expected 1 component, got " + result.size();
        assert new HashSet<>(result.get(0)).equals(new HashSet<>(Arrays.asList("A", "B", "C")));
    }

    static void testReturnsEachNodeAsOwnComponentWhenNoEdges() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Collections.emptyList());
        adjacencyList.put("B", Collections.emptyList());
        adjacencyList.put("C", Collections.emptyList());
        List<List<String>> result = ConnectedComponents.connectedComponents(
            adjacencyList, Arrays.asList("A", "B", "C"));
        assert result.size() == 3;
        for (List<String> comp : result) assert comp.size() == 1;
    }

    static void testHandlesSingleNodeGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Collections.emptyList());
        List<List<String>> result = ConnectedComponents.connectedComponents(
            adjacencyList, Arrays.asList("A"));
        assert result.size() == 1;
        assert result.get(0).equals(Arrays.asList("A"));
    }

    static void testHandlesLinearChainAsSingleComponent() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "D"));
        adjacencyList.put("D", Arrays.asList("C"));
        List<List<String>> result = ConnectedComponents.connectedComponents(
            adjacencyList, Arrays.asList("A", "B", "C", "D"));
        assert result.size() == 1;
        assert new HashSet<>(result.get(0)).equals(new HashSet<>(Arrays.asList("A", "B", "C", "D")));
    }

    static void testAssignsAllNodesToComponentsWithNoNodeRepeated() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A"));
        adjacencyList.put("C", Arrays.asList("D"));
        adjacencyList.put("D", Arrays.asList("C"));
        adjacencyList.put("E", Collections.emptyList());
        List<String> nodeIds = Arrays.asList("A", "B", "C", "D", "E");
        List<List<String>> result = ConnectedComponents.connectedComponents(adjacencyList, nodeIds);
        List<String> allAssigned = new ArrayList<>();
        for (List<String> comp : result) allAssigned.addAll(comp);
        assert allAssigned.size() == nodeIds.size();
        assert new HashSet<>(allAssigned).equals(new HashSet<>(nodeIds));
    }

    static void testCorrectlyIdentifies3ComponentGraphMatchingDefaultInput() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B"));
        adjacencyList.put("D", Arrays.asList("E"));
        adjacencyList.put("E", Arrays.asList("D"));
        adjacencyList.put("F", Arrays.asList("G"));
        adjacencyList.put("G", Arrays.asList("F", "H"));
        adjacencyList.put("H", Arrays.asList("G"));
        List<List<String>> result = ConnectedComponents.connectedComponents(
            adjacencyList, Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H"));
        assert result.size() == 3 : "Expected 3, got " + result.size();
        List<Set<String>> compSets = new ArrayList<>();
        for (List<String> comp : result) compSets.add(new HashSet<>(comp));
        assert compSets.contains(new HashSet<>(Arrays.asList("A", "B", "C")));
        assert compSets.contains(new HashSet<>(Arrays.asList("D", "E")));
        assert compSets.contains(new HashSet<>(Arrays.asList("F", "G", "H")));
    }
}
