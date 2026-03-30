import java.util.*;

// IDDFS — iterative deepening depth-first search using increasing depth limits
public class IDDFS {
    public static List<String> iterativeDeepeningDFS(
            Map<String, List<String>> adjacencyList,
            String startNodeId,
            int maxDepth) {
        List<String> visitOrder = new ArrayList<>(); // @step:initialize
        int resolvedMaxDepth = maxDepth >= 0 ? maxDepth : adjacencyList.size(); // @step:initialize

        for (int depthLimit = 0; depthLimit <= resolvedMaxDepth; depthLimit++) { // @step:initialize
            visitOrder.clear(); // @step:initialize
            Set<String> visitedSet = new HashSet<>(); // @step:initialize

            Deque<int[]> depthStack = new ArrayDeque<>();
            Deque<String> nodeStack = new ArrayDeque<>();
            nodeStack.push(startNodeId); // @step:push-stack
            depthStack.push(new int[]{0}); // @step:push-stack

            while (!nodeStack.isEmpty()) {
                String currentNodeId = nodeStack.pop(); // @step:pop-stack
                int currentDepth = depthStack.pop()[0]; // @step:pop-stack

                if (visitedSet.contains(currentNodeId)) { // @step:backtrack
                    continue; // @step:backtrack
                }

                visitedSet.add(currentNodeId); // @step:visit
                visitOrder.add(currentNodeId); // @step:visit

                if (currentDepth >= depthLimit) { // @step:visit
                    continue; // @step:visit
                }

                List<String> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList()); // @step:visit-edge
                List<String> reversedNeighbors = new ArrayList<>(neighbors);
                Collections.reverse(reversedNeighbors);
                for (String neighborId : reversedNeighbors) { // @step:visit-edge
                    if (!visitedSet.contains(neighborId)) { // @step:visit-edge
                        nodeStack.push(neighborId); // @step:push-stack
                        depthStack.push(new int[]{currentDepth + 1}); // @step:push-stack
                    }
                }
            }

            boolean allVisited = adjacencyList.keySet().stream().allMatch(visitedSet::contains); // @step:complete
            if (allVisited) { // @step:complete
                break; // @step:complete
            }
        }

        return visitOrder; // @step:complete
    }
}
