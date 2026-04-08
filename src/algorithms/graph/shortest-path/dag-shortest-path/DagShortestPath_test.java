import java.util.*;

// Compile: javac DagShortestPath.java DagShortestPath_test.java
// Run:     java -ea DagShortestPath_test
public class DagShortestPath_test {
    public static void main(String[] args) {
        testComputesShortestDistancesInSimpleDag();
        testReturnsZeroDistanceForStartNode();
        testReturnsInfinityForUnreachableNodes();
        testHandlesSingleNodeGraph();
        testHandlesLinearChainCorrectly();
        testHandlesNegativeEdgeWeightsCorrectly();
        testSelectsShorterOfTwoConvergingPaths();
        testHandlesMultipleSourceAdjacentNodes();
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

    static void testComputesShortestDistancesInSimpleDag() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 2}, new Object[]{"C", 6}},
            new Object[]{"B", new Object[]{"D", 1}, new Object[]{"E", 4}},
            new Object[]{"C", new Object[]{"E", 2}},
            new Object[]{"D", new Object[]{"F", 5}},
            new Object[]{"E", new Object[]{"F", 1}},
            new Object[]{"F"}
        );
        Map<String, Double> d = DagShortestPath.dagShortestPath(
            adjacencyList, "A", Arrays.asList("A","B","C","D","E","F"));
        assert d.get("A") == 0.0;
        assert d.get("B") == 2.0;
        assert d.get("C") == 6.0;
        assert d.get("D") == 3.0;
        assert d.get("E") == 6.0;
        assert d.get("F") == 7.0;
    }

    static void testReturnsZeroDistanceForStartNode() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"Start", new Object[]{"End", 5}},
            new Object[]{"End"}
        );
        Map<String, Double> d = DagShortestPath.dagShortestPath(
            adjacencyList, "Start", Arrays.asList("Start","End"));
        assert d.get("Start") == 0.0;
    }

    static void testReturnsInfinityForUnreachableNodes() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 3}},
            new Object[]{"B"},
            new Object[]{"C", new Object[]{"D", 2}},
            new Object[]{"D"}
        );
        Map<String, Double> d = DagShortestPath.dagShortestPath(
            adjacencyList, "A", Arrays.asList("A","B","C","D"));
        assert d.get("A") == 0.0;
        assert d.get("B") == 3.0;
        assert d.get("C") == Double.MAX_VALUE || d.get("C").isInfinite();
        assert d.get("D") == Double.MAX_VALUE || d.get("D").isInfinite();
    }

    static void testHandlesSingleNodeGraph() {
        Map<String, List<Object[]>> adjacencyList = adj(new Object[]{"A"});
        Map<String, Double> d = DagShortestPath.dagShortestPath(adjacencyList, "A", Arrays.asList("A"));
        assert d.get("A") == 0.0;
    }

    static void testHandlesLinearChainCorrectly() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 3}},
            new Object[]{"B", new Object[]{"C", 4}},
            new Object[]{"C", new Object[]{"D", 2}},
            new Object[]{"D"}
        );
        Map<String, Double> d = DagShortestPath.dagShortestPath(
            adjacencyList, "A", Arrays.asList("A","B","C","D"));
        assert d.get("B") == 3.0;
        assert d.get("C") == 7.0;
        assert d.get("D") == 9.0;
    }

    static void testHandlesNegativeEdgeWeightsCorrectly() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 2}, new Object[]{"C", 4}},
            new Object[]{"B", new Object[]{"C", -3}},
            new Object[]{"C"}
        );
        Map<String, Double> d = DagShortestPath.dagShortestPath(
            adjacencyList, "A", Arrays.asList("A","B","C"));
        assert d.get("A") == 0.0;
        assert d.get("B") == 2.0;
        assert d.get("C") == -1.0;
    }

    static void testSelectsShorterOfTwoConvergingPaths() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}, new Object[]{"C", 10}},
            new Object[]{"B", new Object[]{"D", 2}},
            new Object[]{"C", new Object[]{"D", 1}},
            new Object[]{"D"}
        );
        Map<String, Double> d = DagShortestPath.dagShortestPath(
            adjacencyList, "A", Arrays.asList("A","B","C","D"));
        assert d.get("D") == 3.0;
    }

    static void testHandlesMultipleSourceAdjacentNodes() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"S", new Object[]{"X", 1}, new Object[]{"Y", 4}, new Object[]{"Z", 2}},
            new Object[]{"X", new Object[]{"T", 5}},
            new Object[]{"Y", new Object[]{"T", 1}},
            new Object[]{"Z", new Object[]{"T", 3}},
            new Object[]{"T"}
        );
        Map<String, Double> d = DagShortestPath.dagShortestPath(
            adjacencyList, "S", Arrays.asList("S","X","Y","Z","T"));
        assert d.get("T") == 5.0;
    }
}
