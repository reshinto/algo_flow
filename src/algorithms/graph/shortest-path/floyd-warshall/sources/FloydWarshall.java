import java.util.*;

// Floyd-Warshall — computes all-pairs shortest paths via dynamic programming
public class FloydWarshall {
    public static Map<String, Map<String, Double>> floydWarshall(
        Map<String, List<Object[]>> adjacencyList,
        List<String> nodeIds
    ) {
        // Initialize distance matrix
        Map<String, Map<String, Double>> distances = new HashMap<>(); // @step:initialize

        for (String sourceId : nodeIds) {
            distances.put(sourceId, new HashMap<>());
            for (String targetId : nodeIds) {
                if (sourceId.equals(targetId)) {
                    distances.get(sourceId).put(targetId, 0.0); // @step:initialize
                } else {
                    distances.get(sourceId).put(targetId, Double.MAX_VALUE / 2); // @step:initialize
                }
            }
        }

        // Set direct edge weights
        for (String sourceId : nodeIds) {
            List<Object[]> neighbors = adjacencyList.getOrDefault(sourceId, Collections.emptyList());
            for (Object[] neighbor : neighbors) {
                String targetId = (String) neighbor[0];
                double edgeWeight = (Double) neighbor[1];
                distances.get(sourceId).put(targetId, edgeWeight); // @step:initialize
            }
        }

        // Triple nested loop: try every intermediate node
        for (String intermediateId : nodeIds) {
            for (String sourceId : nodeIds) {
                for (String targetId : nodeIds) {
                    double throughIntermediate =
                        distances.get(sourceId).getOrDefault(intermediateId, Double.MAX_VALUE / 2)
                        + distances.get(intermediateId).getOrDefault(targetId, Double.MAX_VALUE / 2); // @step:relax-edge
                    if (throughIntermediate < distances.get(sourceId).getOrDefault(targetId, Double.MAX_VALUE / 2)) {
                        distances.get(sourceId).put(targetId, throughIntermediate); // @step:update-distance
                    }
                }
            }
        }

        return distances; // @step:complete
    }
}
