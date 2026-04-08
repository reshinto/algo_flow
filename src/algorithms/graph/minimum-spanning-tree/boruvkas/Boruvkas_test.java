import java.util.*;

// Compile: javac Boruvkas.java Boruvkas_test.java
// Run:     java -ea Boruvkas_test
public class Boruvkas_test {
    public static void main(String[] args) {
        testFindsCorrectMstForDefault6NodeWeightedGraph();
        testReturnsVMinus1EdgesForConnectedGraph();
        testEachComponentSelectsCheapestOutgoingEdge();
        testProducesMinimumTotalWeightSpanningTree();
        testHandlesTwoNodeGraph();
        testHandlesLinearFourNodeChain();
        testProducesSameTotalWeightAsKruskals();
        System.out.println("All tests passed!");
    }

    static Boruvkas.WeightedEdge edge(String source, String target, int weight) {
        return new Boruvkas.WeightedEdge(source, target, weight);
    }

    static int totalWeight(List<Boruvkas.WeightedEdge> edges) {
        return edges.stream().mapToInt(Boruvkas.WeightedEdge::weight).sum();
    }

    static void testFindsCorrectMstForDefault6NodeWeightedGraph() {
        List<Boruvkas.WeightedEdge> edges = Arrays.asList(
            edge("A", "B", 4), edge("A", "C", 2), edge("B", "C", 1), edge("B", "D", 5),
            edge("C", "D", 8), edge("C", "E", 10), edge("D", "E", 2), edge("D", "F", 6), edge("E", "F", 3)
        );
        List<String> nodeIds = Arrays.asList("A", "B", "C", "D", "E", "F");
        List<Boruvkas.WeightedEdge> result = Boruvkas.boruvkasAlgorithm(edges, nodeIds);
        assert result.size() == 5;
        assert totalWeight(result) == 13;
    }

    static void testReturnsVMinus1EdgesForConnectedGraph() {
        List<Boruvkas.WeightedEdge> edges = Arrays.asList(
            edge("A", "B", 3), edge("A", "C", 1), edge("B", "C", 2)
        );
        List<Boruvkas.WeightedEdge> result = Boruvkas.boruvkasAlgorithm(edges, Arrays.asList("A", "B", "C"));
        assert result.size() == 2;
    }

    static void testEachComponentSelectsCheapestOutgoingEdge() {
        List<Boruvkas.WeightedEdge> edges = Arrays.asList(
            edge("A", "B", 1), edge("B", "C", 5), edge("A", "C", 3)
        );
        List<Boruvkas.WeightedEdge> result = Boruvkas.boruvkasAlgorithm(edges, Arrays.asList("A", "B", "C"));
        assert result.size() == 2;
        List<Integer> weights = new ArrayList<>();
        for (Boruvkas.WeightedEdge e : result) weights.add(e.weight());
        Collections.sort(weights);
        assert weights.get(0) == 1;
        assert weights.get(1) == 3;
    }

    static void testProducesMinimumTotalWeightSpanningTree() {
        List<Boruvkas.WeightedEdge> edges = Arrays.asList(
            edge("A", "B", 2), edge("B", "C", 3), edge("A", "C", 10)
        );
        List<Boruvkas.WeightedEdge> result = Boruvkas.boruvkasAlgorithm(edges, Arrays.asList("A", "B", "C"));
        assert totalWeight(result) == 5;
        assert result.size() == 2;
    }

    static void testHandlesTwoNodeGraph() {
        List<Boruvkas.WeightedEdge> edges = Arrays.asList(edge("A", "B", 6));
        List<Boruvkas.WeightedEdge> result = Boruvkas.boruvkasAlgorithm(edges, Arrays.asList("A", "B"));
        assert result.size() == 1;
        assert result.get(0).weight() == 6;
    }

    static void testHandlesLinearFourNodeChain() {
        List<Boruvkas.WeightedEdge> edges = Arrays.asList(
            edge("A", "B", 1), edge("B", "C", 2), edge("C", "D", 3)
        );
        List<Boruvkas.WeightedEdge> result = Boruvkas.boruvkasAlgorithm(edges, Arrays.asList("A", "B", "C", "D"));
        assert result.size() == 3;
        assert totalWeight(result) == 6;
    }

    static void testProducesSameTotalWeightAsKruskals() {
        List<Boruvkas.WeightedEdge> edges = Arrays.asList(
            edge("A", "B", 4), edge("A", "C", 2), edge("B", "C", 1), edge("B", "D", 5),
            edge("D", "E", 2), edge("E", "F", 3), edge("D", "F", 6)
        );
        List<String> nodeIds = Arrays.asList("A", "B", "C", "D", "E", "F");
        List<Boruvkas.WeightedEdge> result = Boruvkas.boruvkasAlgorithm(edges, nodeIds);
        assert result.size() == 5;
        assert totalWeight(result) == 13;
    }
}
