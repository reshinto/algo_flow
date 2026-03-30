import java.util.*;

// Articulation Points — finds all cut vertices in an undirected graph using DFS with low-link values
public class ArticulationPoints {
    private Map<String, Integer> discoveryTime = new HashMap<>(); // @step:initialize
    private Map<String, Integer> lowLink = new HashMap<>(); // @step:initialize
    private Set<String> articulationPoints = new HashSet<>(); // @step:initialize
    private int timer = 0; // @step:initialize

    public List<String> findArticulationPoints(Map<String, List<String>> adjacencyList, List<String> nodeIds) {
        for (String nodeId : nodeIds) {
            if (!discoveryTime.containsKey(nodeId)) {
                dfs(adjacencyList, nodeId, null); // @step:initialize
            }
        }
        return new ArrayList<>(articulationPoints); // @step:complete
    }

    private void dfs(Map<String, List<String>> adjacencyList, String nodeId, String parentId) {
        discoveryTime.put(nodeId, timer); // @step:visit
        lowLink.put(nodeId, timer); // @step:visit
        timer++; // @step:visit
        int childCount = 0; // @step:visit

        List<String> neighbors = adjacencyList.getOrDefault(nodeId, Collections.emptyList());
        for (String neighborId : neighbors) {
            if (!discoveryTime.containsKey(neighborId)) {
                childCount++; // @step:visit-edge
                dfs(adjacencyList, neighborId, nodeId); // @step:visit-edge
                lowLink.put(nodeId, Math.min(lowLink.get(nodeId), lowLink.get(neighborId))); // @step:visit-edge

                // Root with multiple children is an articulation point
                if (parentId == null && childCount > 1) {
                    articulationPoints.add(nodeId); // @step:mark-articulation
                }
                // Non-root: articulation point if no back edge from subtree
                if (parentId != null && lowLink.get(neighborId) >= discoveryTime.get(nodeId)) {
                    articulationPoints.add(nodeId); // @step:mark-articulation
                }
            } else if (!neighborId.equals(parentId)) {
                lowLink.put(nodeId, Math.min(lowLink.get(nodeId), discoveryTime.get(neighborId))); // @step:visit-edge
            }
        }
    }
}
