/** Correctness tests for the TriePrefixCount algorithm. */
import java.util.Arrays;
import java.util.List;

public class TriePrefixCount_test {
    public static void main(String[] args) {
        assert TriePrefixCount.triePrefixCount(Arrays.asList("apple", "app", "apricot", "ape"), "ap") == 4;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("hello"), "he") == 1;
        assert TriePrefixCount.triePrefixCount(Arrays.asList(), "a") == 0;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("apple", "app", "apricot"), "banana") == 0;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("apple", "app", "apricot", "ape"), "apple") == 1;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("app", "apple", "application"), "app") == 3;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("app"), "application") == 0;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("apple", "apple"), "ap") == 2;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("apple", "ant", "ace"), "a") == 3;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("cat", "dog", "bird"), "c") == 1;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("apple", "app"), "") == 0;
        assert TriePrefixCount.triePrefixCount(Arrays.asList("a", "ab", "abc", "abcd"), "ab") == 3;
        System.out.println("All tests passed!");
    }
}
