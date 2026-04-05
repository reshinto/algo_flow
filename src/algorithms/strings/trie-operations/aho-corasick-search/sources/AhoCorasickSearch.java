// Aho-Corasick Search
// Multi-pattern string search using a trie augmented with failure links.
// Phase 1: Insert all patterns into a trie.
// Phase 2: Build failure links via BFS (similar to KMP failure function but for a trie).
// Phase 3: Scan text once, following failure links on mismatch, collecting all pattern matches.
// Time: O(n + m + z) where n = text length, m = total pattern chars, z = match count
// Space: O(m * k) where k = alphabet size

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public class AhoCorasickSearch {

    private static class AhoCorasickNode { // @step:initialize
        Map<Character, AhoCorasickNode> children = new HashMap<>(); // @step:initialize
        AhoCorasickNode failureLink = null; // @step:initialize
        List<String> outputPatterns = new ArrayList<>(); // @step:initialize
        boolean isEnd = false; // @step:initialize
    }

    public static List<String> ahoCorasickSearch(String text, List<String> patterns) {
        AhoCorasickNode root = new AhoCorasickNode(); // @step:initialize

        // Phase 1: Insert all patterns into the trie
        for (String pattern : patterns) { // @step:visit
            AhoCorasickNode current = root; // @step:visit
            for (char ch : pattern.toCharArray()) { // @step:insert-trie
                current.children.putIfAbsent(ch, new AhoCorasickNode()); // @step:insert-trie
                current = current.children.get(ch); // @step:traverse-trie
            }
            current.isEnd = true; // @step:mark-end-word
            current.outputPatterns.add(pattern); // @step:mark-end-word
        }

        // Phase 2: Build failure links via BFS
        Queue<AhoCorasickNode> bfsQueue = new ArrayDeque<>(); // @step:buildFailureLinks

        for (AhoCorasickNode child : root.children.values()) { // @step:buildFailureLinks
            child.failureLink = root; // @step:buildFailureLinks
            bfsQueue.add(child); // @step:buildFailureLinks
        }

        while (!bfsQueue.isEmpty()) { // @step:buildFailureLinks
            AhoCorasickNode current = bfsQueue.poll(); // @step:buildFailureLinks

            for (Map.Entry<Character, AhoCorasickNode> entry : current.children.entrySet()) { // @step:buildFailureLinks
                char ch = entry.getKey(); // @step:buildFailureLinks
                AhoCorasickNode childNode = entry.getValue(); // @step:buildFailureLinks
                AhoCorasickNode failureState = current.failureLink; // @step:buildFailureLinks

                while (failureState != null && !failureState.children.containsKey(ch)) { // @step:buildFailureLinks
                    failureState = failureState.failureLink; // @step:buildFailureLinks
                }

                if (failureState != null) { // @step:buildFailureLinks
                    AhoCorasickNode candidate = failureState.children.get(ch); // @step:buildFailureLinks
                    childNode.failureLink = (candidate != null) ? candidate : root; // @step:buildFailureLinks
                } else { // @step:buildFailureLinks
                    childNode.failureLink = root; // @step:buildFailureLinks
                }

                if (childNode.failureLink == childNode) { // @step:buildFailureLinks
                    childNode.failureLink = root; // @step:buildFailureLinks
                }

                // Propagate output patterns from failure link
                for (String outputPattern : childNode.failureLink.outputPatterns) { // @step:buildFailureLinks
                    if (!childNode.outputPatterns.contains(outputPattern)) { // @step:buildFailureLinks
                        childNode.outputPatterns.add(outputPattern); // @step:buildFailureLinks
                    }
                }

                bfsQueue.add(childNode); // @step:buildFailureLinks
            }
        }

        // Phase 3: Search text using the automaton
        Set<String> foundPatterns = new HashSet<>(); // @step:traverse-trie
        AhoCorasickNode current = root; // @step:traverse-trie

        for (char ch : text.toCharArray()) { // @step:traverse-trie
            while (current != root && !current.children.containsKey(ch)) { // @step:traverse-trie
                current = current.failureLink; // @step:traverse-trie
            }

            if (current.children.containsKey(ch)) { // @step:traverse-trie
                current = current.children.get(ch); // @step:traverse-trie
            }

            for (String matchedPattern : current.outputPatterns) { // @step:found
                foundPatterns.add(matchedPattern); // @step:found
            }
        }

        return new ArrayList<>(foundPatterns); // @step:complete
    }
}
