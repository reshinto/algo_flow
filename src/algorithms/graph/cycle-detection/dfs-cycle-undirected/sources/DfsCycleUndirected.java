import java.util.*;

// DFS Cycle Detection (Undirected) — parent tracking to identify back edges
public class DfsCycleUndirected {
    public static boolean dfsCycleUndirected(Map<String, List<String>> adjacencyList, List<String> nodeIds) {
        Set<String> visitedSet = new HashSet<>(); // @step:initialize

        for (String nodeId : nodeIds) {
            if (!visitedSet.contains(nodeId)) { // @step:visit
                if (dfsVisit(adjacencyList, visitedSet, nodeId, null)) { // @step:visit
                    return true; // @step:complete
                }
            }
        }

        return false; // @step:complete
    }

    private static boolean dfsVisit(
        Map<String, List<String>> adjacencyList,
        Set<String> visitedSet,
        String currentNodeId,
        String parentNodeId
    ) {
        visitedSet.add(currentNodeId); // @step:push-stack

        List<String> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList()); // @step:visit
        for (String neighborId : neighbors) {
            if (!visitedSet.contains(neighborId)) { // @step:classify-edge
                if (dfsVisit(adjacencyList, visitedSet, neighborId, currentNodeId)) { // @step:classify-edge
                    return true; // @step:classify-edge
                }
            } else if (!neighborId.equals(parentNodeId)) { // @step:classify-edge
                return true; // @step:classify-edge
            }
        }

        return false; // @step:pop-stack
    }
}
