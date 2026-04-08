import java.util.*;

// Compile: javac KosarajuSCC.java KosarajuSCC_test.java
// Run:     java -ea KosarajuSCC_test
public class KosarajuSCC_test {
    public static void main(String[] args) {
        testFindsThreeSccsInDefault8NodeGraph();
        testFindsSingleSccForFullyCyclicGraph();
        testReturnsEachNodeAsOwnSccForDag();
        testHandlesSingleNodeWithNoEdges();
        testHandlesDisconnectedDirectedGraphWithTwoMutualPairs();
        testAssignsEveryNodeToExactlyOneSccWithNoDuplicates();
        testProducesSameSccGroupingsForKnownGraph();
        System.out.println("All tests passed!");
    }

    static void testFindsThreeSccsInDefault8NodeGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Arrays.asList("A", "D"));
        adjacencyList.put("D", Arrays.asList("E"));
        adjacencyList.put("E", Arrays.asList("D", "F"));
        adjacencyList.put("F", Arrays.asList("G"));
        adjacencyList.put("G", Arrays.asList("H"));
        adjacencyList.put("H", Arrays.asList("F"));
        List<List<String>> result = KosarajuSCC.kosarajuSCC(adjacencyList,
            Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H"));
        assert result.size() == 3 : "Expected 3, got " + result.size();
        List<Set<String>> compSets = new ArrayList<>();
        for (List<String> comp : result) compSets.add(new HashSet<>(comp));
        assert compSets.contains(new HashSet<>(Arrays.asList("A", "B", "C")));
        assert compSets.contains(new HashSet<>(Arrays.asList("D", "E")));
        assert compSets.contains(new HashSet<>(Arrays.asList("F", "G", "H")));
    }

    static void testFindsSingleSccForFullyCyclicGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Arrays.asList("A"));
        List<List<String>> result = KosarajuSCC.kosarajuSCC(adjacencyList, Arrays.asList("A", "B", "C"));
        assert result.size() == 1;
        assert new HashSet<>(result.get(0)).equals(new HashSet<>(Arrays.asList("A", "B", "C")));
    }

    static void testReturnsEachNodeAsOwnSccForDag() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Collections.emptyList());
        List<List<String>> result = KosarajuSCC.kosarajuSCC(adjacencyList, Arrays.asList("A", "B", "C"));
        assert result.size() == 3;
        for (List<String> comp : result) assert comp.size() == 1;
    }

    static void testHandlesSingleNodeWithNoEdges() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Collections.emptyList());
        List<List<String>> result = KosarajuSCC.kosarajuSCC(adjacencyList, Arrays.asList("A"));
        assert result.size() == 1;
        assert result.get(0).equals(Arrays.asList("A"));
    }

    static void testHandlesDisconnectedDirectedGraphWithTwoMutualPairs() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A"));
        adjacencyList.put("C", Arrays.asList("D"));
        adjacencyList.put("D", Arrays.asList("C"));
        List<List<String>> result = KosarajuSCC.kosarajuSCC(adjacencyList, Arrays.asList("A", "B", "C", "D"));
        assert result.size() == 2;
        List<Set<String>> compSets = new ArrayList<>();
        for (List<String> comp : result) compSets.add(new HashSet<>(comp));
        assert compSets.contains(new HashSet<>(Arrays.asList("A", "B")));
        assert compSets.contains(new HashSet<>(Arrays.asList("C", "D")));
    }

    static void testAssignsEveryNodeToExactlyOneSccWithNoDuplicates() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Arrays.asList("A", "D"));
        adjacencyList.put("D", Arrays.asList("E"));
        adjacencyList.put("E", Arrays.asList("D"));
        List<String> nodeIds = Arrays.asList("A", "B", "C", "D", "E");
        List<List<String>> result = KosarajuSCC.kosarajuSCC(adjacencyList, nodeIds);
        List<String> allNodes = new ArrayList<>();
        for (List<String> comp : result) allNodes.addAll(comp);
        assert allNodes.size() == nodeIds.size();
        assert new HashSet<>(allNodes).equals(new HashSet<>(nodeIds));
    }

    static void testProducesSameSccGroupingsForKnownGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Arrays.asList("A"));
        adjacencyList.put("D", Arrays.asList("E"));
        adjacencyList.put("E", Arrays.asList("D"));
        List<List<String>> result = KosarajuSCC.kosarajuSCC(adjacencyList, Arrays.asList("A", "B", "C", "D", "E"));
        assert result.size() == 2;
        List<Set<String>> compSets = new ArrayList<>();
        for (List<String> comp : result) compSets.add(new HashSet<>(comp));
        assert compSets.contains(new HashSet<>(Arrays.asList("A", "B", "C")));
        assert compSets.contains(new HashSet<>(Arrays.asList("D", "E")));
    }
}
