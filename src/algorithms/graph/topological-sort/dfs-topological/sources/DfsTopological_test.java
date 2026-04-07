import java.util.*;

// Compile: javac DfsTopological.java DfsTopological_test.java
// Run:     java -ea DfsTopological_test
public class DfsTopological_test {
    public static void main(String[] args) {
        testProducesValidTopologicalOrderForDefaultDag();
        testPlacesSourceNodeFirstInLinearChain();
        testHandlesSingleNodeWithNoEdges();
        testHandlesDiamondShapedDag();
        testReturnsAllNodesForFullyIndependentNodeSet();
        testHandlesGraphWhereMultipleRootNodesExist();
        testDoesNotRevisitAlreadyVisitedNodes();
        System.out.println("All tests passed!");
    }

    static boolean isValidTopologicalOrder(List<String> order, Map<String, List<String>> adj) {
        Map<String, Integer> position = new HashMap<>();
        for (int orderIdx = 0; orderIdx < order.size(); orderIdx++) position.put(order.get(orderIdx), orderIdx);
        for (Map.Entry<String, List<String>> entry : adj.entrySet()) {
            int sourcePos = position.getOrDefault(entry.getKey(), -1);
            for (String target : entry.getValue()) {
                int targetPos = position.getOrDefault(target, -1);
                if (sourcePos < 0 || targetPos < 0 || sourcePos >= targetPos) return false;
            }
        }
        return true;
    }

    static void testProducesValidTopologicalOrderForDefaultDag() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B","C")); adj.put("B", Arrays.asList("D"));
        adj.put("C", Arrays.asList("D","E")); adj.put("D", Arrays.asList("F"));
        adj.put("E", Arrays.asList("F")); adj.put("F", Collections.emptyList());
        List<String> result = DfsTopological.dfsTopologicalSort(adj, Arrays.asList("A","B","C","D","E","F"));
        assert result.size() == 6;
        assert isValidTopologicalOrder(result, adj);
    }

    static void testPlacesSourceNodeFirstInLinearChain() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B")); adj.put("B", Arrays.asList("C"));
        adj.put("C", Arrays.asList("D")); adj.put("D", Collections.emptyList());
        List<String> result = DfsTopological.dfsTopologicalSort(adj, Arrays.asList("A","B","C","D"));
        assert result.equals(Arrays.asList("A","B","C","D"));
    }

    static void testHandlesSingleNodeWithNoEdges() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Collections.emptyList());
        List<String> result = DfsTopological.dfsTopologicalSort(adj, Arrays.asList("A"));
        assert result.equals(Arrays.asList("A"));
    }

    static void testHandlesDiamondShapedDag() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("B","C")); adj.put("B", Arrays.asList("D"));
        adj.put("C", Arrays.asList("D")); adj.put("D", Collections.emptyList());
        List<String> result = DfsTopological.dfsTopologicalSort(adj, Arrays.asList("A","B","C","D"));
        assert result.size() == 4;
        assert isValidTopologicalOrder(result, adj);
        assert result.get(0).equals("A");
        assert result.get(result.size()-1).equals("D");
    }

    static void testReturnsAllNodesForFullyIndependentNodeSet() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Collections.emptyList()); adj.put("B", Collections.emptyList());
        adj.put("C", Collections.emptyList()); adj.put("D", Collections.emptyList());
        List<String> result = DfsTopological.dfsTopologicalSort(adj, Arrays.asList("A","B","C","D"));
        assert result.size() == 4;
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("A","B","C","D")));
    }

    static void testHandlesGraphWhereMultipleRootNodesExist() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("C")); adj.put("B", Arrays.asList("C")); adj.put("C", Collections.emptyList());
        List<String> result = DfsTopological.dfsTopologicalSort(adj, Arrays.asList("A","B","C"));
        assert result.size() == 3;
        assert isValidTopologicalOrder(result, adj);
        assert result.indexOf("C") > result.indexOf("A");
        assert result.indexOf("C") > result.indexOf("B");
    }

    static void testDoesNotRevisitAlreadyVisitedNodes() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList("C")); adj.put("B", Arrays.asList("C"));
        adj.put("C", Arrays.asList("D")); adj.put("D", Collections.emptyList());
        List<String> result = DfsTopological.dfsTopologicalSort(adj, Arrays.asList("A","B","C","D"));
        assert result.size() == 4;
        assert Collections.frequency(result, "C") == 1;
        assert Collections.frequency(result, "D") == 1;
        assert isValidTopologicalOrder(result, adj);
    }
}
