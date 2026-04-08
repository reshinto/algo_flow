import java.util.*;

// Compile: javac AStar.java AStar_test.java
// Run:     java -ea AStar_test
public class AStar_test {
    public static void main(String[] args) {
        testFindsShortestPathInSimpleWeightedGraph();
        testReturnsSingleElementPathWhenStartEqualsTarget();
        testReturnsNullWhenNoPathExistsToTarget();
        testFindsTwoNodeGraphCorrectly();
        testFindsPathThrough6NodeGraph();
        testCorrectlyPrefersHeuristicGuidedPath();
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

    static Map<String, Double> heuristic(Object[]... entries) {
        Map<String, Double> map = new LinkedHashMap<>();
        for (Object[] entry : entries) {
            map.put((String) entry[0], ((Number) entry[1]).doubleValue());
        }
        return map;
    }

    static void testFindsShortestPathInSimpleWeightedGraph() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 4}, new Object[]{"C", 2}},
            new Object[]{"B", new Object[]{"D", 5}},
            new Object[]{"C", new Object[]{"B", 1}},
            new Object[]{"D"}
        );
        Map<String, Double> h = heuristic(
            new Object[]{"A", 10}, new Object[]{"B", 5}, new Object[]{"C", 7}, new Object[]{"D", 0}
        );
        List<String> result = AStar.aStarSearch(adjacencyList, "A", "D", h);
        assert result != null;
        assert result.get(0).equals("A");
        assert result.get(result.size() - 1).equals("D");
    }

    static void testReturnsSingleElementPathWhenStartEqualsTarget() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 3}},
            new Object[]{"B"}
        );
        Map<String, Double> h = heuristic(new Object[]{"A", 0.0}, new Object[]{"B", 0.0});
        List<String> result = AStar.aStarSearch(adjacencyList, "A", "A", h);
        assert result != null && result.size() == 1 && result.get(0).equals("A");
    }

    static void testReturnsNullWhenNoPathExistsToTarget() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}},
            new Object[]{"B"},
            new Object[]{"C"}
        );
        Map<String, Double> h = heuristic(
            new Object[]{"A", 5.0}, new Object[]{"B", 3.0}, new Object[]{"C", 0.0}
        );
        List<String> result = AStar.aStarSearch(adjacencyList, "A", "C", h);
        assert result == null;
    }

    static void testFindsTwoNodeGraphCorrectly() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"Start", new Object[]{"End", 7}},
            new Object[]{"End"}
        );
        Map<String, Double> h = heuristic(new Object[]{"Start", 7.0}, new Object[]{"End", 0.0});
        List<String> result = AStar.aStarSearch(adjacencyList, "Start", "End", h);
        assert result != null && result.equals(Arrays.asList("Start", "End"));
    }

    static void testFindsPathThrough6NodeGraph() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 4}, new Object[]{"C", 2}},
            new Object[]{"B", new Object[]{"D", 5}},
            new Object[]{"C", new Object[]{"B", 1}, new Object[]{"E", 10}},
            new Object[]{"D", new Object[]{"F", 2}},
            new Object[]{"E", new Object[]{"F", 3}},
            new Object[]{"F"}
        );
        Map<String, Double> h = heuristic(
            new Object[]{"A", 20.0}, new Object[]{"B", 10.0}, new Object[]{"C", 12.0},
            new Object[]{"D", 5.0}, new Object[]{"E", 8.0}, new Object[]{"F", 0.0}
        );
        List<String> result = AStar.aStarSearch(adjacencyList, "A", "F", h);
        assert result != null;
        assert result.get(0).equals("A");
        assert result.get(result.size() - 1).equals("F");
    }

    static void testCorrectlyPrefersHeuristicGuidedPath() {
        Map<String, List<Object[]>> adjacencyList = adj(
            new Object[]{"A", new Object[]{"B", 1}, new Object[]{"C", 3}},
            new Object[]{"B", new Object[]{"D", 10}},
            new Object[]{"C", new Object[]{"D", 1}},
            new Object[]{"D"}
        );
        Map<String, Double> h = heuristic(
            new Object[]{"A", 4.0}, new Object[]{"B", 10.0}, new Object[]{"C", 1.0}, new Object[]{"D", 0.0}
        );
        List<String> result = AStar.aStarSearch(adjacencyList, "A", "D", h);
        assert result != null && result.equals(Arrays.asList("A", "C", "D"));
    }
}
