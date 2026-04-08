import java.util.*;

// Compile: javac BipartiteCheck.java BipartiteCheck_test.java
// Run:     java -ea BipartiteCheck_test
public class BipartiteCheck_test {
    public static void main(String[] args) {
        testIdentifiesSimpleTwoNodeGraphAsBipartite();
        testIdentifiesEvenCycleAsBipartite();
        testIdentifiesOddCycleTriangleAsNotBipartite();
        testIdentifiesDefault6NodeBipartiteGraphCorrectly();
        testProducesValid2ColoringForBipartiteGraph();
        testHandlesDisconnectedGraphWhereAllComponentsAreBipartite();
        testHandlesSingleIsolatedNodeAsBipartite();
        testIdentifies5CycleAsNotBipartite();
        System.out.println("All tests passed!");
    }

    @SuppressWarnings("unchecked")
    static Map<String, Object> check(Map<String, List<String>> adj, List<String> nodeIds) {
        BipartiteCheck bc = new BipartiteCheck();
        return bc.bipartiteCheck(adj, nodeIds);
    }

    static void testIdentifiesSimpleTwoNodeGraphAsBipartite() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("A"));
        Map<String, Object> result = check(adj, Arrays.asList("A", "B"));
        assert (boolean) result.get("isBipartite");
    }

    static void testIdentifiesEvenCycleAsBipartite() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B", "D")); adj.put("B", Arrays.asList("A", "C"));
        adj.put("C", Arrays.asList("B", "D")); adj.put("D", Arrays.asList("C", "A"));
        Map<String, Object> result = check(adj, Arrays.asList("A", "B", "C", "D"));
        assert (boolean) result.get("isBipartite");
    }

    static void testIdentifiesOddCycleTriangleAsNotBipartite() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B", "C")); adj.put("B", Arrays.asList("A", "C"));
        adj.put("C", Arrays.asList("A", "B"));
        Map<String, Object> result = check(adj, Arrays.asList("A", "B", "C"));
        assert !(boolean) result.get("isBipartite");
    }

    @SuppressWarnings("unchecked")
    static void testIdentifiesDefault6NodeBipartiteGraphCorrectly() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("D", "E")); adj.put("B", Arrays.asList("D", "F"));
        adj.put("C", Arrays.asList("E", "F")); adj.put("D", Arrays.asList("A", "B"));
        adj.put("E", Arrays.asList("A", "C")); adj.put("F", Arrays.asList("B", "C"));
        Map<String, Object> result = check(adj, Arrays.asList("A", "B", "C", "D", "E", "F"));
        assert (boolean) result.get("isBipartite");
        Map<String, Integer> coloring = (Map<String, Integer>) result.get("coloring");
        assert !coloring.get("A").equals(coloring.get("D"));
        assert !coloring.get("A").equals(coloring.get("E"));
    }

    @SuppressWarnings("unchecked")
    static void testProducesValid2ColoringForBipartiteGraph() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("C", "D")); adj.put("B", Arrays.asList("C", "D"));
        adj.put("C", Arrays.asList("A", "B")); adj.put("D", Arrays.asList("A", "B"));
        Map<String, Object> result = check(adj, Arrays.asList("A", "B", "C", "D"));
        assert (boolean) result.get("isBipartite");
        Map<String, Integer> coloring = (Map<String, Integer>) result.get("coloring");
        for (Map.Entry<String, List<String>> entry : adj.entrySet()) {
            for (String neighborId : entry.getValue()) {
                assert !coloring.get(entry.getKey()).equals(coloring.get(neighborId));
            }
        }
    }

    static void testHandlesDisconnectedGraphWhereAllComponentsAreBipartite() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("A"));
        adj.put("C", Arrays.asList("D")); adj.put("D", Arrays.asList("C"));
        Map<String, Object> result = check(adj, Arrays.asList("A", "B", "C", "D"));
        assert (boolean) result.get("isBipartite");
    }

    @SuppressWarnings("unchecked")
    static void testHandlesSingleIsolatedNodeAsBipartite() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Collections.emptyList());
        Map<String, Object> result = check(adj, Arrays.asList("A"));
        assert (boolean) result.get("isBipartite");
        Map<String, Integer> coloring = (Map<String, Integer>) result.get("coloring");
        assert coloring.get("A") == 0;
    }

    static void testIdentifies5CycleAsNotBipartite() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B", "E")); adj.put("B", Arrays.asList("A", "C"));
        adj.put("C", Arrays.asList("B", "D")); adj.put("D", Arrays.asList("C", "E"));
        adj.put("E", Arrays.asList("D", "A"));
        Map<String, Object> result = check(adj, Arrays.asList("A", "B", "C", "D", "E"));
        assert !(boolean) result.get("isBipartite");
    }
}
