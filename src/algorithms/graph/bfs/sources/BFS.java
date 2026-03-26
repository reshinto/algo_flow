import java.util.*;

public class BFS {
    public static List<String> breadthFirstSearch(Map<String, List<String>> adjacencyList, String startNodeId) {
        List<String> visitOrder = new ArrayList<>();
        Set<String> visitedSet = new HashSet<>();
        Queue<String> nodeQueue = new LinkedList<>();
        nodeQueue.add(startNodeId);
        visitedSet.add(startNodeId);

        while (!nodeQueue.isEmpty()) {
            String currentNodeId = nodeQueue.poll();
            visitOrder.add(currentNodeId);

            List<String> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList());
            for (String neighborId : neighbors) {
                if (!visitedSet.contains(neighborId)) {
                    visitedSet.add(neighborId);
                    nodeQueue.add(neighborId);
                }
            }
        }

        return visitOrder;
    }
}
