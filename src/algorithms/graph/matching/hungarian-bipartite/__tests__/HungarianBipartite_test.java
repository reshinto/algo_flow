import java.util.*;

// Compile: javac HungarianBipartite.java HungarianBipartite_test.java
// Run:     java -ea HungarianBipartite_test
public class HungarianBipartite_test {
    public static void main(String[] args) {
        testFindsPerfectMatchingForFullyMatchableBipartiteGraph();
        testReturnsPartialMatchingWhenNotAllLeftNodesCanBeMatched();
        testReturnsEmptyMatchingForGraphWithNoEdges();
        testMatchesSingleLeftRightPairCorrectly();
        testFindsAugmentingPathToRerouteExistingMatch();
        testHandlesOneToOneBipartiteGraphWithGuaranteedPerfectMatching();
        testReturnsEmptyMatchingForEmptyGraphWithNoNodes();
        System.out.println("All tests passed!");
    }

    static void testFindsPerfectMatchingForFullyMatchableBipartiteGraph() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("L1", Arrays.asList("R1", "R2")); adj.put("L2", Arrays.asList("R2", "R3"));
        adj.put("L3", Arrays.asList("R1", "R3")); adj.put("R1", Arrays.asList("L1", "L3"));
        adj.put("R2", Arrays.asList("L1", "L2")); adj.put("R3", Arrays.asList("L2", "L3"));
        Map<String, String> result = HungarianBipartite.hungarianMatching(
            adj, Arrays.asList("L1", "L2", "L3"), Arrays.asList("R1", "R2", "R3"));
        assert result.size() == 3;
        assert result.containsKey("L1") && result.containsKey("L2") && result.containsKey("L3");
        assert new HashSet<>(result.values()).size() == result.values().size();
    }

    static void testReturnsPartialMatchingWhenNotAllLeftNodesCanBeMatched() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("L1", Arrays.asList("R1")); adj.put("L2", Arrays.asList("R1"));
        adj.put("R1", Arrays.asList("L1", "L2"));
        Map<String, String> result = HungarianBipartite.hungarianMatching(
            adj, Arrays.asList("L1", "L2"), Arrays.asList("R1"));
        assert result.size() == 1;
        assert result.values().iterator().next().equals("R1");
    }

    static void testReturnsEmptyMatchingForGraphWithNoEdges() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("L1", Collections.emptyList()); adj.put("L2", Collections.emptyList());
        adj.put("R1", Collections.emptyList()); adj.put("R2", Collections.emptyList());
        Map<String, String> result = HungarianBipartite.hungarianMatching(
            adj, Arrays.asList("L1", "L2"), Arrays.asList("R1", "R2"));
        assert result.isEmpty();
    }

    static void testMatchesSingleLeftRightPairCorrectly() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("L1", Arrays.asList("R1")); adj.put("R1", Arrays.asList("L1"));
        Map<String, String> result = HungarianBipartite.hungarianMatching(
            adj, Arrays.asList("L1"), Arrays.asList("R1"));
        assert result.get("L1").equals("R1");
        assert result.size() == 1;
    }

    static void testFindsAugmentingPathToRerouteExistingMatch() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("L1", Arrays.asList("R1", "R2")); adj.put("L2", Arrays.asList("R1"));
        adj.put("R1", Arrays.asList("L1", "L2")); adj.put("R2", Arrays.asList("L1"));
        Map<String, String> result = HungarianBipartite.hungarianMatching(
            adj, Arrays.asList("L1", "L2"), Arrays.asList("R1", "R2"));
        assert result.size() == 2;
        assert new HashSet<>(result.values()).size() == 2;
    }

    static void testHandlesOneToOneBipartiteGraphWithGuaranteedPerfectMatching() {
        Map<String, List<String>> adj = new LinkedHashMap<>();
        adj.put("L1", Arrays.asList("R1")); adj.put("L2", Arrays.asList("R2"));
        adj.put("L3", Arrays.asList("R3")); adj.put("R1", Arrays.asList("L1"));
        adj.put("R2", Arrays.asList("L2")); adj.put("R3", Arrays.asList("L3"));
        Map<String, String> result = HungarianBipartite.hungarianMatching(
            adj, Arrays.asList("L1", "L2", "L3"), Arrays.asList("R1", "R2", "R3"));
        assert result.get("L1").equals("R1");
        assert result.get("L2").equals("R2");
        assert result.get("L3").equals("R3");
    }

    static void testReturnsEmptyMatchingForEmptyGraphWithNoNodes() {
        Map<String, String> result = HungarianBipartite.hungarianMatching(
            Collections.emptyMap(), Collections.emptyList(), Collections.emptyList());
        assert result.isEmpty();
    }
}
