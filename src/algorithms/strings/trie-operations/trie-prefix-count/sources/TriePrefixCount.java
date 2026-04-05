// Trie Prefix Count
// Builds a trie from a list of words and counts how many words start with a given prefix.
// Each node stores a prefixCount incremented during insertion.
// Time: O(m) for prefix search, O(n * m) to build trie for n words of average length m
// Space: O(n * m) total node storage

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TriePrefixCount {

    private static class TrieNode { // @step:initialize
        Map<Character, TrieNode> children = new HashMap<>(); // @step:initialize
        int prefixCount = 0; // @step:initialize
        boolean isEnd = false; // @step:initialize
    }

    public static int triePrefixCount(List<String> words, String prefix) {
        TrieNode root = new TrieNode(); // @step:initialize

        for (String word : words) { // @step:visit
            TrieNode current = root; // @step:visit
            for (char ch : word.toCharArray()) { // @step:insert-trie
                current.children.putIfAbsent(ch, new TrieNode()); // @step:insert-trie
                current = current.children.get(ch); // @step:traverse-trie
                current.prefixCount++; // @step:insert-trie
            }
            current.isEnd = true; // @step:mark-end-word
        }

        TrieNode current = root; // @step:visit
        for (char ch : prefix.toCharArray()) { // @step:traverse-trie
            if (!current.children.containsKey(ch)) { // @step:traverse-trie
                return 0; // @step:traverse-trie
            }
            current = current.children.get(ch); // @step:traverse-trie
        }

        return current.prefixCount; // @step:complete
    }
}
