import java.util.*;

// Compile: javac Prims.java Prims_test.java
// Run:     java -ea Prims_test
public class Prims_test {
    public static void main(String[] args) {
        testFindsCorrectMstForDefault6NodeWeightedGraph();
        testReturnsVMinus1EdgesForFullyConnectedGraph();
        testSelectsMinimumWeightEdgeAtEachStep();
        testDoesNotRevisitAlreadyIncludedNodes();
        testHandlesLinearChainGraphFromStartToEnd();
        testProducesCorrectMstStartingFromNonFirstNode();
        testHandlesTwoNodeGraph();
        System.out.println("All tests passed!");
    }

    static Map<String, List<Object[]>> makeAdj(Object[]... entries) {
        Map<String, List<Object[]>> adj = new LinkedHashMap<>();
        for (Object[] entry : entries) {
            String node = (String) entry[0];
            @SuppressWarnings("unchecked")
            List<Object[]> neighbors = (List<Object[]>) entry[1];
            adj.put(node, neighbors);
        }
        return adj;
    }

    static List<Object[]> neighbors(Object[]... pairs) {
        List<Object[]> list = new ArrayList<>();
        for (Object[] pair : pairs) list.add(pair);
        return list;
    }

    static int totalWeight(List<Prims.MSTEdge> edges) {
        return edges.stream().mapToInt(Prims.MSTEdge::weight).sum();
    }

    static void testFindsCorrectMstForDefault6NodeWeightedGraph() {
        Map<String, List<Object[]>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList(new Object[]{"B", 4}, new Object[]{"C", 2}));
        adj.put("B", Arrays.asList(new Object[]{"A", 4}, new Object[]{"C", 1}, new Object[]{"D", 5}));
        adj.put("C", Arrays.asList(new Object[]{"A", 2}, new Object[]{"B", 1}, new Object[]{"D", 8}, new Object[]{"E", 10}));
        adj.put("D", Arrays.asList(new Object[]{"B", 5}, new Object[]{"C", 8}, new Object[]{"E", 2}, new Object[]{"F", 6}));
        adj.put("E", Arrays.asList(new Object[]{"C", 10}, new Object[]{"D", 2}, new Object[]{"F", 3}));
        adj.put("F", Arrays.asList(new Object[]{"D", 6}, new Object[]{"E", 3}));
        List<Prims.MSTEdge> result = Prims.primsAlgorithm(adj, "A");
        assert result.size() == 5;
        assert totalWeight(result) == 13;
    }

    static void testReturnsVMinus1EdgesForFullyConnectedGraph() {
        Map<String, List<Object[]>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList(new Object[]{"B", 3}, new Object[]{"C", 1}));
        adj.put("B", Arrays.asList(new Object[]{"A", 3}, new Object[]{"C", 2}));
        adj.put("C", Arrays.asList(new Object[]{"A", 1}, new Object[]{"B", 2}));
        List<Prims.MSTEdge> result = Prims.primsAlgorithm(adj, "A");
        assert result.size() == 2;
    }

    static void testSelectsMinimumWeightEdgeAtEachStep() {
        Map<String, List<Object[]>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList(new Object[]{"B", 10}, new Object[]{"C", 1}));
        adj.put("B", Arrays.asList(new Object[]{"A", 10}, new Object[]{"C", 2}));
        adj.put("C", Arrays.asList(new Object[]{"A", 1}, new Object[]{"B", 2}));
        List<Prims.MSTEdge> result = Prims.primsAlgorithm(adj, "A");
        assert result.size() == 2;
        assert totalWeight(result) == 3;
    }

    static void testDoesNotRevisitAlreadyIncludedNodes() {
        Map<String, List<Object[]>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList(new Object[]{"B", 1}, new Object[]{"C", 2}));
        adj.put("B", Arrays.asList(new Object[]{"A", 1}, new Object[]{"C", 3}));
        adj.put("C", Arrays.asList(new Object[]{"A", 2}, new Object[]{"B", 3}));
        List<Prims.MSTEdge> result = Prims.primsAlgorithm(adj, "A");
        Set<String> targets = new HashSet<>();
        for (Prims.MSTEdge e : result) targets.add(e.target());
        assert targets.size() == result.size();
    }

    static void testHandlesLinearChainGraphFromStartToEnd() {
        Map<String, List<Object[]>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList(new Object[]{"B", 5}));
        adj.put("B", Arrays.asList(new Object[]{"A", 5}, new Object[]{"C", 3}));
        adj.put("C", Arrays.asList(new Object[]{"B", 3}, new Object[]{"D", 7}));
        adj.put("D", Arrays.asList(new Object[]{"C", 7}));
        List<Prims.MSTEdge> result = Prims.primsAlgorithm(adj, "A");
        assert result.size() == 3;
        assert totalWeight(result) == 15;
    }

    static void testProducesCorrectMstStartingFromNonFirstNode() {
        Map<String, List<Object[]>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList(new Object[]{"B", 1}, new Object[]{"C", 4}));
        adj.put("B", Arrays.asList(new Object[]{"A", 1}, new Object[]{"C", 2}));
        adj.put("C", Arrays.asList(new Object[]{"A", 4}, new Object[]{"B", 2}));
        List<Prims.MSTEdge> fromB = Prims.primsAlgorithm(adj, "B");
        List<Prims.MSTEdge> fromA = Prims.primsAlgorithm(adj, "A");
        assert totalWeight(fromB) == totalWeight(fromA);
    }

    static void testHandlesTwoNodeGraph() {
        Map<String, List<Object[]>> adj = new LinkedHashMap<>();
        adj.put("A", Arrays.asList(new Object[]{"B", 9}));
        adj.put("B", Arrays.asList(new Object[]{"A", 9}));
        List<Prims.MSTEdge> result = Prims.primsAlgorithm(adj, "A");
        assert result.size() == 1;
        assert result.get(0).weight() == 9;
    }
}
