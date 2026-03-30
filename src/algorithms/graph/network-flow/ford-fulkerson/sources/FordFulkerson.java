import java.util.*;

// Ford-Fulkerson — max flow via DFS augmenting paths in a residual graph
public class FordFulkerson {
    private Map<String, Map<String, Integer>> residualCapacity;
    private String sinkNodeId;

    public int fordFulkerson(
        Map<String, List<Map<String, Object>>> adjacencyList,
        String sourceNodeId,
        String sinkNodeId
    ) {
        this.sinkNodeId = sinkNodeId;
        if (sourceNodeId.equals(sinkNodeId)) return 0; // @step:initialize

        residualCapacity = new HashMap<>(); // @step:initialize
        for (String nodeId : adjacencyList.keySet()) { // @step:initialize
            residualCapacity.put(nodeId, new HashMap<>()); // @step:initialize
        }
        for (Map.Entry<String, List<Map<String, Object>>> entry : adjacencyList.entrySet()) {
            String nodeId = entry.getKey(); // @step:initialize
            for (Map<String, Object> edge : entry.getValue()) { // @step:initialize
                String target = (String) edge.get("target"); // @step:initialize
                int capacity = (int) edge.get("capacity"); // @step:initialize
                residualCapacity.putIfAbsent(target, new HashMap<>()); // @step:initialize
                int prev = residualCapacity.get(nodeId).getOrDefault(target, 0); // @step:initialize
                residualCapacity.get(nodeId).put(target, prev + capacity); // @step:initialize
            }
        }

        int maxFlow = 0; // @step:initialize

        while (true) { // @step:augment-flow
            Set<String> visitedSet = new HashSet<>(); // @step:augment-flow
            int pathFlow = dfsAugment(sourceNodeId, visitedSet, Integer.MAX_VALUE); // @step:augment-flow
            if (pathFlow == 0) break; // @step:augment-flow
            maxFlow += pathFlow; // @step:augment-flow
        }

        return maxFlow; // @step:complete
    }

    private int dfsAugment(String currentId, Set<String> visitedSet, int bottleneck) {
        if (currentId.equals(sinkNodeId)) return bottleneck; // @step:dfs-augment
        visitedSet.add(currentId); // @step:dfs-augment
        Map<String, Integer> neighbors = residualCapacity.getOrDefault(currentId, new HashMap<>()); // @step:visit-edge
        for (Map.Entry<String, Integer> entry : neighbors.entrySet()) { // @step:visit-edge
            String neighborId = entry.getKey(); // @step:visit-edge
            int residual = entry.getValue(); // @step:visit-edge
            if (!visitedSet.contains(neighborId) && residual > 0) {
                int flow = dfsAugment(neighborId, visitedSet, Math.min(bottleneck, residual)); // @step:augment-flow
                if (flow > 0) { // @step:augment-flow
                    residualCapacity.get(currentId).put(neighborId, residual - flow); // @step:augment-flow
                    residualCapacity.putIfAbsent(neighborId, new HashMap<>()); // @step:augment-flow
                    int back = residualCapacity.get(neighborId).getOrDefault(currentId, 0); // @step:augment-flow
                    residualCapacity.get(neighborId).put(currentId, back + flow); // @step:augment-flow
                    return flow; // @step:augment-flow
                }
            }
        }
        return 0; // @step:dfs-augment
    }
}
