import java.util.*;

// Compile: javac Dfs.java Dfs_test.java
// Run:     java -ea Dfs_test
public class Dfs_test {
    public static void main(String[] args) {
        testTraversesLinearGraphInOrder();
        testHandlesDisconnectedGraphVisitingOnlyReachableNodes();
        testHandlesSingleNodeGraph();
        testDoesNotVisitSameNodeTwiceInCyclicGraph();
        testHandlesFullyConnectedGraphWithoutRevisitingNodes();
        testHandlesNodeWithNoNeighborsInAdjacencyList();
        testTraversesDiamondShapedGraphVisitingEachNodeExactlyOnce();
        System.out.println("All tests passed!");
    }

    static void testTraversesLinearGraphInOrder() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("C"));
        adj.put("C", Arrays.asList("D")); adj.put("D", Collections.emptyList());
        assert DFS.depthFirstSearch(adj, "A").equals(Arrays.asList("A","B","C","D"));
    }

    static void testHandlesDisconnectedGraphVisitingOnlyReachableNodes() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Collections.emptyList());
        adj.put("C", Arrays.asList("D")); adj.put("D", Collections.emptyList());
        List<String> result = DFS.depthFirstSearch(adj, "A");
        assert result.equals(Arrays.asList("A","B"));
        assert !result.contains("C");
    }

    static void testHandlesSingleNodeGraph() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Collections.emptyList());
        assert DFS.depthFirstSearch(adj, "A").equals(Arrays.asList("A"));
    }

    static void testDoesNotVisitSameNodeTwiceInCyclicGraph() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("C")); adj.put("C", Arrays.asList("A"));
        List<String> result = DFS.depthFirstSearch(adj, "A");
        assert result.size() == 3;
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("A","B","C")));
    }

    static void testHandlesFullyConnectedGraphWithoutRevisitingNodes() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B","C","D")); adj.put("B", Arrays.asList("A","C","D"));
        adj.put("C", Arrays.asList("A","B","D")); adj.put("D", Arrays.asList("A","B","C"));
        List<String> result = DFS.depthFirstSearch(adj, "A");
        assert result.size() == 4;
        assert result.get(0).equals("A");
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("A","B","C","D")));
    }

    static void testHandlesNodeWithNoNeighborsInAdjacencyList() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B"));
        List<String> result = DFS.depthFirstSearch(adj, "A");
        assert result.equals(Arrays.asList("A","B"));
    }

    static void testTraversesDiamondShapedGraphVisitingEachNodeExactlyOnce() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B","C")); adj.put("B", Arrays.asList("D"));
        adj.put("C", Arrays.asList("D")); adj.put("D", Collections.emptyList());
        List<String> result = DFS.depthFirstSearch(adj, "A");
        assert result.size() == 4;
        assert result.get(0).equals("A");
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("A","B","C","D")));
    }
}
