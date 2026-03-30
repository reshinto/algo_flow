import java.util.*;

// Edmonds-Karp — max flow via BFS shortest augmenting paths (guaranteed O(VE^2))
public class EdmondsKarp {
    public int edmondsKarp(
        Map<String, List<Map<String, Object>>> adjacencyList,
        String sourceNodeId,
        String sinkNodeId
    ) {
        Map<String, Map<String, Integer>> residualCapacity = new HashMap<>(); // @step:initialize
        for (Map.Entry<String, List<Map<String, Object>>> entry : adjacencyList.entrySet()) {
            String nodeId = entry.getKey(); // @step:initialize
            residualCapacity.putIfAbsent(nodeId, new HashMap<>()); // @step:initialize
            for (Map<String, Object> edge : entry.getValue()) { // @step:initialize
                String target = (String) edge.get("target"); // @step:initialize
                int capacity = (int) edge.get("capacity"); // @step:initialize
                int prev = residualCapacity.get(nodeId).getOrDefault(target, 0); // @step:initialize
                residualCapacity.get(nodeId).put(target, prev + capacity); // @step:initialize
                residualCapacity.putIfAbsent(target, new HashMap<>()); // @step:initialize
            }
        }

        int maxFlow = 0; // @step:initialize

        Map<String, String> parentMap = bfsFindPath(residualCapacity, sourceNodeId, sinkNodeId); // @step:augment-flow
        while (parentMap != null) {
            int bottleneck = Integer.MAX_VALUE; // @step:augment-flow
            String currentId = sinkNodeId; // @step:augment-flow
            while (!currentId.equals(sourceNodeId)) { // @step:augment-flow
                String parentId = parentMap.get(currentId); // @step:augment-flow
                int residual = residualCapacity.get(parentId).getOrDefault(currentId, 0); // @step:augment-flow
                bottleneck = Math.min(bottleneck, residual); // @step:augment-flow
                currentId = parentId; // @step:augment-flow
            }

            currentId = sinkNodeId; // @step:augment-flow
            while (!currentId.equals(sourceNodeId)) { // @step:augment-flow
                String parentId = parentMap.get(currentId); // @step:augment-flow
                int fwd = residualCapacity.get(parentId).getOrDefault(currentId, 0); // @step:augment-flow
                residualCapacity.get(parentId).put(currentId, fwd - bottleneck); // @step:augment-flow
                residualCapacity.putIfAbsent(currentId, new HashMap<>()); // @step:augment-flow
                int back = residualCapacity.get(currentId).getOrDefault(parentId, 0); // @step:augment-flow
                residualCapacity.get(currentId).put(parentId, back + bottleneck); // @step:augment-flow
                currentId = parentId; // @step:augment-flow
            }

            maxFlow += bottleneck; // @step:augment-flow
            parentMap = bfsFindPath(residualCapacity, sourceNodeId, sinkNodeId); // @step:augment-flow
        }

        return maxFlow; // @step:complete
    }

    private Map<String, String> bfsFindPath(
        Map<String, Map<String, Integer>> residualCapacity,
        String sourceNodeId,
        String sinkNodeId
    ) {
        Map<String, String> parentMap = new HashMap<>(); // @step:enqueue
        Set<String> visitedSet = new HashSet<>(); // @step:enqueue
        visitedSet.add(sourceNodeId); // @step:enqueue
        Queue<String> nodeQueue = new LinkedList<>(); // @step:enqueue
        nodeQueue.add(sourceNodeId); // @step:enqueue

        while (!nodeQueue.isEmpty()) {
            String currentId = nodeQueue.poll(); // @step:dequeue
            Map<String, Integer> neighbors = residualCapacity.getOrDefault(currentId, new HashMap<>()); // @step:visit-node
            for (Map.Entry<String, Integer> entry : neighbors.entrySet()) { // @step:visit-node
                String neighborId = entry.getKey(); // @step:visit-node
                int residual = entry.getValue(); // @step:visit-node
                if (!visitedSet.contains(neighborId) && residual > 0) {
                    visitedSet.add(neighborId); // @step:enqueue
                    parentMap.put(neighborId, currentId); // @step:enqueue
                    nodeQueue.add(neighborId); // @step:enqueue
                    if (neighborId.equals(sinkNodeId)) return parentMap; // @step:enqueue
                }
            }
        }
        return null; // @step:dequeue
    }
}
