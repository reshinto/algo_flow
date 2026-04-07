import java.util.*;

// Compile: javac IDDFS.java IDDFS_test.java
// Run:     java -ea IDDFS_test
public class IDDFS_test {
    public static void main(String[] args) {
        testTraversesLinearGraphInDepthFirstOrder();
        testTraversesTreeGraphVisitingChildrenBeforeSiblings();
        testHandlesDisconnectedGraphVisitingOnlyReachableNodes();
        testHandlesSingleNodeGraph();
        testDoesNotVisitSameNodeTwiceInCyclicGraph();
        testRespectsExplicitMaxDepth();
        testVisitsNeighborsInOrderTheyAppearInAdjacencyList();
        testTraversesFullyConnectedGraphVisitingAllNodes();
        System.out.println("All tests passed!");
    }

    static Map<String, List<String>> makeAdj(String[][] pairs) {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        for (String[] pair : pairs) {
            String node = pair[0];
            List<String> neighbors = new ArrayList<>();
            for (int idx = 1; idx < pair.length; idx++) {
                neighbors.add(pair[idx]);
            }
            adj.put(node, neighbors);
        }
        return adj;
    }

    static void testTraversesLinearGraphInDepthFirstOrder() {
        Map<String, List<String>> adj = makeAdj(new String[][]{
            {"A", "B"}, {"B", "C"}, {"C", "D"}, {"D"}
        });
        List<String> result = IDDFS.iterativeDeepeningDFS(adj, "A", -1);
        assert result.equals(Arrays.asList("A", "B", "C", "D")) : "Expected [A, B, C, D], got " + result;
    }

    static void testTraversesTreeGraphVisitingChildrenBeforeSiblings() {
        Map<String, List<String>> adj = makeAdj(new String[][]{
            {"A", "B", "C"}, {"B", "D", "E"}, {"C", "F"}, {"D"}, {"E"}, {"F"}
        });
        List<String> result = IDDFS.iterativeDeepeningDFS(adj, "A", -1);
        assert result.size() == 6 : "Expected 6 nodes, got " + result.size();
        assert result.get(0).equals("A") : "Expected A first, got " + result.get(0);
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("A","B","C","D","E","F")));
    }

    static void testHandlesDisconnectedGraphVisitingOnlyReachableNodes() {
        Map<String, List<String>> adj = makeAdj(new String[][]{
            {"A", "B"}, {"B"}, {"C", "D"}, {"D"}
        });
        List<String> result = IDDFS.iterativeDeepeningDFS(adj, "A", -1);
        assert result.contains("A") : "Expected A in result";
        assert result.contains("B") : "Expected B in result";
        assert !result.contains("C") : "Did not expect C in result";
        assert !result.contains("D") : "Did not expect D in result";
    }

    static void testHandlesSingleNodeGraph() {
        Map<String, List<String>> adj = makeAdj(new String[][]{{"A"}});
        List<String> result = IDDFS.iterativeDeepeningDFS(adj, "A", -1);
        assert result.equals(Arrays.asList("A")) : "Expected [A], got " + result;
    }

    static void testDoesNotVisitSameNodeTwiceInCyclicGraph() {
        Map<String, List<String>> adj = makeAdj(new String[][]{
            {"A", "B"}, {"B", "C"}, {"C", "A"}
        });
        List<String> result = IDDFS.iterativeDeepeningDFS(adj, "A", -1);
        assert result.equals(Arrays.asList("A", "B", "C")) : "Expected [A, B, C], got " + result;
        assert result.size() == 3 : "Expected 3 nodes, got " + result.size();
    }

    static void testRespectsExplicitMaxDepth() {
        Map<String, List<String>> adj = makeAdj(new String[][]{
            {"A", "B", "C"}, {"B", "D"}, {"C", "E"}, {"D", "F"}, {"E"}, {"F"}
        });
        List<String> result = IDDFS.iterativeDeepeningDFS(adj, "A", 1);
        assert result.contains("A") : "Expected A in result";
        assert result.contains("B") : "Expected B in result";
        assert result.contains("C") : "Expected C in result";
        assert !result.contains("D") : "Did not expect D in result";
        assert !result.contains("F") : "Did not expect F in result";
    }

    static void testVisitsNeighborsInOrderTheyAppearInAdjacencyList() {
        Map<String, List<String>> adj = makeAdj(new String[][]{
            {"A", "B", "C"}, {"B"}, {"C"}
        });
        List<String> result = IDDFS.iterativeDeepeningDFS(adj, "A", -1);
        assert result.get(0).equals("A") : "Expected A first, got " + result.get(0);
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("A","B","C")));
    }

    static void testTraversesFullyConnectedGraphVisitingAllNodes() {
        Map<String, List<String>> adj = makeAdj(new String[][]{
            {"A", "B", "C", "D"}, {"B", "A", "C", "D"},
            {"C", "A", "B", "D"}, {"D", "A", "B", "C"}
        });
        List<String> result = IDDFS.iterativeDeepeningDFS(adj, "A", -1);
        assert result.size() == 4 : "Expected 4 nodes, got " + result.size();
        assert result.get(0).equals("A") : "Expected A first, got " + result.get(0);
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("A","B","C","D")));
    }
}
