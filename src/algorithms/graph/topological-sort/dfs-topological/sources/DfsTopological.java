import java.util.*;

// DFS Topological Sort — post-order DFS, prepend finished nodes to result
public class DfsTopological {
    public static List<String> dfsTopologicalSort(
        Map<String, List<String>> adjacencyList, List<String> nodeIds
    ) {
        Set<String> visitedSet = new HashSet<>(); // @step:initialize
        LinkedList<String> topologicalOrder = new LinkedList<>(); // @step:initialize

        for (String nodeId : nodeIds) {
            if (!visitedSet.contains(nodeId)) { // @step:push-stack
                dfsVisit(nodeId, adjacencyList, visitedSet, topologicalOrder); // @step:push-stack
            }
        }

        return new ArrayList<>(topologicalOrder); // @step:complete
    }

    private static void dfsVisit(
        String currentNodeId,
        Map<String, List<String>> adjacencyList,
        Set<String> visitedSet,
        LinkedList<String> topologicalOrder
    ) {
        visitedSet.add(currentNodeId); // @step:visit
        for (String neighborId : adjacencyList.getOrDefault(currentNodeId, Collections.emptyList())) { // @step:visit
            if (!visitedSet.contains(neighborId)) { // @step:push-stack
                dfsVisit(neighborId, adjacencyList, visitedSet, topologicalOrder); // @step:push-stack
            }
        }
        topologicalOrder.addFirst(currentNodeId); // @step:add-to-order
    }
}
