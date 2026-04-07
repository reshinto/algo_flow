import java.util.*;

// Compile: javac UnionFindCycle.java UnionFindCycle_test.java
// Run:     java -ea UnionFindCycle_test
public class UnionFindCycle_test {
    public static void main(String[] args) {
        assert UnionFindCycle.unionFindCycle(edges("A", "B", "B", "C", "C", "A"), list("A", "B", "C"));
        assert !UnionFindCycle.unionFindCycle(edges("A", "B", "A", "C", "B", "D"), list("A", "B", "C", "D"));
        assert !UnionFindCycle.unionFindCycle(Collections.emptyList(), list("A", "B", "C"));
        assert !UnionFindCycle.unionFindCycle(Collections.emptyList(), list("A"));
        assert UnionFindCycle.unionFindCycle(
            edges("A", "B", "B", "C", "C", "D", "D", "A", "D", "E"),
            list("A", "B", "C", "D", "E"));
        assert !UnionFindCycle.unionFindCycle(
            edges("A", "B", "B", "C", "C", "D"), list("A", "B", "C", "D"));
        assert UnionFindCycle.unionFindCycle(
            edges("A", "B", "B", "C", "C", "D", "D", "E", "E", "A"),
            list("A", "B", "C", "D", "E"));
        assert !UnionFindCycle.unionFindCycle(
            edges("A", "B", "A", "C", "A", "D", "A", "E"),
            list("A", "B", "C", "D", "E"));
        assert UnionFindCycle.unionFindCycle(
            edges("A", "B", "C", "D", "D", "E", "E", "C"),
            list("A", "B", "C", "D", "E"));
        System.out.println("All tests passed!");
    }

    static List<Map<String, String>> edges(String... pairs) {
        List<Map<String, String>> result = new ArrayList<>();
        for (int idx = 0; idx < pairs.length; idx += 2) {
            Map<String, String> edge = new HashMap<>();
            edge.put("source", pairs[idx]);
            edge.put("target", pairs[idx + 1]);
            result.add(edge);
        }
        return result;
    }

    static List<String> list(String... values) {
        return Arrays.asList(values);
    }
}
