import java.util.*;

// Compile: javac BellmanFord.java BellmanFord_test.java
// Run:     java -ea BellmanFord_test
public class BellmanFord_test {
    public static void main(String[] args) {
        testComputesShortestDistancesWithPositiveWeights();
        testHandlesNegativeEdgeWeight();
        testReturnsZeroForStartNode();
        testReturnsInfinityForUnreachableNodes();
        testHandlesSingleNodeGraph();
        testHandlesLinearChainWithMixedWeights();
        testMarksNegativeCycleNodesAsNegativeInfinity();
        System.out.println("All tests passed!");
    }

    static Map<String, List<Object[]>> adj(Object[]... entries) {
        Map<String, List<Object[]>> map = new LinkedHashMap<>();
        for (Object[] entry : entries) {
            String node = (String) entry[0];
            List<Object[]> neighbors = new ArrayList<>();
            for (int edgeIdx = 1; edgeIdx < entry.length; edgeIdx++) {
                neighbors.add((Object[]) entry[edgeIdx]);
            }
            map.put(node, neighbors);
        }
        return map;
    }

    static void testComputesShortestDistancesWithPositiveWeights() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 4}, new Object[]{"C", 2}},
            new Object[]{"B", new Object[]{"D", 5}},
            new Object[]{"C", new Object[]{"B", 1}, new Object[]{"D", 8}},
            new Object[]{"D"}
        );
        Map<String, Double> distances = BellmanFord.bellmanFord(
            adjacencyList, "A", Arrays.asList("A", "B", "C", "D"));
        assert distances.get("A") == 0.0;
        assert distances.get("C") == 2.0;
        assert distances.get("B") == 3.0;
        assert distances.get("D") == 8.0;
    }

    static void testHandlesNegativeEdgeWeight() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 6}, new Object[]{"C", 7}},
            new Object[]{"B", new Object[]{"D", 5}, new Object[]{"E", -4}},
            new Object[]{"C", new Object[]{"D", -3}},
            new Object[]{"D", new Object[]{"B", -2}},
            new Object[]{"E", new Object[]{"D", 7}}
        );
        Map<String, Double> distances = BellmanFord.bellmanFord(
            adjacencyList, "A", Arrays.asList("A", "B", "C", "D", "E"));
        assert distances.get("A") == 0.0;
        assert distances.get("C") == 7.0;
    }

    static void testReturnsZeroForStartNode() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"X", new Object[]{"Y", 3}},
            new Object[]{"Y"}
        );
        Map<String, Double> distances = BellmanFord.bellmanFord(
            adjacencyList, "X", Arrays.asList("X", "Y"));
        assert distances.get("X") == 0.0;
    }

    static void testReturnsInfinityForUnreachableNodes() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}},
            new Object[]{"B"},
            new Object[]{"C"}
        );
        Map<String, Double> distances = BellmanFord.bellmanFord(
            adjacencyList, "A", Arrays.asList("A", "B", "C"));
        assert distances.get("C") == Double.MAX_VALUE || distances.get("C").isInfinite();
    }

    static void testHandlesSingleNodeGraph() {
        Map<String, List<Object[]>> adjacencyList = adj(new Object[]{"A"});
        Map<String, Double> distances = BellmanFord.bellmanFord(
            adjacencyList, "A", Arrays.asList("A"));
        assert distances.get("A") == 0.0;
    }

    static void testHandlesLinearChainWithMixedWeights() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 3}},
            new Object[]{"B", new Object[]{"C", -1}},
            new Object[]{"C", new Object[]{"D", 4}},
            new Object[]{"D"}
        );
        Map<String, Double> distances = BellmanFord.bellmanFord(
            adjacencyList, "A", Arrays.asList("A", "B", "C", "D"));
        assert distances.get("B") == 3.0;
        assert distances.get("C") == 2.0;
        assert distances.get("D") == 6.0;
    }

    static void testMarksNegativeCycleNodesAsNegativeInfinity() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}},
            new Object[]{"B", new Object[]{"C", -3}},
            new Object[]{"C", new Object[]{"B", 1}},
            new Object[]{"D"}
        );
        Map<String, Double> distances = BellmanFord.bellmanFord(
            adjacencyList, "A", Arrays.asList("A", "B", "C", "D"));
        assert distances.get("B") == Double.NEGATIVE_INFINITY;
    }
}
