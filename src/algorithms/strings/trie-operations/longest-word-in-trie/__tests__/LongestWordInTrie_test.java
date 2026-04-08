/** Correctness tests for the LongestWordInTrie algorithm. */
import java.util.Arrays;
import java.util.List;

public class LongestWordInTrie_test {
    public static void main(String[] args) {
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("w", "wo", "wor", "worl", "world")).equals("world");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList()).equals("");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("a")).equals("a");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("world")).equals("");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("a", "ap", "app", "appl", "apple")).equals("apple");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("b", "ba", "c", "ca")).equals("ba");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("d", "dog")).equals("d");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("abc", "def", "ghi")).equals("");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("a", "ab", "abc", "x", "xy")).equals("abc");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("a", "a", "ab", "ab")).equals("ab");
        assert LongestWordInTrie.longestWordInTrie(Arrays.asList("b", "c")).equals("b");
        System.out.println("All tests passed!");
    }
}
