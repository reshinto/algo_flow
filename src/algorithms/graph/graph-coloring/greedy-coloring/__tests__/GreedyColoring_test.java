import java.util.*;

// Compile: javac GreedyColoring.java GreedyColoring_test.java
// Run:     java -ea GreedyColoring_test
public class GreedyColoring_test {
    public static void main(String[] args) {
        testColorsSingleNodeWithColor0();
        testColorsTwoConnectedNodesWithDifferentColors();
        testColorsTriangleWith3DistinctColors();
        testColorsBipartiteGraphWithAtMost2Colors();
        testAssignsSmallestAvailableColor();
        testProducesValidColoringNoTwoAdjacentNodesShareColor();
        testColorsDisconnectedGraphIsolatedNodesGetColor0();
        System.out.println("All tests passed!");
    }

    static Map<String, Integer> color(Map<String, List<String>> adj, List<String> nodeIds) {
        GreedyColoring gc = new GreedyColoring();
        return gc.greedyColoring(adj, nodeIds);
    }

    static void testColorsSingleNodeWithColor0() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Collections.emptyList());
        assert color(adj, Arrays.asList("A")).get("A") == 0;
    }

    static void testColorsTwoConnectedNodesWithDifferentColors() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("A"));
        Map<String, Integer> result = color(adj, Arrays.asList("A", "B"));
        assert !result.get("A").equals(result.get("B"));
    }

    static void testColorsTriangleWith3DistinctColors() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B", "C")); adj.put("B", Arrays.asList("A", "C"));
        adj.put("C", Arrays.asList("A", "B"));
        Map<String, Integer> result = color(adj, Arrays.asList("A", "B", "C"));
        assert !result.get("A").equals(result.get("B"));
        assert !result.get("A").equals(result.get("C"));
        assert !result.get("B").equals(result.get("C"));
    }

    static void testColorsBipartiteGraphWithAtMost2Colors() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B", "D")); adj.put("B", Arrays.asList("A", "C"));
        adj.put("C", Arrays.asList("B", "D")); adj.put("D", Arrays.asList("C", "A"));
        Map<String, Integer> result = color(adj, Arrays.asList("A", "B", "C", "D"));
        assert new HashSet<>(result.values()).size() <= 2;
    }

    static void testAssignsSmallestAvailableColor() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("A", "C"));
        adj.put("C", Arrays.asList("B"));
        Map<String, Integer> result = color(adj, Arrays.asList("A", "B", "C"));
        assert result.get("A") == 0;
        assert result.get("B") == 1;
        assert result.get("C") == 0;
    }

    static void testProducesValidColoringNoTwoAdjacentNodesShareColor() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B", "C")); adj.put("B", Arrays.asList("A", "C"));
        adj.put("C", Arrays.asList("A", "B", "D")); adj.put("D", Arrays.asList("C", "E", "F"));
        adj.put("E", Arrays.asList("D", "F")); adj.put("F", Arrays.asList("D", "E"));
        Map<String, Integer> result = color(adj, Arrays.asList("A", "B", "C", "D", "E", "F"));
        for (Map.Entry<String, List<String>> entry : adj.entrySet()) {
            for (String neighborId : entry.getValue()) {
                assert !result.get(entry.getKey()).equals(result.get(neighborId));
            }
        }
    }

    static void testColorsDisconnectedGraphIsolatedNodesGetColor0() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Collections.emptyList()); adj.put("B", Collections.emptyList());
        adj.put("C", Collections.emptyList());
        Map<String, Integer> result = color(adj, Arrays.asList("A", "B", "C"));
        assert result.get("A") == 0;
        assert result.get("B") == 0;
        assert result.get("C") == 0;
    }
}
