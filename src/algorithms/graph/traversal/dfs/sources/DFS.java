import java.util.*;

// DFS — traverse depth-first using a LIFO stack
public class DFS {
    public static List<String> depthFirstSearch(Map<String, List<String>> adjacencyList, String startNodeId) {
        List<String> visitOrder = new ArrayList<>(); // @step:initialize
        Set<String> visitedSet = new HashSet<>(); // @step:initialize
        Deque<String> nodeStack = new ArrayDeque<>(); // @step:initialize
        nodeStack.push(startNodeId); // @step:initialize,push-stack

        while (!nodeStack.isEmpty()) {
            String currentNodeId = nodeStack.pop(); // @step:pop-stack
            if (visitedSet.contains(currentNodeId)) { // @step:pop-stack
                continue;
            }

            visitedSet.add(currentNodeId); // @step:visit
            visitOrder.add(currentNodeId); // @step:visit

            // Push neighbors onto stack to explore depth-first
            List<String> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList());
            for (String neighborId : neighbors) {
                if (!visitedSet.contains(neighborId)) { // @step:visit-edge
                    nodeStack.push(neighborId); // @step:visit-edge,push-stack
                }
            }
        }

        return visitOrder; // @step:complete
    }
}
