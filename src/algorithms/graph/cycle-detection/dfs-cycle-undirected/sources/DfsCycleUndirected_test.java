import java.util.*;

// Compile: javac DfsCycleUndirected.java DfsCycleUndirected_test.java
// Run:     java -ea DfsCycleUndirected_test
public class DfsCycleUndirected_test {
    public static void main(String[] args) {
        assert DfsCycleUndirected.dfsCycleUndirected(
            map("A", list("B", "C"), "B", list("A", "C"), "C", list("B", "A")), list("A", "B", "C"));
        assert !DfsCycleUndirected.dfsCycleUndirected(
            map("A", list("B", "C"), "B", list("A", "D"), "C", list("A"), "D", list("B")),
            list("A", "B", "C", "D"));
        assert !DfsCycleUndirected.dfsCycleUndirected(map("A", list()), list("A"));
        assert !DfsCycleUndirected.dfsCycleUndirected(map("A", list(), "B", list()), list("A", "B"));
        assert DfsCycleUndirected.dfsCycleUndirected(
            map("A", list("B", "D"), "B", list("A", "C"), "C", list("B", "D"),
                "D", list("C", "A", "E"), "E", list("D")),
            list("A", "B", "C", "D", "E"));
        assert !DfsCycleUndirected.dfsCycleUndirected(
            map("A", list("B"), "B", list("A", "C"), "C", list("B", "D"), "D", list("C")),
            list("A", "B", "C", "D"));
        assert DfsCycleUndirected.dfsCycleUndirected(
            map("A", list("B"), "B", list("A"),
                "C", list("D", "E"), "D", list("C", "E"), "E", list("C", "D")),
            list("A", "B", "C", "D", "E"));
        assert !DfsCycleUndirected.dfsCycleUndirected(
            map("A", list("B"), "B", list("A")), list("A", "B"));
        System.out.println("All tests passed!");
    }

    static Map<String, List<String>> map(Object... keyValues) {
        Map<String, List<String>> result = new LinkedHashMap<>();
        for (int idx = 0; idx < keyValues.length; idx += 2) {
            result.put((String) keyValues[idx], (List<String>) keyValues[idx + 1]);
        }
        return result;
    }

    static List<String> list(String... values) {
        return Arrays.asList(values);
    }
}
