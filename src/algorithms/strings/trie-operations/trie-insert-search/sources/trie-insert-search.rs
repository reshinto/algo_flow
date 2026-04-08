// Trie Insert and Search
// Inserts a list of words into a trie then checks if a target word exists as a full word.
// Time: O(m) per operation where m = word length
// Space: O(n * m) total for n words of average length m

use std::collections::HashMap;

struct TrieNodeIS {
    children: HashMap<char, TrieNodeIS>,
    is_end: bool,
}

impl TrieNodeIS {
    fn new() -> Self {
        TrieNodeIS { children: HashMap::new(), is_end: false } // @step:initialize
    }
}

fn trie_insert_search(words: &[&str], search: &str) -> bool {
    let mut root = TrieNodeIS::new(); // @step:initialize

    for word in words {
        // @step:visit
        let mut current = &mut root; // @step:visit
        for ch in word.chars() {
            // @step:insert-trie
            current = current.children.entry(ch).or_insert_with(TrieNodeIS::new); // @step:traverse-trie
        }
        current.is_end = true; // @step:mark-end-word
    }

    let mut current = &root; // @step:visit
    for ch in search.chars() {
        // @step:traverse-trie
        if let Some(child) = current.children.get(&ch) {
            current = child; // @step:traverse-trie
        } else {
            return false; // @step:traverse-trie
        }
    }

    current.is_end // @step:complete
}
