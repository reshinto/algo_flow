import java.util.*;

// Tarjan's SCC — finds strongly connected components using DFS with discovery and low-link values
public class TarjanSCC {
    private Map<String, Integer> discoveryTime = new HashMap<>(); // @step:initialize
    private Map<String, Integer> lowLink = new HashMap<>(); // @step:initialize
    private Map<String, Boolean> onStack = new HashMap<>(); // @step:initialize
    private Deque<String> nodeStack = new ArrayDeque<>(); // @step:initialize
    private List<List<String>> components = new ArrayList<>(); // @step:initialize
    private int timer = 0; // @step:initialize

    public List<List<String>> tarjanSCC(Map<String, List<String>> adjacencyList, List<String> nodeIds) {
        for (String nodeId : nodeIds) {
            if (!discoveryTime.containsKey(nodeId)) {
                dfs(adjacencyList, nodeId); // @step:initialize
            }
        }
        return components; // @step:complete
    }

    private void dfs(Map<String, List<String>> adjacencyList, String nodeId) {
        discoveryTime.put(nodeId, timer); // @step:visit
        lowLink.put(nodeId, timer); // @step:visit
        timer++; // @step:visit
        nodeStack.push(nodeId); // @step:push-stack
        onStack.put(nodeId, true); // @step:push-stack

        List<String> neighbors = adjacencyList.getOrDefault(nodeId, Collections.emptyList());
        for (String neighborId : neighbors) {
            if (!discoveryTime.containsKey(neighborId)) {
                dfs(adjacencyList, neighborId); // @step:visit-edge
                lowLink.put(nodeId, Math.min(lowLink.get(nodeId), lowLink.get(neighborId))); // @step:visit-edge
            } else if (Boolean.TRUE.equals(onStack.get(neighborId))) {
                lowLink.put(nodeId, Math.min(lowLink.get(nodeId), discoveryTime.get(neighborId))); // @step:visit-edge
            }
        }

        if (lowLink.get(nodeId).equals(discoveryTime.get(nodeId))) {
            List<String> component = new ArrayList<>(); // @step:pop-stack
            String poppedNodeId;
            do {
                poppedNodeId = nodeStack.pop(); // @step:pop-stack
                onStack.put(poppedNodeId, false); // @step:pop-stack
                component.add(poppedNodeId); // @step:pop-stack
            } while (!poppedNodeId.equals(nodeId));
            components.add(component); // @step:assign-component
        }
    }
}
