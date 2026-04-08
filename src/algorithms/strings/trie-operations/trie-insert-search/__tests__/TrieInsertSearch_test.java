/** Correctness tests for the TrieInsertSearch algorithm. */
import java.util.Arrays;
import java.util.List;

public class TrieInsertSearch_test {
    public static void main(String[] args) {
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("apple", "app"), "app") == true;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("apple"), "ap") == false;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("apple", "app"), "apple") == true;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("apple", "app", "apricot"), "banana") == false;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList(), "app") == false;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("hello"), "hello") == true;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("app"), "apple") == false;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("cat", "dog", "bird"), "dog") == true;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("cat", "dog", "bird"), "fox") == false;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("apple", "apple"), "apple") == true;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("a", "b", "c"), "b") == true;
        assert TrieInsertSearch.trieInsertSearch(Arrays.asList("apple", "app"), "") == false;
        System.out.println("All tests passed!");
    }
}
