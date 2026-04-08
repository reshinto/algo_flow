import java.util.*;

// Compile: javac Bfs.java Bfs_test.java
// Run:     java -ea Bfs_test
public class Bfs_test {
    public static void main(String[] args) {
        testTraversesLinearGraphInOrder();
        testTraversesTreeGraphLevelByLevel();
        testHandlesDisconnectedGraphVisitingOnlyReachableNodes();
        testHandlesSingleNodeGraph();
        testDoesNotVisitSameNodeTwiceInCyclicGraph();
        testVisitsNeighborsInOrderTheyAppear();
        testHandlesNodeWithNoNeighborsInAdjacencyList();
        testTraversesFullyConnectedGraph();
        System.out.println("All tests passed!");
    }

    static Map<String, List<String>> adj(String... nodesAndNeighbors) {
        Map<String, List<String>> map = new LinkedHashMap<>();
        // Parse pairs: "A:B,C" format is not used; call directly with manual construction
        return map;
    }

    static void testTraversesLinearGraphInOrder() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("C"));
        adj.put("C", Arrays.asList("D")); adj.put("D", Collections.emptyList());
        assert BFS.breadthFirstSearch(adj, "A").equals(Arrays.asList("A","B","C","D"));
    }

    static void testTraversesTreeGraphLevelByLevel() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B","C")); adj.put("B", Arrays.asList("D","E"));
        adj.put("C", Arrays.asList("F")); adj.put("D", Collections.emptyList());
        adj.put("E", Collections.emptyList()); adj.put("F", Collections.emptyList());
        assert BFS.breadthFirstSearch(adj, "A").equals(Arrays.asList("A","B","C","D","E","F"));
    }

    static void testHandlesDisconnectedGraphVisitingOnlyReachableNodes() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Collections.emptyList());
        adj.put("C", Arrays.asList("D")); adj.put("D", Collections.emptyList());
        List<String> result = BFS.breadthFirstSearch(adj, "A");
        assert result.equals(Arrays.asList("A","B"));
        assert !result.contains("C");
        assert !result.contains("D");
    }

    static void testHandlesSingleNodeGraph() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Collections.emptyList());
        assert BFS.breadthFirstSearch(adj, "A").equals(Arrays.asList("A"));
    }

    static void testDoesNotVisitSameNodeTwiceInCyclicGraph() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("C")); adj.put("C", Arrays.asList("A"));
        assert BFS.breadthFirstSearch(adj, "A").equals(Arrays.asList("A","B","C"));
    }

    static void testVisitsNeighborsInOrderTheyAppear() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("C","B")); adj.put("B", Collections.emptyList()); adj.put("C", Collections.emptyList());
        assert BFS.breadthFirstSearch(adj, "A").equals(Arrays.asList("A","C","B"));
    }

    static void testHandlesNodeWithNoNeighborsInAdjacencyList() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B"));
        List<String> result = BFS.breadthFirstSearch(adj, "A");
        assert result.equals(Arrays.asList("A","B"));
    }

    static void testTraversesFullyConnectedGraph() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B","C","D")); adj.put("B", Arrays.asList("A","C","D"));
        adj.put("C", Arrays.asList("A","B","D")); adj.put("D", Arrays.asList("A","B","C"));
        List<String> result = BFS.breadthFirstSearch(adj, "A");
        assert result.size() == 4;
        assert result.get(0).equals("A");
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("A","B","C","D")));
    }
}
