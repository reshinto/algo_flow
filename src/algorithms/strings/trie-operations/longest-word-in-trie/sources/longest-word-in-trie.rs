// Longest Word in Trie
// Builds a trie from a list of words, then finds the longest word where every prefix is also a word.
// Uses DFS traversal, only following nodes marked as isEnd.
// Time: O(n*m) where n = number of words, m = average word length
// Space: O(n*m) for storing all nodes in the trie

use std::collections::HashMap;

struct TrieNodeLW {
    children: HashMap<char, TrieNodeLW>,
    is_end: bool,
}

impl TrieNodeLW {
    fn new() -> Self {
        TrieNodeLW { children: HashMap::new(), is_end: false } // @step:initialize
    }
}

fn longest_word_in_trie(words: &[&str]) -> String {
    let mut root = TrieNodeLW::new(); // @step:initialize

    for word in words {
        // @step:visit
        let mut current = &mut root; // @step:visit
        for ch in word.chars() {
            // @step:insert-trie
            current = current.children.entry(ch).or_insert_with(TrieNodeLW::new); // @step:traverse-trie
        }
        current.is_end = true; // @step:mark-end-word
    }

    let mut longest_word = String::new(); // @step:visit

    // DFS stack holds (node reference path tracked via word string, current word built)
    // Since we can't easily store node refs on a stack in Rust, use iterative DFS with indices
    // Represent stack entries as (word built so far) and traverse root's children
    let mut dfs_stack: Vec<(char, String)> = root
        .children
        .iter()
        .filter(|(_, child)| child.is_end)
        .map(|(&ch, _)| (ch, String::from(ch)))
        .collect(); // @step:visit

    // Full DFS using root reference directly
    fn dfs(node: &TrieNodeLW, current_word: &str, longest_word: &mut String) {
        // @step:traverse-trie
        for (&ch, child_node) in &node.children {
            // @step:traverse-trie
            if child_node.is_end {
                // @step:traverse-trie
                let next_word = format!("{}{}", current_word, ch); // @step:traverse-trie
                if next_word.len() > longest_word.len()
                    || (next_word.len() == longest_word.len() && next_word < *longest_word)
                {
                    *longest_word = next_word.clone(); // @step:found
                }
                dfs(child_node, &next_word, longest_word); // @step:traverse-trie
            }
        }
    }

    let _ = dfs_stack; // suppress unused warning
    dfs(&root, "", &mut longest_word);

    longest_word // @step:complete
}
