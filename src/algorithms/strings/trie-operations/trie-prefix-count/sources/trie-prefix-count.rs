// Trie Prefix Count
// Builds a trie from a list of words and counts how many words start with a given prefix.
// Each node stores a prefixCount incremented during insertion.
// Time: O(m) for prefix search, O(n * m) to build trie for n words of average length m
// Space: O(n * m) total node storage

use std::collections::HashMap;

struct TrieNodePC {
    children: HashMap<char, TrieNodePC>,
    prefix_count: usize,
    is_end: bool,
}

impl TrieNodePC {
    fn new() -> Self {
        TrieNodePC { children: HashMap::new(), prefix_count: 0, is_end: false } // @step:initialize
    }
}

fn trie_prefix_count(words: &[&str], prefix: &str) -> usize {
    let mut root = TrieNodePC::new(); // @step:initialize

    for word in words {
        // @step:visit
        let mut current = &mut root; // @step:visit
        for ch in word.chars() {
            // @step:insert-trie
            current = current.children.entry(ch).or_insert_with(TrieNodePC::new); // @step:traverse-trie
            current.prefix_count += 1; // @step:insert-trie
        }
        current.is_end = true; // @step:mark-end-word
    }

    let mut current = &root; // @step:visit
    for ch in prefix.chars() {
        // @step:traverse-trie
        if let Some(child) = current.children.get(&ch) {
            current = child; // @step:traverse-trie
        } else {
            return 0; // @step:traverse-trie
        }
    }

    current.prefix_count // @step:complete
}
