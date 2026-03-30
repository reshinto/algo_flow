import java.util.*;

// Greedy Graph Coloring — assign smallest available color to each node in order
public class GreedyColoring {
    public Map<String, Integer> greedyColoring(
        Map<String, List<String>> adjacencyList,
        List<String> nodeIds
    ) {
        Map<String, Integer> colorAssignment = new HashMap<>(); // @step:initialize

        for (String nodeId : nodeIds) {
            Set<Integer> neighborColors = new HashSet<>(); // @step:visit-node
            List<String> neighbors = adjacencyList.getOrDefault(nodeId, new ArrayList<>()); // @step:visit-node
            for (String neighborId : neighbors) { // @step:visit-node
                if (colorAssignment.containsKey(neighborId)) { // @step:visit-node
                    neighborColors.add(colorAssignment.get(neighborId)); // @step:visit-node
                }
            }

            int assignedColor = 0; // @step:assign-color
            while (neighborColors.contains(assignedColor)) { // @step:assign-color
                assignedColor++; // @step:assign-color
            }
            colorAssignment.put(nodeId, assignedColor); // @step:assign-color
        }

        return colorAssignment; // @step:complete
    }
}
