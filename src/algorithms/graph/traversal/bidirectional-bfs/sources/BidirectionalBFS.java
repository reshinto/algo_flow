import java.util.*;

// Bidirectional BFS — two simultaneous frontiers from start and target meeting in the middle
public class BidirectionalBFS {
    public static List<String> bidirectionalBFS(
            Map<String, List<String>> adjacencyList,
            String startNodeId,
            String targetNodeId) {

        if (startNodeId.equals(targetNodeId)) { // @step:initialize
            return Collections.singletonList(startNodeId); // @step:initialize
        }

        Map<String, String> forwardVisited = new HashMap<>(); // @step:initialize
        Map<String, String> backwardVisited = new HashMap<>(); // @step:initialize
        Queue<String> forwardQueue = new LinkedList<>(); // @step:initialize
        Queue<String> backwardQueue = new LinkedList<>(); // @step:initialize
        forwardVisited.put(startNodeId, null); // @step:initialize
        backwardVisited.put(targetNodeId, null); // @step:initialize
        forwardQueue.add(startNodeId); // @step:initialize
        backwardQueue.add(targetNodeId); // @step:initialize

        // Build undirected neighbor lookup by merging both edge directions
        Map<String, List<String>> undirectedNeighbors = new HashMap<>();
        for (Map.Entry<String, List<String>> entry : adjacencyList.entrySet()) {
            String nodeId = entry.getKey();
            undirectedNeighbors.computeIfAbsent(nodeId, k -> new ArrayList<>());
            for (String neighborId : entry.getValue()) {
                undirectedNeighbors.get(nodeId).add(neighborId);
                undirectedNeighbors.computeIfAbsent(neighborId, k -> new ArrayList<>());
                if (!undirectedNeighbors.get(neighborId).contains(nodeId)) {
                    undirectedNeighbors.get(neighborId).add(nodeId);
                }
            }
        }

        while (!forwardQueue.isEmpty() || !backwardQueue.isEmpty()) {
            // Expand the forward frontier one level
            if (!forwardQueue.isEmpty()) {
                String currentNodeId = forwardQueue.poll(); // @step:dequeue
                List<String> forwardNeighbors = undirectedNeighbors.getOrDefault(currentNodeId, Collections.emptyList());
                for (String neighborId : forwardNeighbors) { // @step:visit-edge
                    if (!forwardVisited.containsKey(neighborId)) {
                        forwardVisited.put(neighborId, currentNodeId); // @step:visit-edge
                        forwardQueue.add(neighborId); // @step:visit-edge,enqueue
                        if (backwardVisited.containsKey(neighborId)) { // @step:complete
                            return reconstructPath(forwardVisited, backwardVisited, neighborId); // @step:complete
                        }
                    }
                }
            }

            // Expand the backward frontier one level
            if (!backwardQueue.isEmpty()) {
                String currentNodeId = backwardQueue.poll(); // @step:dequeue
                List<String> backwardNeighbors = undirectedNeighbors.getOrDefault(currentNodeId, Collections.emptyList());
                for (String neighborId : backwardNeighbors) { // @step:visit-edge
                    if (!backwardVisited.containsKey(neighborId)) {
                        backwardVisited.put(neighborId, currentNodeId); // @step:visit-edge
                        backwardQueue.add(neighborId); // @step:visit-edge,enqueue
                        if (forwardVisited.containsKey(neighborId)) { // @step:complete
                            return reconstructPath(forwardVisited, backwardVisited, neighborId); // @step:complete
                        }
                    }
                }
            }
        }

        return null; // @step:complete
    }

    private static List<String> reconstructPath(
            Map<String, String> forwardVisited,
            Map<String, String> backwardVisited,
            String meetingNodeId) {
        List<String> forwardPath = new ArrayList<>();
        String currentNode = meetingNodeId;
        while (currentNode != null) {
            forwardPath.add(0, currentNode);
            currentNode = forwardVisited.get(currentNode);
        }

        List<String> backwardPath = new ArrayList<>();
        String backNode = backwardVisited.get(meetingNodeId);
        while (backNode != null) {
            backwardPath.add(backNode);
            backNode = backwardVisited.get(backNode);
        }

        forwardPath.addAll(backwardPath);
        return forwardPath;
    }
}
