import java.util.*;

// Bellman-Ford — finds shortest paths tolerating negative edge weights; detects negative cycles
public class BellmanFord {
    public static Map<String, Double> bellmanFord(
        Map<String, List<Object[]>> adjacencyList,
        String startNodeId,
        List<String> nodeIds
    ) {
        Map<String, Double> distances = new HashMap<>(); // @step:initialize

        for (String nodeId : nodeIds) {
            distances.put(nodeId, Double.MAX_VALUE); // @step:initialize
        }
        distances.put(startNodeId, 0.0); // @step:initialize

        int vertexCount = nodeIds.size();

        // Relax all edges (V - 1) times
        for (int passIndex = 0; passIndex < vertexCount - 1; passIndex++) {
            for (String sourceId : nodeIds) {
                List<Object[]> neighbors = adjacencyList.getOrDefault(sourceId, Collections.emptyList());
                for (Object[] neighbor : neighbors) {
                    String targetId = (String) neighbor[0];
                    double edgeWeight = ((Number) neighbor[1]).doubleValue();
                    double sourceDist = distances.getOrDefault(sourceId, Double.MAX_VALUE);
                    if (sourceDist == Double.MAX_VALUE) continue; // @step:visit-edge
                    double tentativeDistance = sourceDist + edgeWeight; // @step:relax-edge
                    if (tentativeDistance < distances.getOrDefault(targetId, Double.MAX_VALUE)) {
                        distances.put(targetId, tentativeDistance); // @step:update-distance
                    }
                }
            }
        }

        // Detect negative cycles — one more pass
        for (String sourceId : nodeIds) {
            List<Object[]> neighbors = adjacencyList.getOrDefault(sourceId, Collections.emptyList());
            for (Object[] neighbor : neighbors) {
                String targetId = (String) neighbor[0];
                double edgeWeight = ((Number) neighbor[1]).doubleValue();
                double sourceDist = distances.getOrDefault(sourceId, Double.MAX_VALUE);
                if (sourceDist == Double.MAX_VALUE) continue;
                if (sourceDist + edgeWeight < distances.getOrDefault(targetId, Double.MAX_VALUE)) {
                    distances.put(targetId, Double.NEGATIVE_INFINITY); // @step:update-distance
                }
            }
        }

        return distances; // @step:complete
    }
}
