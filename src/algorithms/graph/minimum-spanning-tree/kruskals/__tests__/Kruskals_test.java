import java.util.*;

// Compile: javac Kruskals.java Kruskals_test.java
// Run:     java -ea Kruskals_test
public class Kruskals_test {
    public static void main(String[] args) {
        testFindsCorrectMstForDefault6NodeWeightedGraph();
        testReturnsVMinus1EdgesForConnectedGraph();
        testSelectsEdgesInAscendingWeightOrder();
        testRejectsEdgesThatWouldFormCycle();
        testHandlesTwoNodeGraphWithSingleEdge();
        testHandlesLinearChainGraphCorrectly();
        testProducesMstWithMinimumTotalWeight();
        System.out.println("All tests passed!");
    }

    static Kruskals.WeightedEdge edge(String source, String target, int weight) {
        return new Kruskals.WeightedEdge(source, target, weight);
    }

    static int totalWeight(List<Kruskals.WeightedEdge> edges) {
        return edges.stream().mapToInt(Kruskals.WeightedEdge::weight).sum();
    }

    static void testFindsCorrectMstForDefault6NodeWeightedGraph() {
        List<Kruskals.WeightedEdge> edges = Arrays.asList(
            edge("A","B",4), edge("A","C",2), edge("B","C",1), edge("B","D",5),
            edge("C","D",8), edge("C","E",10), edge("D","E",2), edge("D","F",6), edge("E","F",3)
        );
        List<Kruskals.WeightedEdge> result = Kruskals.kruskalsAlgorithm(edges, Arrays.asList("A","B","C","D","E","F"));
        assert result.size() == 5;
        assert totalWeight(result) == 13;
    }

    static void testReturnsVMinus1EdgesForConnectedGraph() {
        List<Kruskals.WeightedEdge> edges = Arrays.asList(
            edge("A","B",3), edge("A","C",1), edge("B","C",2)
        );
        List<Kruskals.WeightedEdge> result = Kruskals.kruskalsAlgorithm(edges, Arrays.asList("A","B","C"));
        assert result.size() == 2;
    }

    static void testSelectsEdgesInAscendingWeightOrder() {
        List<Kruskals.WeightedEdge> edges = Arrays.asList(
            edge("A","B",10), edge("B","C",1), edge("A","C",5)
        );
        List<Kruskals.WeightedEdge> result = Kruskals.kruskalsAlgorithm(edges, Arrays.asList("A","B","C"));
        assert result.size() == 2;
        List<Integer> weights = new ArrayList<>();
        for (Kruskals.WeightedEdge e : result) weights.add(e.weight());
        Collections.sort(weights);
        assert weights.get(0) == 1;
        assert weights.get(1) == 5;
    }

    static void testRejectsEdgesThatWouldFormCycle() {
        List<Kruskals.WeightedEdge> edges = Arrays.asList(
            edge("A","B",1), edge("B","C",2), edge("A","C",3)
        );
        List<Kruskals.WeightedEdge> result = Kruskals.kruskalsAlgorithm(edges, Arrays.asList("A","B","C"));
        assert result.size() == 2;
        assert totalWeight(result) == 3;
    }

    static void testHandlesTwoNodeGraphWithSingleEdge() {
        List<Kruskals.WeightedEdge> edges = Arrays.asList(edge("A","B",7));
        List<Kruskals.WeightedEdge> result = Kruskals.kruskalsAlgorithm(edges, Arrays.asList("A","B"));
        assert result.size() == 1;
        assert result.get(0).weight() == 7;
    }

    static void testHandlesLinearChainGraphCorrectly() {
        List<Kruskals.WeightedEdge> edges = Arrays.asList(
            edge("A","B",2), edge("B","C",4), edge("C","D",1)
        );
        List<Kruskals.WeightedEdge> result = Kruskals.kruskalsAlgorithm(edges, Arrays.asList("A","B","C","D"));
        assert result.size() == 3;
        assert totalWeight(result) == 7;
    }

    static void testProducesMstWithMinimumTotalWeight() {
        List<Kruskals.WeightedEdge> edges = Arrays.asList(
            edge("A","B",1), edge("B","C",1), edge("C","D",1), edge("D","A",1), edge("A","C",10)
        );
        List<Kruskals.WeightedEdge> result = Kruskals.kruskalsAlgorithm(edges, Arrays.asList("A","B","C","D"));
        assert result.size() == 3;
        assert totalWeight(result) == 3;
    }
}
