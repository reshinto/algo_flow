import java.util.*;

// Kosaraju's SCC — two-pass DFS: first pass collects finish order, second pass on transposed graph
public class KosarajuSCC {
    public static List<List<String>> kosarajuSCC(Map<String, List<String>> adjacencyList, List<String> nodeIds) {
        Set<String> visitedSet = new HashSet<>(); // @step:initialize
        Deque<String> finishOrder = new ArrayDeque<>(); // @step:initialize

        // First pass: DFS on original graph to collect finish order
        for (String nodeId : nodeIds) {
            if (!visitedSet.contains(nodeId)) {
                dfsFirstPass(adjacencyList, nodeId, visitedSet, finishOrder); // @step:initialize
            }
        }

        // Build transposed adjacency list
        Map<String, List<String>> transposedList = new HashMap<>(); // @step:initialize
        for (String nodeId : nodeIds) {
            transposedList.put(nodeId, new ArrayList<>());
        }
        for (String sourceId : nodeIds) {
            for (String targetId : adjacencyList.getOrDefault(sourceId, Collections.emptyList())) {
                transposedList.computeIfAbsent(targetId, k -> new ArrayList<>()).add(sourceId); // @step:initialize
            }
        }

        // Second pass: DFS on transposed graph in reverse finish order
        visitedSet.clear(); // @step:initialize
        List<List<String>> components = new ArrayList<>(); // @step:initialize

        while (!finishOrder.isEmpty()) {
            String nodeId = finishOrder.pop(); // @step:pop-stack
            if (!visitedSet.contains(nodeId)) {
                List<String> currentComponent = new ArrayList<>(); // @step:pop-stack
                dfsSecondPass(transposedList, nodeId, visitedSet, currentComponent); // @step:pop-stack
                components.add(currentComponent); // @step:assign-component
            }
        }

        return components; // @step:complete
    }

    private static void dfsFirstPass(Map<String, List<String>> adjacencyList, String nodeId,
            Set<String> visitedSet, Deque<String> finishOrder) {
        visitedSet.add(nodeId); // @step:visit
        for (String neighborId : adjacencyList.getOrDefault(nodeId, Collections.emptyList())) {
            if (!visitedSet.contains(neighborId)) {
                dfsFirstPass(adjacencyList, neighborId, visitedSet, finishOrder); // @step:visit-edge
            }
        }
        finishOrder.push(nodeId); // @step:push-stack
    }

    private static void dfsSecondPass(Map<String, List<String>> transposedList, String nodeId,
            Set<String> visitedSet, List<String> currentComponent) {
        visitedSet.add(nodeId); // @step:visit
        currentComponent.add(nodeId); // @step:visit
        for (String neighborId : transposedList.getOrDefault(nodeId, Collections.emptyList())) {
            if (!visitedSet.contains(neighborId)) {
                dfsSecondPass(transposedList, neighborId, visitedSet, currentComponent); // @step:visit-edge
            }
        }
    }
}
