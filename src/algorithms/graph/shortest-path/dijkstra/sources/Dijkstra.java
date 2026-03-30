import java.util.*;

// Dijkstra's algorithm — finds shortest paths from a source using a min-priority queue
public class Dijkstra {
    public static Map<String, Double> dijkstraShortestPath(
        Map<String, List<Object[]>> adjacencyList,
        String startNodeId
    ) {
        Map<String, Double> distances = new HashMap<>(); // @step:initialize
        Set<String> visited = new HashSet<>(); // @step:initialize

        // Initialize all distances to infinity
        for (String nodeId : adjacencyList.keySet()) {
            distances.put(nodeId, Double.MAX_VALUE); // @step:initialize
        }
        distances.put(startNodeId, 0.0); // @step:initialize

        // Min-priority queue: [distance, nodeId]
        PriorityQueue<Object[]> priorityQueue = new PriorityQueue<>(
            Comparator.comparingDouble(pair -> (Double) pair[0])
        ); // @step:initialize
        priorityQueue.add(new Object[]{0.0, startNodeId}); // @step:initialize

        while (!priorityQueue.isEmpty()) {
            Object[] top = priorityQueue.poll(); // @step:dequeue
            double currentDist = (Double) top[0]; // @step:dequeue
            String currentNodeId = (String) top[1]; // @step:dequeue

            if (visited.contains(currentNodeId)) continue; // @step:dequeue
            visited.add(currentNodeId); // @step:visit

            List<Object[]> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList());
            for (Object[] neighbor : neighbors) {
                String neighborId = (String) neighbor[0];
                double edgeWeight = (Double) neighbor[1];
                double tentativeDistance = currentDist + edgeWeight; // @step:relax-edge
                if (tentativeDistance < distances.getOrDefault(neighborId, Double.MAX_VALUE)) {
                    distances.put(neighborId, tentativeDistance); // @step:update-distance
                    priorityQueue.add(new Object[]{tentativeDistance, neighborId}); // @step:update-distance
                }
            }
        }

        return distances; // @step:complete
    }
}
