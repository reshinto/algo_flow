import java.util.*;

// Borůvka's Algorithm — each component finds its cheapest outgoing edge each round
public class Boruvkas {
    record WeightedEdge(String source, String target, int weight) {}

    public static List<WeightedEdge> boruvkasAlgorithm(List<WeightedEdge> edges, List<String> nodeIds) {
        List<WeightedEdge> mstEdges = new ArrayList<>(); // @step:initialize
        Map<String, String> parent = new HashMap<>(); // @step:initialize
        Map<String, Integer> rank = new HashMap<>(); // @step:initialize

        for (String nodeId : nodeIds) { // @step:initialize
            parent.put(nodeId, nodeId); // @step:initialize
            rank.put(nodeId, 0); // @step:initialize
        }

        int componentCount = nodeIds.size(); // @step:initialize

        while (componentCount > 1) {
            Map<String, WeightedEdge> cheapestEdge = new HashMap<>(); // @step:visit-edge

            for (WeightedEdge edge : edges) {
                String sourceRoot = find(parent, edge.source()); // @step:visit-edge
                String targetRoot = find(parent, edge.target()); // @step:visit-edge

                if (sourceRoot.equals(targetRoot)) continue; // @step:visit-edge

                WeightedEdge existingForSource = cheapestEdge.get(sourceRoot); // @step:visit-edge
                if (existingForSource == null || edge.weight() < existingForSource.weight()) { // @step:visit-edge
                    cheapestEdge.put(sourceRoot, edge); // @step:visit-edge
                }
                WeightedEdge existingForTarget = cheapestEdge.get(targetRoot); // @step:visit-edge
                if (existingForTarget == null || edge.weight() < existingForTarget.weight()) { // @step:visit-edge
                    cheapestEdge.put(targetRoot, edge); // @step:visit-edge
                }
            }

            for (WeightedEdge cheapest : cheapestEdge.values()) {
                String sourceRoot = find(parent, cheapest.source()); // @step:add-to-mst
                String targetRoot = find(parent, cheapest.target()); // @step:add-to-mst
                if (sourceRoot.equals(targetRoot)) continue; // @step:add-to-mst
                union(parent, rank, cheapest.source(), cheapest.target()); // @step:merge-components
                mstEdges.add(cheapest); // @step:add-to-mst
                componentCount--; // @step:merge-components
            }
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
