import java.util.*;

// Kahn's Algorithm — topological sort using BFS and in-degree tracking
public class Kahns {
    public static List<String> kahnsTopologicalSort(
        Map<String, List<String>> adjacencyList, List<String> nodeIds
    ) {
        Map<String, Integer> inDegreeMap = new HashMap<>(); // @step:initialize
        for (String nodeId : nodeIds) { // @step:initialize
            inDegreeMap.put(nodeId, 0); // @step:initialize
        }
        for (String nodeId : nodeIds) { // @step:initialize
            for (String neighborId : adjacencyList.getOrDefault(nodeId, Collections.emptyList())) {
                inDegreeMap.put(neighborId, inDegreeMap.getOrDefault(neighborId, 0) + 1); // @step:initialize
            }
        }

        Queue<String> nodeQueue = new LinkedList<>(); // @step:initialize
        for (String nodeId : nodeIds) {
            if (inDegreeMap.get(nodeId) == 0) { // @step:enqueue
                nodeQueue.add(nodeId); // @step:enqueue
            }
        }

        List<String> topologicalOrder = new ArrayList<>();

        while (!nodeQueue.isEmpty()) {
            String currentNodeId = nodeQueue.poll(); // @step:dequeue
            topologicalOrder.add(currentNodeId); // @step:add-to-order

            for (String neighborId : adjacencyList.getOrDefault(currentNodeId, Collections.emptyList())) {
                inDegreeMap.put(neighborId, inDegreeMap.getOrDefault(neighborId, 1) - 1); // @step:visit
                if (inDegreeMap.get(neighborId) == 0) { // @step:enqueue
                    nodeQueue.add(neighborId); // @step:enqueue
                }
            }
        }

        return topologicalOrder; // @step:complete
    }
}
