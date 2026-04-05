// Longest Word in Trie
// Builds a trie from a list of words, then finds the longest word where every prefix is also a word.
// Uses DFS traversal, only following nodes marked as isEnd.
// Time: O(n*m) where n = number of words, m = average word length
// Space: O(n*m) for storing all nodes in the trie

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LongestWordInTrie {

    private static class TrieNode { // @step:initialize
        Map<Character, TrieNode> children = new HashMap<>(); // @step:initialize
        boolean isEnd = false; // @step:initialize
    }

    public static String longestWordInTrie(List<String> words) {
        TrieNode root = new TrieNode(); // @step:initialize

        for (String word : words) { // @step:visit
            TrieNode current = root; // @step:visit
            for (char ch : word.toCharArray()) { // @step:insert-trie
                current.children.putIfAbsent(ch, new TrieNode()); // @step:insert-trie
                current = current.children.get(ch); // @step:traverse-trie
            }
            current.isEnd = true; // @step:mark-end-word
        }

        String longestWord = ""; // @step:visit

        // DFS stack holds Object[] pairs of [TrieNode, String currentWord]
        Deque<Object[]> dfsStack = new ArrayDeque<>(); // @step:visit
        dfsStack.push(new Object[]{root, ""}); // @step:visit

        while (!dfsStack.isEmpty()) { // @step:traverse-trie
            Object[] entry = dfsStack.pop(); // @step:traverse-trie
            TrieNode currentNode = (TrieNode) entry[0]; // @step:traverse-trie
            String currentWord = (String) entry[1]; // @step:traverse-trie

            for (Map.Entry<Character, TrieNode> childEntry : currentNode.children.entrySet()) { // @step:traverse-trie
                char ch = childEntry.getKey(); // @step:traverse-trie
                TrieNode childNode = childEntry.getValue(); // @step:traverse-trie
                if (childNode.isEnd) { // @step:traverse-trie
                    String nextWord = currentWord + ch; // @step:traverse-trie
                    if (nextWord.length() > longestWord.length()
                            || (nextWord.length() == longestWord.length() && nextWord.compareTo(longestWord) < 0)) {
                        longestWord = nextWord; // @step:found
                    }
                    dfsStack.push(new Object[]{childNode, nextWord}); // @step:traverse-trie
                }
            }
        }

        return longestWord; // @step:complete
    }
}
