import java.util.*;

// DFS Cycle Detection (Directed) — three-color marking via DFS
// White = unvisited, Gray = in current stack, Black = fully processed
public class DfsCycleDirected {
    public static boolean dfsCycleDirected(Map<String, List<String>> adjacencyList, List<String> nodeIds) {
        Map<String, String> colorMap = new HashMap<>(); // @step:initialize
        for (String nodeId : nodeIds) { // @step:initialize
            colorMap.put(nodeId, "white"); // @step:initialize
        }

        for (String nodeId : nodeIds) {
            if ("white".equals(colorMap.get(nodeId))) { // @step:visit
                if (dfsVisit(adjacencyList, colorMap, nodeId)) { // @step:visit
                    return true; // @step:complete
                }
            }
        }

        return false; // @step:complete
    }

    private static boolean dfsVisit(
        Map<String, List<String>> adjacencyList,
        Map<String, String> colorMap,
        String currentNodeId
    ) {
        colorMap.put(currentNodeId, "gray"); // @step:push-stack

        List<String> neighbors = adjacencyList.getOrDefault(currentNodeId, Collections.emptyList()); // @step:visit
        for (String neighborId : neighbors) {
            if ("gray".equals(colorMap.get(neighborId))) { // @step:classify-edge
                return true; // @step:classify-edge
            }
            if ("white".equals(colorMap.get(neighborId))) { // @step:classify-edge
                if (dfsVisit(adjacencyList, colorMap, neighborId)) { // @step:classify-edge
                    return true; // @step:classify-edge
                }
            }
        }

        colorMap.put(currentNodeId, "black"); // @step:process-node
        return false; // @step:process-node
    }
}
