import java.util.*;

// Compile: javac DfsCycleDirected.java DfsCycleDirected_test.java
// Run:     java -ea DfsCycleDirected_test
public class DfsCycleDirected_test {
    public static void main(String[] args) {
        assert DfsCycleDirected.dfsCycleDirected(
            map("A", list("B"), "B", list("C"), "C", list("A")), list("A", "B", "C"));
        assert !DfsCycleDirected.dfsCycleDirected(
            map("A", list("B", "C"), "B", list("D"), "C", list("D"), "D", list()), list("A", "B", "C", "D"));
        assert DfsCycleDirected.dfsCycleDirected(
            map("A", list("A"), "B", list()), list("A", "B"));
        assert !DfsCycleDirected.dfsCycleDirected(map("A", list()), list("A"));
        assert DfsCycleDirected.dfsCycleDirected(
            map("A", list("B"), "B", list("C"), "C", list("D"), "D", list("B"), "E", list("A")),
            list("A", "B", "C", "D", "E"));
        assert !DfsCycleDirected.dfsCycleDirected(
            map("A", list("B"), "B", list("C"), "C", list("D"), "D", list()), list("A", "B", "C", "D"));
        assert !DfsCycleDirected.dfsCycleDirected(
            map("A", list("B"), "B", list(), "C", list("D"), "D", list()), list("A", "B", "C", "D"));
        assert DfsCycleDirected.dfsCycleDirected(
            map("A", list("B"), "B", list(), "C", list("D"), "D", list("C")), list("A", "B", "C", "D"));
        assert !DfsCycleDirected.dfsCycleDirected(
            map("A", list("B", "C"), "B", list("D"), "C", list("D"), "D", list()), list("A", "B", "C", "D"));
        System.out.println("All tests passed!");
    }

    static Map<String, List<String>> map(Object... keyValues) {
        Map<String, List<String>> result = new LinkedHashMap<>();
        for (int idx = 0; idx < keyValues.length; idx += 2) {
            result.put((String) keyValues[idx], (List<String>) keyValues[idx + 1]);
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    static List<String> list(String... values) {
        return Arrays.asList(values);
    }
}
