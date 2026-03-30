import java.util.*;

// Hungarian Bipartite Matching (Kuhn's Algorithm) — maximum matching via augmenting paths
public class HungarianBipartite {
    public static Map<String, String> hungarianMatching(
        Map<String, List<String>> adjacencyList,
        List<String> leftNodes,
        List<String> rightNodes
    ) {
        Map<String, String> matchLeft = new HashMap<>(); // @step:initialize
        Map<String, String> matchRight = new HashMap<>(); // @step:initialize

        for (String leftNode : leftNodes) { // @step:initialize
            Set<String> visitedRight = new HashSet<>(); // @step:initialize
            tryAugment(leftNode, adjacencyList, matchLeft, matchRight, visitedRight); // @step:visit
        }

        return matchLeft; // @step:complete
    }

    private static boolean tryAugment(
        String leftNode,
        Map<String, List<String>> adjacencyList,
        Map<String, String> matchLeft,
        Map<String, String> matchRight,
        Set<String> visitedRight
    ) {
        List<String> neighbors = adjacencyList.getOrDefault(leftNode, Collections.emptyList()); // @step:visit-edge
        for (String rightNode : neighbors) { // @step:visit-edge
            if (visitedRight.contains(rightNode)) continue; // @step:visit-edge
            visitedRight.add(rightNode); // @step:visit-edge

            String currentOwner = matchRight.get(rightNode); // @step:visit-edge
            if (currentOwner == null ||
                tryAugment(currentOwner, adjacencyList, matchLeft, matchRight, visitedRight)) {
                matchLeft.put(leftNode, rightNode); // @step:match-edge
                matchRight.put(rightNode, leftNode); // @step:match-edge
                return true; // @step:match-edge
            }
        }
        return false; // @step:visit-edge
    }
}
