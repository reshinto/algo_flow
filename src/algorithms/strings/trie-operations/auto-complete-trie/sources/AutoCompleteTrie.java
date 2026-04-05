// Auto-Complete with Trie
// Builds a trie from a word list, then returns all words that start with the given prefix.
// Time: O(m + k) where m = prefix length, k = total characters in all result words
// Space: O(n * m) for n words of average length m

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AutoCompleteTrie {

    private static class TrieNode { // @step:initialize
        Map<Character, TrieNode> children = new HashMap<>(); // @step:initialize
        boolean isEnd = false; // @step:initialize
    }

    private static void collectWords(
        TrieNode node,
        StringBuilder currentPrefix,
        List<String> results
    ) {
        if (node.isEnd) { // @step:add-to-result
            results.add(currentPrefix.toString()); // @step:add-to-result
        }
        for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) { // @step:traverse-trie
            currentPrefix.append(entry.getKey()); // @step:traverse-trie
            collectWords(entry.getValue(), currentPrefix, results); // @step:traverse-trie
            currentPrefix.deleteCharAt(currentPrefix.length() - 1); // @step:traverse-trie
        }
    }

    public static List<String> autoCompleteTrie(List<String> words, String prefix) {
        TrieNode root = new TrieNode(); // @step:initialize

        for (String word : words) { // @step:visit
            TrieNode current = root; // @step:visit
            for (char ch : word.toCharArray()) { // @step:insert-trie
                current.children.putIfAbsent(ch, new TrieNode()); // @step:insert-trie
                current = current.children.get(ch); // @step:traverse-trie
            }
            current.isEnd = true; // @step:mark-end-word
        }

        TrieNode prefixNode = root; // @step:visit
        for (char ch : prefix.toCharArray()) { // @step:traverse-trie
            if (!prefixNode.children.containsKey(ch)) { // @step:traverse-trie
                return new ArrayList<>(); // @step:traverse-trie
            }
            prefixNode = prefixNode.children.get(ch); // @step:traverse-trie
        }

        List<String> results = new ArrayList<>();
        collectWords(prefixNode, new StringBuilder(prefix), results); // @step:add-to-result
        return results; // @step:complete
    }
}
