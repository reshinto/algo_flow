// Trie Insert and Search
// Inserts a list of words into a trie then checks if a target word exists as a full word.
// Time: O(m) per operation where m = word length
// Space: O(n * m) total for n words of average length m

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TrieInsertSearch {

    private static class TrieNode { // @step:initialize
        Map<Character, TrieNode> children = new HashMap<>(); // @step:initialize
        boolean isEnd = false; // @step:initialize
    }

    public static boolean trieInsertSearch(List<String> words, String search) {
        TrieNode root = new TrieNode(); // @step:initialize

        for (String word : words) { // @step:visit
            TrieNode current = root; // @step:visit
            for (char ch : word.toCharArray()) { // @step:insert-trie
                current.children.putIfAbsent(ch, new TrieNode()); // @step:insert-trie
                current = current.children.get(ch); // @step:traverse-trie
            }
            current.isEnd = true; // @step:mark-end-word
        }

        TrieNode current = root; // @step:visit
        for (char ch : search.toCharArray()) { // @step:traverse-trie
            if (!current.children.containsKey(ch)) { // @step:traverse-trie
                return false; // @step:traverse-trie
            }
            current = current.children.get(ch); // @step:traverse-trie
        }

        return current.isEnd; // @step:complete
    }
}
