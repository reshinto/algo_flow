import java.util.*;

// Compile: javac Dijkstra.java Dijkstra_test.java
// Run:     java -ea Dijkstra_test
public class Dijkstra_test {
    public static void main(String[] args) {
        testComputesShortestDistancesInSimpleWeightedGraph();
        testReturnsZeroDistanceForStartNode();
        testReturnsInfinityForUnreachableNodes();
        testHandlesSingleNodeGraph();
        testFindsShortestPathThroughMultipleHops();
        testUsesLowerWeightPathOverDirectPath();
        testHandlesLinearChainCorrectly();
        testHandlesEqualWeightEdges();
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

    static void testComputesShortestDistancesInSimpleWeightedGraph() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 4}, new Object[]{"C", 2}},
            new Object[]{"B", new Object[]{"D", 5}},
            new Object[]{"C", new Object[]{"B", 1}, new Object[]{"D", 8}},
            new Object[]{"D"}
        );
        Map<String, Double> d = Dijkstra.dijkstraShortestPath(adjacencyList, "A");
        assert d.get("A") == 0.0;
        assert d.get("B") == 3.0;
        assert d.get("C") == 2.0;
        assert d.get("D") == 8.0;
    }

    static void testReturnsZeroDistanceForStartNode() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"X", new Object[]{"Y", 10}},
            new Object[]{"Y"}
        );
        Map<String, Double> d = Dijkstra.dijkstraShortestPath(adjacencyList, "X");
        assert d.get("X") == 0.0;
    }

    static void testReturnsInfinityForUnreachableNodes() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}},
            new Object[]{"B"},
            new Object[]{"C"}
        );
        Map<String, Double> d = Dijkstra.dijkstraShortestPath(adjacencyList, "A");
        assert d.get("C") == Double.MAX_VALUE || d.get("C").isInfinite();
    }

    static void testHandlesSingleNodeGraph() {
        Map<String, List<Object[]>> adjacencyList = adj(new Object[]{"A"});
        Map<String, Double> d = Dijkstra.dijkstraShortestPath(adjacencyList, "A");
        assert d.get("A") == 0.0;
    }

    static void testFindsShortestPathThroughMultipleHops() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 4}, new Object[]{"C", 2}},
            new Object[]{"B", new Object[]{"D", 5}},
            new Object[]{"C", new Object[]{"B", 1}, new Object[]{"D", 8}, new Object[]{"E", 10}},
            new Object[]{"D", new Object[]{"F", 2}},
            new Object[]{"E", new Object[]{"F", 3}},
            new Object[]{"F"}
        );
        Map<String, Double> d = Dijkstra.dijkstraShortestPath(adjacencyList, "A");
        assert d.get("C") == 2.0;
        assert d.get("B") == 3.0;
        assert d.get("D") == 8.0;
        assert d.get("F") == 10.0;
        assert d.get("E") == 12.0;
    }

    static void testUsesLowerWeightPathOverDirectPath() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 10}, new Object[]{"C", 1}},
            new Object[]{"B", new Object[]{"D", 1}},
            new Object[]{"C", new Object[]{"B", 1}, new Object[]{"D", 5}},
            new Object[]{"D"}
        );
        Map<String, Double> d = Dijkstra.dijkstraShortestPath(adjacencyList, "A");
        assert d.get("D") == 3.0;
    }

    static void testHandlesLinearChainCorrectly() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 2}},
            new Object[]{"B", new Object[]{"C", 3}},
            new Object[]{"C", new Object[]{"D", 4}},
            new Object[]{"D"}
        );
        Map<String, Double> d = Dijkstra.dijkstraShortestPath(adjacencyList, "A");
        assert d.get("B") == 2.0;
        assert d.get("C") == 5.0;
        assert d.get("D") == 9.0;
    }

    static void testHandlesEqualWeightEdges() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}, new Object[]{"C", 1}},
            new Object[]{"B", new Object[]{"D", 1}},
            new Object[]{"C", new Object[]{"D", 1}},
            new Object[]{"D"}
        );
        Map<String, Double> d = Dijkstra.dijkstraShortestPath(adjacencyList, "A");
        assert d.get("D") == 2.0;
    }
}
