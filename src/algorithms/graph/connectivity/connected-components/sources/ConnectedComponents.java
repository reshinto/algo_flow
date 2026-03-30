import java.util.*;

// Connected Components — find all connected components in an undirected graph using BFS
public class ConnectedComponents {
    public static List<List<String>> connectedComponents(Map<String, List<String>> adjacencyList, List<String> nodeIds) {
        List<List<String>> components = new ArrayList<>(); // @step:initialize
        Set<String> visitedSet = new HashSet<>(); // @step:initialize

        for (String startNodeId : nodeIds) {
            if (visitedSet.contains(startNodeId)) continue; // @step:initialize

            List<String> currentComponent = new ArrayList<>(); // @step:enqueue
            Queue<String> nodeQueue = new LinkedList<>(); // @step:enqueue
            nodeQueue.add(startNodeId); // @step:enqueue
            visitedSet.add(startNodeId); // @step:enqueue

            while (!nodeQueue.isEmpty()) {
                String currentNodeId = nodeQueue.poll(); // @step:dequeue
                currentComponent.add(currentNodeId); // @step:dequeue,visit

                List<String> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList());
                for (String neighborId : neighbors) {
                    if (!visitedSet.contains(neighborId)) {
                        visitedSet.add(neighborId); // @step:visit-edge
                        nodeQueue.add(neighborId); // @step:visit-edge,enqueue
                    }
                }
            }

            components.add(currentComponent); // @step:assign-component
        }

        return components; // @step:complete
    }
}
