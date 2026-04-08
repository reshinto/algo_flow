/** Correctness tests for the AutoCompleteTrie algorithm. */
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class AutoCompleteTrie_test {
    public static void main(String[] args) {
        List<String> result1 = AutoCompleteTrie.autoCompleteTrie(
                Arrays.asList("apple", "app", "apricot", "banana", "bat"), "ap");
        List<String> sorted1 = new ArrayList<>(result1);
        Collections.sort(sorted1);
        assert sorted1.equals(Arrays.asList("app", "apple", "apricot")) : "Got: " + sorted1;

        List<String> singleMatch = AutoCompleteTrie.autoCompleteTrie(
                Arrays.asList("apple", "banana", "cherry"), "ban");
        assert singleMatch.equals(Arrays.asList("banana"));

        List<String> noMatch = AutoCompleteTrie.autoCompleteTrie(
                Arrays.asList("apple", "app", "apricot"), "ba");
        assert noMatch.isEmpty();

        List<String> emptyList = AutoCompleteTrie.autoCompleteTrie(Arrays.asList(), "ap");
        assert emptyList.isEmpty();

        List<String> prefixWord = AutoCompleteTrie.autoCompleteTrie(
                Arrays.asList("apple", "app", "apricot"), "app");
        List<String> sortedPW = new ArrayList<>(prefixWord);
        Collections.sort(sortedPW);
        assert sortedPW.equals(Arrays.asList("app", "apple")) : "Got: " + sortedPW;

        List<String> helloResult = AutoCompleteTrie.autoCompleteTrie(
                Arrays.asList("hello"), "hel");
        assert helloResult.equals(Arrays.asList("hello"));

        List<String> worldResult = AutoCompleteTrie.autoCompleteTrie(
                Arrays.asList("hello"), "world");
        assert worldResult.isEmpty();

        System.out.println("All tests passed!");
    }
}
