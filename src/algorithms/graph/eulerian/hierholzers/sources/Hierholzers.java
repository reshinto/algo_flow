import java.util.*;

// Hierholzer's Algorithm — find an Eulerian circuit using subcircuit splicing
public class Hierholzers {
    public static List<String> hierholzersAlgorithm(Map<String, List<String>> adjacencyList, String startNodeId) {
        // Build a mutable copy of the adjacency list so edges can be removed as used
        Map<String, LinkedList<String>> remainingEdges = new HashMap<>(); // @step:initialize
        for (Map.Entry<String, List<String>> entry : adjacencyList.entrySet()) {
            remainingEdges.put(entry.getKey(), new LinkedList<>(entry.getValue())); // @step:initialize
        }

        LinkedList<String> circuit = new LinkedList<>(); // @step:initialize
        Deque<String> nodeStack = new ArrayDeque<>(); // @step:initialize
        nodeStack.push(startNodeId); // @step:initialize,push-stack

        while (!nodeStack.isEmpty()) {
            String currentNodeId = nodeStack.peek(); // @step:pop-stack
            LinkedList<String> currentNeighbors = remainingEdges.getOrDefault(currentNodeId, new LinkedList<>());

            if (!currentNeighbors.isEmpty()) {
                String nextNodeId = currentNeighbors.removeFirst(); // @step:use-edge
                // For undirected graphs, remove the reverse edge as well
                LinkedList<String> reverseNeighbors = remainingEdges.getOrDefault(nextNodeId, new LinkedList<>());
                reverseNeighbors.remove(currentNodeId); // @step:use-edge
                nodeStack.push(nextNodeId); // @step:push-stack
            } else {
                // No unused edges from currentNodeId — add it to the circuit
                nodeStack.pop(); // @step:pop-stack
                circuit.addFirst(currentNodeId); // @step:visit
            }
        }

        return new ArrayList<>(circuit); // @step:complete
    }
}
