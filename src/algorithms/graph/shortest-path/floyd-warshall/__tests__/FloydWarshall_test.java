import java.util.*;

// Compile: javac FloydWarshall.java FloydWarshall_test.java
// Run:     java -ea FloydWarshall_test
public class FloydWarshall_test {
    public static void main(String[] args) {
        testComputesAllPairsShortestPathsIn4NodeGraph();
        testSetsDiagonalEntriesToZero();
        testReturnsInfinityForUnreachableNodePairs();
        testHandlesSingleNodeGraph();
        testFindsShorterIndirectPathsOverDirectEdges();
        testComputesCorrectBidirectionalDistances();
        testHandlesNegativeEdgeWeightsWithoutNegativeCycles();
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

    static void testComputesAllPairsShortestPathsIn4NodeGraph() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 3}, new Object[]{"D", -4}},
            new Object[]{"B"},
            new Object[]{"C", new Object[]{"B", -5}},
            new Object[]{"D", new Object[]{"C", 6}}
        );
        Map<String, Map<String, Double>> d = FloydWarshall.floydWarshall(
            adjacencyList, Arrays.asList("A","B","C","D"));
        assert d.get("A").get("A") == 0.0;
        assert d.get("A").get("B") == -3.0;
        assert d.get("A").get("C") == 2.0;
        assert d.get("B").get("B") == 0.0;
    }

    static void testSetsDiagonalEntriesToZero() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"X", new Object[]{"Y", 2}},
            new Object[]{"Y", new Object[]{"Z", 3}},
            new Object[]{"Z"}
        );
        Map<String, Map<String, Double>> d = FloydWarshall.floydWarshall(
            adjacencyList, Arrays.asList("X","Y","Z"));
        assert d.get("X").get("X") == 0.0;
        assert d.get("Y").get("Y") == 0.0;
        assert d.get("Z").get("Z") == 0.0;
    }

    static void testReturnsInfinityForUnreachableNodePairs() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}},
            new Object[]{"B"},
            new Object[]{"C"}
        );
        Map<String, Map<String, Double>> d = FloydWarshall.floydWarshall(
            adjacencyList, Arrays.asList("A","B","C"));
        assert d.get("A").get("C") == Double.MAX_VALUE || d.get("A").get("C").isInfinite();
        assert d.get("C").get("A") == Double.MAX_VALUE || d.get("C").get("A").isInfinite();
    }

    static void testHandlesSingleNodeGraph() {
        Map<String, List<Object[]>> adjacencyList = adj(new Object[]{"A"});
        Map<String, Map<String, Double>> d = FloydWarshall.floydWarshall(
            adjacencyList, Arrays.asList("A"));
        assert d.get("A").get("A") == 0.0;
    }

    static void testFindsShorterIndirectPathsOverDirectEdges() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}, new Object[]{"C", 10}},
            new Object[]{"B", new Object[]{"C", 2}},
            new Object[]{"C"}
        );
        Map<String, Map<String, Double>> d = FloydWarshall.floydWarshall(
            adjacencyList, Arrays.asList("A","B","C"));
        assert d.get("A").get("C") == 3.0;
    }

    static void testComputesCorrectBidirectionalDistances() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 4}},
            new Object[]{"B", new Object[]{"A", 4}, new Object[]{"C", 3}},
            new Object[]{"C", new Object[]{"B", 3}}
        );
        Map<String, Map<String, Double>> d = FloydWarshall.floydWarshall(
            adjacencyList, Arrays.asList("A","B","C"));
        assert d.get("A").get("C") == 7.0;
        assert d.get("C").get("A") == 7.0;
    }

    static void testHandlesNegativeEdgeWeightsWithoutNegativeCycles() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 5}},
            new Object[]{"B", new Object[]{"C", -2}},
            new Object[]{"C"}
        );
        Map<String, Map<String, Double>> d = FloydWarshall.floydWarshall(
            adjacencyList, Arrays.asList("A","B","C"));
        assert d.get("A").get("C") == 3.0;
        assert d.get("A").get("B") == 5.0;
    }
}
