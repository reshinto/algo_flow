import java.util.*;

// A* search — finds shortest path using f = g + h (cost-so-far + heuristic estimate)
public class AStar {
    public static List<String> aStarSearch(
        Map<String, List<Object[]>> adjacencyList,
        String startNodeId,
        String targetNodeId,
        Map<String, Double> heuristic
    ) {
        Map<String, Double> gCosts = new HashMap<>(); // @step:initialize
        Map<String, String> predecessors = new HashMap<>(); // @step:initialize
        Set<String> visited = new HashSet<>(); // @step:initialize

        for (String nodeId : adjacencyList.keySet()) {
            gCosts.put(nodeId, Double.MAX_VALUE); // @step:initialize
        }
        gCosts.put(startNodeId, 0.0); // @step:initialize

        // Open set as priority queue sorted by f-cost
        PriorityQueue<Object[]> openQueue = new PriorityQueue<>(
            Comparator.comparingDouble(entry -> (Double) entry[0])
        ); // @step:initialize
        openQueue.add(new Object[]{heuristic.getOrDefault(startNodeId, 0.0), startNodeId}); // @step:initialize

        while (!openQueue.isEmpty()) {
            Object[] top = openQueue.poll(); // @step:dequeue
            String currentNodeId = (String) top[1]; // @step:dequeue

            if (visited.contains(currentNodeId)) continue; // @step:dequeue
            visited.add(currentNodeId); // @step:visit

            if (currentNodeId.equals(targetNodeId)) {
                // Reconstruct path
                LinkedList<String> path = new LinkedList<>();
                String traceId = currentNodeId;
                while (traceId != null) {
                    path.addFirst(traceId);
                    traceId = predecessors.get(traceId);
                }
                return path; // @step:complete
            }

            List<Object[]> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList());
            for (Object[] neighbor : neighbors) {
                String neighborId = (String) neighbor[0];
                double edgeWeight = ((Number) neighbor[1]).doubleValue();
                if (visited.contains(neighborId)) continue;
                double tentativeGCost = gCosts.getOrDefault(currentNodeId, Double.MAX_VALUE) + edgeWeight; // @step:relax-edge
                if (tentativeGCost < gCosts.getOrDefault(neighborId, Double.MAX_VALUE)) {
                    gCosts.put(neighborId, tentativeGCost); // @step:update-distance
                    predecessors.put(neighborId, currentNodeId); // @step:update-distance
                    double fCost = tentativeGCost + heuristic.getOrDefault(neighborId, 0.0);
                    openQueue.add(new Object[]{fCost, neighborId}); // @step:update-distance
                }
            }
        }

        return null; // @step:complete
    }
}
