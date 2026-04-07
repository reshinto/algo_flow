import java.util.*;

// Compile: javac BidirectionalBfs.java BidirectionalBfs_test.java
// Run:     java -ea BidirectionalBfs_test
public class BidirectionalBfs_test {
    public static void main(String[] args) {
        testFindsShortestPathInSimpleLinearGraph();
        testFindsPathInBranchingGraph();
        testReturnsNullWhenNoPathExists();
        testReturnsSingleElementPathWhenStartEqualsTarget();
        testFindsShortestPathNotLongerOne();
        testHandlesAdjacentStartAndTargetNodes();
        testTreatsGraphAsUndirectedForBackwardFrontier();
        testReturnsNullForIsolatedStartNode();
        System.out.println("All tests passed!");
    }

    static Map<String, List<String>> adj(Object[]... entries) {
        Map<String, List<String>> map = new LinkedHashMap<>();
        for (Object[] entry : entries) {
            String node = (String) entry[0];
            List<String> neighbors = new ArrayList<>();
            for (int edgeIdx = 1; edgeIdx < entry.length; edgeIdx++) {
                neighbors.add((String) entry[edgeIdx]);
            }
            map.put(node, neighbors);
        }
        return map;
    }

    static void testFindsShortestPathInSimpleLinearGraph() {
        Map<String, List<String>> adjacencyList = adj(
            new Object[]{"A","B"}, new Object[]{"B","C"}, new Object[]{"C","D"}, new Object[]{"D"}
        );
        List<String> result = BidirectionalBFS.bidirectionalBFS(adjacencyList, "A", "D");
        assert result != null && result.equals(Arrays.asList("A","B","C","D"));
    }

    static void testFindsPathInBranchingGraph() {
        Map<String, List<String>> adjacencyList = adj(
            new Object[]{"A","B","C"}, new Object[]{"B","D"}, new Object[]{"C","E"},
            new Object[]{"D","F"}, new Object[]{"E","F"}, new Object[]{"F"}
        );
        List<String> result = BidirectionalBFS.bidirectionalBFS(adjacencyList, "A", "F");
        assert result != null && result.get(0).equals("A") && result.get(result.size()-1).equals("F");
    }

    static void testReturnsNullWhenNoPathExists() {
        Map<String, List<String>> adjacencyList = adj(
            new Object[]{"A","B"}, new Object[]{"B"}, new Object[]{"C","D"}, new Object[]{"D"}
        );
        assert BidirectionalBFS.bidirectionalBFS(adjacencyList, "A", "C") == null;
    }

    static void testReturnsSingleElementPathWhenStartEqualsTarget() {
        Map<String, List<String>> adjacencyList = adj(new Object[]{"A","B"}, new Object[]{"B"});
        List<String> result = BidirectionalBFS.bidirectionalBFS(adjacencyList, "A", "A");
        assert result != null && result.equals(Arrays.asList("A"));
    }

    static void testFindsShortestPathNotLongerOne() {
        Map<String, List<String>> adjacencyList = adj(
            new Object[]{"A","B"}, new Object[]{"B","C","E"}, new Object[]{"C","D"}, new Object[]{"D","E"}, new Object[]{"E"}
        );
        List<String> result = BidirectionalBFS.bidirectionalBFS(adjacencyList, "A", "E");
        assert result != null && result.size() == 3 && result.get(0).equals("A") && result.get(result.size()-1).equals("E");
    }

    static void testHandlesAdjacentStartAndTargetNodes() {
        Map<String, List<String>> adjacencyList = adj(new Object[]{"A","B"}, new Object[]{"B"});
        assert BidirectionalBFS.bidirectionalBFS(adjacencyList, "A", "B").equals(Arrays.asList("A","B"));
    }

    static void testTreatsGraphAsUndirectedForBackwardFrontier() {
        Map<String, List<String>> adjacencyList = adj(new Object[]{"A","B"}, new Object[]{"B"});
        List<String> result = BidirectionalBFS.bidirectionalBFS(adjacencyList, "B", "A");
        assert result != null && result.size() == 2;
    }

    static void testReturnsNullForIsolatedStartNode() {
        Map<String, List<String>> adjacencyList = adj(new Object[]{"A"}, new Object[]{"B","C"}, new Object[]{"C"});
        assert BidirectionalBFS.bidirectionalBFS(adjacencyList, "A", "C") == null;
    }
}
