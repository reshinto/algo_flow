import java.util.*;

// Union-Find Cycle Detection — detect cycles by checking if two endpoints share a component
public class UnionFindCycle {
    public static boolean unionFindCycle(List<Map<String, String>> edges, List<String> nodeIds) {
        Map<String, String> parent = new HashMap<>(); // @step:initialize
        Map<String, Integer> rank = new HashMap<>(); // @step:initialize
        for (String nodeId : nodeIds) { // @step:initialize
            parent.put(nodeId, nodeId); // @step:initialize
            rank.put(nodeId, 0); // @step:initialize
        }

        for (Map<String, String> edge : edges) {
            String sourceRoot = findRoot(parent, edge.get("source")); // @step:visit-edge
            String targetRoot = findRoot(parent, edge.get("target")); // @step:visit-edge

            if (sourceRoot.equals(targetRoot)) { // @step:visit-edge
                return true; // @step:complete
            }

            unionComponents(parent, rank, edge.get("source"), edge.get("target")); // @step:merge-components
        }

        return false; // @step:complete
    }

    private static String findRoot(Map<String, String> parent, String nodeId) {
        if (!parent.get(nodeId).equals(nodeId)) {
            parent.put(nodeId, findRoot(parent, parent.get(nodeId)));
        }
        return parent.get(nodeId);
    }

    private static void unionComponents(
        Map<String, String> parent,
        Map<String, Integer> rank,
        String nodeA,
        String nodeB
    ) {
        String rootA = findRoot(parent, nodeA);
        String rootB = findRoot(parent, nodeB);
        int rankA = rank.getOrDefault(rootA, 0);
        int rankB = rank.getOrDefault(rootB, 0);
        if (rankA < rankB) {
            parent.put(rootA, rootB);
        } else if (rankA > rankB) {
            parent.put(rootB, rootA);
        } else {
            parent.put(rootB, rootA);
            rank.put(rootA, rankA + 1);
        }
    }
}
