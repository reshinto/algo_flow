import java.util.*;

// DAG Shortest Path — finds shortest paths from a source in a directed acyclic graph
// using topological sort followed by edge relaxation in topological order
public class DagShortestPath {
    public static Map<String, Double> dagShortestPath(
        Map<String, List<Object[]>> adjacencyList,
        String startNodeId,
        List<String> nodeIds
    ) {
        Map<String, Double> distances = new HashMap<>(); // @step:initialize
        for (String nodeId : nodeIds) {
            distances.put(nodeId, Double.MAX_VALUE); // @step:initialize
        }
        distances.put(startNodeId, 0.0); // @step:initialize

        // Topological sort via DFS
        Set<String> visited = new HashSet<>(); // @step:initialize
        LinkedList<String> topologicalOrder = new LinkedList<>(); // @step:initialize

        for (String nodeId : nodeIds) {
            if (!visited.contains(nodeId)) {
                dfsVisit(nodeId, adjacencyList, visited, topologicalOrder);
            }
        }

        // Relax edges in topological order
        for (String nodeId : topologicalOrder) {
            if (distances.getOrDefault(nodeId, Double.MAX_VALUE) == Double.MAX_VALUE) {
                continue; // @step:process-node
            }
            List<Object[]> neighbors = adjacencyList.getOrDefault(nodeId, Collections.emptyList());
            for (Object[] neighbor : neighbors) {
                String neighborId = (String) neighbor[0];
                double edgeWeight = (Double) neighbor[1];
                double tentativeDistance = distances.getOrDefault(nodeId, Double.MAX_VALUE) + edgeWeight; // @step:relax-edge
                if (tentativeDistance < distances.getOrDefault(neighborId, Double.MAX_VALUE)) {
                    distances.put(neighborId, tentativeDistance); // @step:update-distance
                }
            }
        }

        return distances; // @step:complete
    }

    private static void dfsVisit(
        String nodeId,
        Map<String, List<Object[]>> adjacencyList,
        Set<String> visited,
        LinkedList<String> topologicalOrder
    ) {
        visited.add(nodeId);
        List<Object[]> neighbors = adjacencyList.getOrDefault(nodeId, Collections.emptyList());
        for (Object[] neighbor : neighbors) {
            String neighborId = (String) neighbor[0];
            if (!visited.contains(neighborId)) {
                dfsVisit(neighborId, adjacencyList, visited, topologicalOrder);
            }
        }
        topologicalOrder.addFirst(nodeId); // @step:add-to-order
    }
}
