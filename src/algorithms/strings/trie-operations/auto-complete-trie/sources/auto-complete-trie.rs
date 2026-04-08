// Auto-Complete with Trie
// Builds a trie from a word list, then returns all words that start with the given prefix.
// Time: O(m + k) where m = prefix length, k = total characters in all result words
// Space: O(n * m) for n words of average length m

use std::collections::HashMap;

struct TrieNode {
    children: HashMap<char, TrieNode>,
    is_end: bool,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode { children: HashMap::new(), is_end: false } // @step:initialize
    }
}

fn collect_words(node: &TrieNode, current_prefix: String, results: &mut Vec<String>) {
    if node.is_end {
        // @step:add-to-result
        results.push(current_prefix.clone()); // @step:add-to-result
    }
    for (&ch, child) in &node.children {
        // @step:traverse-trie
        collect_words(child, format!("{}{}", current_prefix, ch), results); // @step:traverse-trie
    }
}

fn auto_complete_trie(words: &[&str], prefix: &str) -> Vec<String> {
    let mut root = TrieNode::new(); // @step:initialize

    for word in words {
        // @step:visit
        let mut current = &mut root; // @step:visit
        for ch in word.chars() {
            // @step:insert-trie
            current = current.children.entry(ch).or_insert_with(TrieNode::new); // @step:traverse-trie
        }
        current.is_end = true; // @step:mark-end-word
    }

    let mut prefix_node = &root; // @step:visit
    for ch in prefix.chars() {
        // @step:traverse-trie
        if let Some(child) = prefix_node.children.get(&ch) {
            prefix_node = child; // @step:traverse-trie
        } else {
            return vec![]; // @step:traverse-trie
        }
    }

    let mut results = Vec::new();
    collect_words(prefix_node, prefix.to_string(), &mut results); // @step:add-to-result
    results // @step:complete
}
