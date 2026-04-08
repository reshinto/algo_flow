import java.util.*;

// Compile: javac TarjanSCC.java TarjanSCC_test.java
// Run:     java -ea TarjanSCC_test
public class TarjanSCC_test {
    public static void main(String[] args) {
        testFindsThreeSccsInDefault8NodeGraph();
        testFindsSingleSccForFullyCyclicGraph();
        testReturnsEachNodeAsOwnSccForDag();
        testHandlesSingleNodeWithNoEdges();
        testHandlesDisconnectedDirectedGraph();
        testAssignsEveryNodeToExactlyOneScc();
        testCorrectlyHandlesSelfLoopsAsSingleNodeSccs();
        System.out.println("All tests passed!");
    }

    static void testFindsThreeSccsInDefault8NodeGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B")); adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Arrays.asList("A", "D")); adjacencyList.put("D", Arrays.asList("E"));
        adjacencyList.put("E", Arrays.asList("D", "F")); adjacencyList.put("F", Arrays.asList("G"));
        adjacencyList.put("G", Arrays.asList("H")); adjacencyList.put("H", Arrays.asList("F"));
        TarjanSCC ts = new TarjanSCC();
        List<List<String>> result = ts.tarjanSCC(adjacencyList,
            Arrays.asList("A", "B", "C", "D", "E", "F", "G", "H"));
        assert result.size() == 3;
        List<Set<String>> compSets = new ArrayList<>();
        for (List<String> comp : result) compSets.add(new HashSet<>(comp));
        assert compSets.contains(new HashSet<>(Arrays.asList("A", "B", "C")));
        assert compSets.contains(new HashSet<>(Arrays.asList("D", "E")));
        assert compSets.contains(new HashSet<>(Arrays.asList("F", "G", "H")));
    }

    static void testFindsSingleSccForFullyCyclicGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B")); adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Arrays.asList("A"));
        TarjanSCC ts = new TarjanSCC();
        List<List<String>> result = ts.tarjanSCC(adjacencyList, Arrays.asList("A", "B", "C"));
        assert result.size() == 1;
        assert new HashSet<>(result.get(0)).equals(new HashSet<>(Arrays.asList("A", "B", "C")));
    }

    static void testReturnsEachNodeAsOwnSccForDag() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B")); adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Collections.emptyList());
        TarjanSCC ts = new TarjanSCC();
        List<List<String>> result = ts.tarjanSCC(adjacencyList, Arrays.asList("A", "B", "C"));
        assert result.size() == 3;
        for (List<String> comp : result) assert comp.size() == 1;
    }

    static void testHandlesSingleNodeWithNoEdges() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Collections.emptyList());
        TarjanSCC ts = new TarjanSCC();
        List<List<String>> result = ts.tarjanSCC(adjacencyList, Arrays.asList("A"));
        assert result.size() == 1;
        assert result.get(0).equals(Arrays.asList("A"));
    }

    static void testHandlesDisconnectedDirectedGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B")); adjacencyList.put("B", Arrays.asList("A"));
        adjacencyList.put("C", Arrays.asList("D")); adjacencyList.put("D", Arrays.asList("C"));
        TarjanSCC ts = new TarjanSCC();
        List<List<String>> result = ts.tarjanSCC(adjacencyList, Arrays.asList("A", "B", "C", "D"));
        assert result.size() == 2;
        List<Set<String>> compSets = new ArrayList<>();
        for (List<String> comp : result) compSets.add(new HashSet<>(comp));
        assert compSets.contains(new HashSet<>(Arrays.asList("A", "B")));
        assert compSets.contains(new HashSet<>(Arrays.asList("C", "D")));
    }

    static void testAssignsEveryNodeToExactlyOneScc() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B")); adjacencyList.put("B", Arrays.asList("C"));
        adjacencyList.put("C", Arrays.asList("A", "D")); adjacencyList.put("D", Arrays.asList("E"));
        adjacencyList.put("E", Arrays.asList("D"));
        List<String> nodeIds = Arrays.asList("A", "B", "C", "D", "E");
        TarjanSCC ts = new TarjanSCC();
        List<List<String>> result = ts.tarjanSCC(adjacencyList, nodeIds);
        List<String> allNodes = new ArrayList<>();
        for (List<String> comp : result) allNodes.addAll(comp);
        assert allNodes.size() == nodeIds.size();
        assert new HashSet<>(allNodes).equals(new HashSet<>(nodeIds));
    }

    static void testCorrectlyHandlesSelfLoopsAsSingleNodeSccs() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("A"));
        adjacencyList.put("B", Collections.emptyList());
        TarjanSCC ts = new TarjanSCC();
        List<List<String>> result = ts.tarjanSCC(adjacencyList, Arrays.asList("A", "B"));
        assert result.size() == 2;
        List<Set<String>> compSets = new ArrayList<>();
        for (List<String> comp : result) compSets.add(new HashSet<>(comp));
        assert compSets.contains(new HashSet<>(Arrays.asList("A")));
        assert compSets.contains(new HashSet<>(Arrays.asList("B")));
    }
}
