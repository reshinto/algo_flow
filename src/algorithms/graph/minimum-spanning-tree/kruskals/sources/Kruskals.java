import java.util.*;

// Kruskal's Algorithm — build MST by sorting edges and merging components with Union-Find
public class Kruskals {
    record WeightedEdge(String source, String target, int weight) {}

    public static List<WeightedEdge> kruskalsAlgorithm(List<WeightedEdge> edges, List<String> nodeIds) {
        List<WeightedEdge> mstEdges = new ArrayList<>(); // @step:initialize
        Map<String, String> parent = new HashMap<>(); // @step:initialize
        Map<String, Integer> rank = new HashMap<>(); // @step:initialize

        for (String nodeId : nodeIds) { // @step:initialize
            parent.put(nodeId, nodeId); // @step:initialize
            rank.put(nodeId, 0); // @step:initialize
        }

        List<WeightedEdge> sortedEdges = new ArrayList<>(edges); // @step:sort-edges
        sortedEdges.sort(Comparator.comparingInt(WeightedEdge::weight)); // @step:sort-edges

        for (WeightedEdge edge : sortedEdges) {
            String sourceRoot = find(parent, edge.source()); // @step:visit-edge
            String targetRoot = find(parent, edge.target()); // @step:visit-edge

            if (!sourceRoot.equals(targetRoot)) { // @step:visit-edge
                union(parent, rank, edge.source(), edge.target()); // @step:add-to-mst
                mstEdges.add(edge); // @step:add-to-mst
            } else {
                // Edge would create a cycle — reject it
                @SuppressWarnings("unused") WeightedEdge rejected = edge; // @step:reject-edge
            }

            if (mstEdges.size() == nodeIds.size() - 1) break; // @step:add-to-mst
        }

        return mstEdges; // @step:complete
    }

    private static String find(Map<String, String> parent, String nodeId) {
        if (!parent.get(nodeId).equals(nodeId)) {
            parent.put(nodeId, find(parent, parent.get(nodeId)));
        }
        return parent.get(nodeId);
    }

    private static void union(Map<String, String> parent, Map<String, Integer> rank, String nodeA, String nodeB) {
        String rootA = find(parent, nodeA);
        String rootB = find(parent, nodeB);
        if (rank.get(rootA) < rank.get(rootB)) {
            parent.put(rootA, rootB);
        } else if (rank.get(rootA) > rank.get(rootB)) {
            parent.put(rootB, rootA);
        } else {
            parent.put(rootB, rootA);
            rank.put(rootA, rank.get(rootA) + 1);
        }
    }
}
