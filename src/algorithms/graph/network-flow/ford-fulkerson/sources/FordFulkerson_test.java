import java.util.*;

// Compile: javac FordFulkerson.java FordFulkerson_test.java
// Run:     java -ea FordFulkerson_test
public class FordFulkerson_test {
    public static void main(String[] args) {
        testComputesMaxFlowForSimpleLinearPath();
        testComputesMaxFlowLimitedByBottleneckEdge();
        testComputesMaxFlowAcrossTwoParallelPaths();
        testComputesMaxFlowForDefault6NodeNetwork();
        testReturnsZeroWhenNoPathFromSourceToSink();
        testHandlesGraphWhereSourceEqualsSink();
        testRespectsCapacityLimits();
        System.out.println("All tests passed!");
    }

    static Map<String, List<Map<String, Object>>> makeGraph(Object[]... entries) {
        Map<String, List<Map<String, Object>>> graph = new LinkedHashMap<>();
        for (Object[] entry : entries) {
            String node = (String) entry[0];
            List<Map<String, Object>> edges = new ArrayList<>();
            for (int edgeIdx = 1; edgeIdx < entry.length; edgeIdx++) {
                Object[] pair = (Object[]) entry[edgeIdx];
                Map<String, Object> edge = new LinkedHashMap<>();
                edge.put("target", pair[0]);
                edge.put("capacity", pair[1]);
                edges.add(edge);
            }
            graph.put(node, edges);
        }
        return graph;
    }

    static void testComputesMaxFlowForSimpleLinearPath() {
        Map<String, List<Map<String, Object>>> graph = makeGraph(
            new Object[]{"S", new Object[]{"T", 5}},
            new Object[]{"T"}
        );
        assert new FordFulkerson().fordFulkerson(graph, "S", "T") == 5;
    }

    static void testComputesMaxFlowLimitedByBottleneckEdge() {
        Map<String, List<Map<String, Object>>> graph = makeGraph(
            new Object[]{"S", new Object[]{"A", 10}},
            new Object[]{"A", new Object[]{"T", 3}},
            new Object[]{"T"}
        );
        assert new FordFulkerson().fordFulkerson(graph, "S", "T") == 3;
    }

    static void testComputesMaxFlowAcrossTwoParallelPaths() {
        Map<String, List<Map<String, Object>>> graph = makeGraph(
            new Object[]{"S", new Object[]{"A", 5}, new Object[]{"B", 5}},
            new Object[]{"A", new Object[]{"T", 5}},
            new Object[]{"B", new Object[]{"T", 5}},
            new Object[]{"T"}
        );
        assert new FordFulkerson().fordFulkerson(graph, "S", "T") == 10;
    }

    static void testComputesMaxFlowForDefault6NodeNetwork() {
        Map<String, List<Map<String, Object>>> graph = makeGraph(
            new Object[]{"S", new Object[]{"A", 10}, new Object[]{"B", 8}},
            new Object[]{"A", new Object[]{"B", 5}, new Object[]{"C", 7}},
            new Object[]{"B", new Object[]{"D", 10}},
            new Object[]{"C", new Object[]{"D", 3}, new Object[]{"T", 8}},
            new Object[]{"D", new Object[]{"T", 10}},
            new Object[]{"T"}
        );
        assert new FordFulkerson().fordFulkerson(graph, "S", "T") == 17;
    }

    static void testReturnsZeroWhenNoPathFromSourceToSink() {
        Map<String, List<Map<String, Object>>> graph = makeGraph(
            new Object[]{"S", new Object[]{"A", 10}},
            new Object[]{"A"},
            new Object[]{"T"}
        );
        assert new FordFulkerson().fordFulkerson(graph, "S", "T") == 0;
    }

    static void testHandlesGraphWhereSourceEqualsSink() {
        Map<String, List<Map<String, Object>>> graph = makeGraph(new Object[]{"S"});
        assert new FordFulkerson().fordFulkerson(graph, "S", "S") == 0;
    }

    static void testRespectsCapacityLimits() {
        Map<String, List<Map<String, Object>>> graph = makeGraph(
            new Object[]{"S", new Object[]{"A", 4}, new Object[]{"B", 2}},
            new Object[]{"A", new Object[]{"B", 4}, new Object[]{"T", 2}},
            new Object[]{"B", new Object[]{"T", 4}},
            new Object[]{"T"}
        );
        assert new FordFulkerson().fordFulkerson(graph, "S", "T") == 6;
    }
}
