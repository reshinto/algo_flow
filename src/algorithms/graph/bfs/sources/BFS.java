import java.util.*;

// BFS — traverse level-by-level using a FIFO queue
public class BFS {
    public static List<String> breadthFirstSearch(Map<String, List<String>> adjacencyList, String startNodeId) {
        List<String> visitOrder = new ArrayList<>(); // @step:initialize
        Set<String> visitedSet = new HashSet<>(); // @step:initialize
        Queue<String> nodeQueue = new LinkedList<>(); // @step:initialize
        nodeQueue.add(startNodeId); // @step:initialize
        visitedSet.add(startNodeId); // @step:initialize

        while (!nodeQueue.isEmpty()) {
            String currentNodeId = nodeQueue.poll(); // @step:dequeue
            visitOrder.add(currentNodeId); // @step:dequeue,visit

            // Mark as visited when enqueuing to avoid duplicates
            List<String> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList());
            for (String neighborId : neighbors) {
                if (!visitedSet.contains(neighborId)) { // @step:visit-edge
                    visitedSet.add(neighborId); // @step:visit-edge
                    nodeQueue.add(neighborId); // @step:visit-edge,enqueue
                }
            }
        }

        return visitOrder; // @step:complete
    }
}
