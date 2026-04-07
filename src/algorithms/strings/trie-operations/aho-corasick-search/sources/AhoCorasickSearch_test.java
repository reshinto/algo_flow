/** Correctness tests for the AhoCorasickSearch algorithm. */
import java.util.Arrays;
import java.util.List;

public class AhoCorasickSearch_test {
    public static void main(String[] args) {
        List<String> classic = AhoCorasickSearch.ahoCorasickSearch("ahishers",
                Arrays.asList("he", "she", "his", "hers"));
        List<String> classicSorted = new java.util.ArrayList<>(classic);
        classicSorted.sort(null);
        assert classicSorted.equals(Arrays.asList("he", "hers", "his", "she")) : "Classic example failed";

        List<String> noMatch = AhoCorasickSearch.ahoCorasickSearch("hello world",
                Arrays.asList("xyz", "abc"));
        assert noMatch.isEmpty();

        List<String> emptyPatterns = AhoCorasickSearch.ahoCorasickSearch("hello",
                Arrays.asList());
        assert emptyPatterns.isEmpty();

        List<String> emptyText = AhoCorasickSearch.ahoCorasickSearch("",
                Arrays.asList("hello", "world"));
        assert emptyText.isEmpty();

        List<String> nanResult = AhoCorasickSearch.ahoCorasickSearch("banana", Arrays.asList("nan"));
        assert nanResult.equals(Arrays.asList("nan"));

        List<String> deduped = AhoCorasickSearch.ahoCorasickSearch("aaaa", Arrays.asList("aa"));
        assert deduped.size() == 1 && deduped.contains("aa");

        List<String> catResult = AhoCorasickSearch.ahoCorasickSearch("cat",
                Arrays.asList("cat", "dog", "bird"));
        assert catResult.equals(Arrays.asList("cat"));

        List<String> caseResult = AhoCorasickSearch.ahoCorasickSearch("Hello", Arrays.asList("hello"));
        assert caseResult.isEmpty();

        System.out.println("All tests passed!");
    }
}
