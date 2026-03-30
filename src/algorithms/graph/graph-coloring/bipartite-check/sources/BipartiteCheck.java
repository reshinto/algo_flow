import java.util.*;

// Bipartite Check — 2-coloring via BFS; conflict means not bipartite
public class BipartiteCheck {
    public Map<String, Object> bipartiteCheck(
        Map<String, List<String>> adjacencyList,
        List<String> nodeIds
    ) {
        Map<String, Integer> coloring = new HashMap<>(); // @step:initialize

        for (String startNodeId : nodeIds) {
            if (coloring.containsKey(startNodeId)) continue; // @step:initialize

            coloring.put(startNodeId, 0); // @step:enqueue
            Queue<String> nodeQueue = new LinkedList<>(); // @step:enqueue
            nodeQueue.add(startNodeId); // @step:enqueue

            while (!nodeQueue.isEmpty()) {
                String currentId = nodeQueue.poll(); // @step:dequeue
                int currentColor = coloring.get(currentId); // @step:visit-node
                List<String> neighbors = adjacencyList.getOrDefault(currentId, new ArrayList<>()); // @step:visit-node

                for (String neighborId : neighbors) { // @step:visit-node
                    if (!coloring.containsKey(neighborId)) {
                        coloring.put(neighborId, 1 - currentColor); // @step:assign-color
                        nodeQueue.add(neighborId); // @step:assign-color
                    } else if (coloring.get(neighborId) == currentColor) {
                        Map<String, Object> result = new HashMap<>(); // @step:check-conflict
                        result.put("isBipartite", false); // @step:check-conflict
                        result.put("coloring", coloring); // @step:check-conflict
                        return result; // @step:check-conflict
                    }
                }
            }
        }

        Map<String, Object> result = new HashMap<>(); // @step:complete
        result.put("isBipartite", true); // @step:complete
        result.put("coloring", coloring); // @step:complete
        return result; // @step:complete
    }
}
