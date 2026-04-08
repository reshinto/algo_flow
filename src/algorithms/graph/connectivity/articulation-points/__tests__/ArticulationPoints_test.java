import java.util.*;

// Compile: javac ArticulationPoints.java ArticulationPoints_test.java
// Run:     java -ea ArticulationPoints_test
public class ArticulationPoints_test {
    public static void main(String[] args) {
        testFindsTwoArticulationPointsInDefault7NodeGraph();
        testReturnsNoArticulationPointsForTriangle();
        testFindsSingleArticulationPointInPathGraph();
        testFindsMultipleArticulationPointsInLongerPath();
        testReturnsNoArticulationPointsForSingleNode();
        testReturnsNoArticulationPointsForFullyConnectedGraph();
        testFindsStarCenterAsArticulationPoint();
        testHandlesDisconnectedGraphsWithNoArticulationPoints();
        System.out.println("All tests passed!");
    }

    static Map<String, List<String>> adj(String... keyValues) {
        Map<String, List<String>> map = new LinkedHashMap<>();
        for (int idx = 0; idx < keyValues.length; idx += 2) {
            List<String> neighbors = new ArrayList<>();
            for (String neighbor : keyValues[idx + 1].split(",")) {
                if (!neighbor.isEmpty()) neighbors.add(neighbor.trim());
            }
            map.put(keyValues[idx], neighbors);
        }
        return map;
    }

    static void testFindsTwoArticulationPointsInDefault7NodeGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("A", "B", "D"));
        adjacencyList.put("D", Arrays.asList("C", "E", "F"));
        adjacencyList.put("E", Arrays.asList("D", "G"));
        adjacencyList.put("F", Arrays.asList("D", "G"));
        adjacencyList.put("G", Arrays.asList("E", "F"));
        List<String> nodeIds = Arrays.asList("A", "B", "C", "D", "E", "F", "G");

        ArticulationPoints ap = new ArticulationPoints();
        List<String> result = ap.findArticulationPoints(adjacencyList, nodeIds);
        Set<String> resultSet = new HashSet<>(result);
        assert resultSet.equals(new HashSet<>(Arrays.asList("C", "D"))) :
            "Expected {C, D}, got " + resultSet;
    }

    static void testReturnsNoArticulationPointsForTriangle() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("A", "B"));
        ArticulationPoints ap = new ArticulationPoints();
        List<String> result = ap.findArticulationPoints(adjacencyList, Arrays.asList("A", "B", "C"));
        assert result.isEmpty() : "Expected empty, got " + result;
    }

    static void testFindsSingleArticulationPointInPathGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B"));
        ArticulationPoints ap = new ArticulationPoints();
        List<String> result = ap.findArticulationPoints(adjacencyList, Arrays.asList("A", "B", "C"));
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("B"))) :
            "Expected {B}, got " + result;
    }

    static void testFindsMultipleArticulationPointsInLongerPath() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("B", "D"));
        adjacencyList.put("D", Arrays.asList("C"));
        ArticulationPoints ap = new ArticulationPoints();
        List<String> result = ap.findArticulationPoints(adjacencyList, Arrays.asList("A", "B", "C", "D"));
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("B", "C"))) :
            "Expected {B, C}, got " + result;
    }

    static void testReturnsNoArticulationPointsForSingleNode() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Collections.emptyList());
        ArticulationPoints ap = new ArticulationPoints();
        List<String> result = ap.findArticulationPoints(adjacencyList, Arrays.asList("A"));
        assert result.isEmpty() : "Expected empty, got " + result;
    }

    static void testReturnsNoArticulationPointsForFullyConnectedGraph() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C", "D"));
        adjacencyList.put("B", Arrays.asList("A", "C", "D"));
        adjacencyList.put("C", Arrays.asList("A", "B", "D"));
        adjacencyList.put("D", Arrays.asList("A", "B", "C"));
        ArticulationPoints ap = new ArticulationPoints();
        List<String> result = ap.findArticulationPoints(adjacencyList, Arrays.asList("A", "B", "C", "D"));
        assert result.isEmpty() : "Expected empty, got " + result;
    }

    static void testFindsStarCenterAsArticulationPoint() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("Center", Arrays.asList("A", "B", "C"));
        adjacencyList.put("A", Arrays.asList("Center"));
        adjacencyList.put("B", Arrays.asList("Center"));
        adjacencyList.put("C", Arrays.asList("Center"));
        ArticulationPoints ap = new ArticulationPoints();
        List<String> result = ap.findArticulationPoints(adjacencyList, Arrays.asList("Center", "A", "B", "C"));
        assert new HashSet<>(result).equals(new HashSet<>(Arrays.asList("Center"))) :
            "Expected {Center}, got " + result;
    }

    static void testHandlesDisconnectedGraphsWithNoArticulationPoints() {
        Map<String, List<String>> adjacencyList = new LinkedHashMap<>();
        adjacencyList.put("A", Arrays.asList("B", "C"));
        adjacencyList.put("B", Arrays.asList("A", "C"));
        adjacencyList.put("C", Arrays.asList("A", "B"));
        adjacencyList.put("D", Arrays.asList("E", "F"));
        adjacencyList.put("E", Arrays.asList("D", "F"));
        adjacencyList.put("F", Arrays.asList("D", "E"));
        ArticulationPoints ap = new ArticulationPoints();
        List<String> result = ap.findArticulationPoints(adjacencyList, Arrays.asList("A", "B", "C", "D", "E", "F"));
        assert result.isEmpty() : "Expected empty, got " + result;
    }
}
