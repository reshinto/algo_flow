import java.util.*;

// Bridges (Cut Edges) — finds all bridge edges in an undirected graph using DFS with low-link values
public class Bridges {
    private Map<String, Integer> discoveryTime = new HashMap<>(); // @step:initialize
    private Map<String, Integer> lowLink = new HashMap<>(); // @step:initialize
    private List<String[]> bridges = new ArrayList<>(); // @step:initialize
    private int timer = 0; // @step:initialize

    public List<String[]> findBridges(Map<String, List<String>> adjacencyList, List<String> nodeIds) {
        for (String nodeId : nodeIds) {
            if (!discoveryTime.containsKey(nodeId)) {
                dfs(adjacencyList, nodeId, null); // @step:initialize
            }
        }
        return bridges; // @step:complete
    }

    private void dfs(Map<String, List<String>> adjacencyList, String nodeId, String parentId) {
        discoveryTime.put(nodeId, timer); // @step:visit
        lowLink.put(nodeId, timer); // @step:visit
        timer++; // @step:visit

        List<String> neighbors = adjacencyList.getOrDefault(nodeId, Collections.emptyList());
        for (String neighborId : neighbors) {
            if (!discoveryTime.containsKey(neighborId)) {
                dfs(adjacencyList, neighborId, nodeId); // @step:visit-edge
                lowLink.put(nodeId, Math.min(lowLink.get(nodeId), lowLink.get(neighborId))); // @step:visit-edge

                if (lowLink.get(neighborId) > discoveryTime.get(nodeId)) {
                    bridges.add(new String[]{nodeId, neighborId}); // @step:mark-bridge
                }
            } else if (!neighborId.equals(parentId)) {
                lowLink.put(nodeId, Math.min(lowLink.get(nodeId), discoveryTime.get(neighborId))); // @step:visit-edge
            }
        }
    }
}
