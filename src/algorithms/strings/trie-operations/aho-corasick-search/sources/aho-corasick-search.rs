// Aho-Corasick Search
// Multi-pattern string search using a trie augmented with failure links.
// Phase 1: Insert all patterns into a trie.
// Phase 2: Build failure links via BFS (similar to KMP failure function but for a trie).
// Phase 3: Scan text once, following failure links on mismatch, collecting all pattern matches.
// Time: O(n + m + z) where n = text length, m = total pattern chars, z = match count
// Space: O(m * k) where k = alphabet size

use std::collections::{HashMap, HashSet, VecDeque};

struct AhoCorasickNode {
    children: HashMap<char, usize>,
    failure_link: Option<usize>,
    output_patterns: Vec<String>,
    is_end: bool,
}

impl AhoCorasickNode {
    fn new() -> Self {
        // @step:initialize
        AhoCorasickNode {
            children: HashMap::new(),
            failure_link: None,
            output_patterns: Vec::new(),
            is_end: false,
        } // @step:initialize
    }
}

fn aho_corasick_search(text: &str, patterns: &[&str]) -> Vec<String> {
    let mut nodes: Vec<AhoCorasickNode> = vec![AhoCorasickNode::new()];
    let root = 0usize;
    let _ = root; // @step:initialize

    // Phase 1: Insert all patterns into the trie
    for pattern in patterns {
        // @step:visit
        let mut current = 0usize; // @step:visit
        for ch in pattern.chars() {
            // @step:insert-trie
            if !nodes[current].children.contains_key(&ch) {
                // @step:insert-trie
                let new_idx = nodes.len();
                nodes.push(AhoCorasickNode::new());
                nodes[current].children.insert(ch, new_idx); // @step:insert-trie
            }
            current = *nodes[current].children.get(&ch).unwrap(); // @step:traverse-trie
        }
        nodes[current].is_end = true; // @step:mark-end-word
        nodes[current].output_patterns.push(pattern.to_string()); // @step:mark-end-word
    }

    // Phase 2: Build failure links via BFS
    let mut bfs_queue: VecDeque<usize> = VecDeque::new(); // @step:buildFailureLinks

    let root_children: Vec<usize> = nodes[0].children.values().copied().collect();
    for child_idx in root_children {
        // @step:buildFailureLinks
        nodes[child_idx].failure_link = Some(0); // @step:buildFailureLinks
        bfs_queue.push_back(child_idx); // @step:buildFailureLinks
    }

    while let Some(current_idx) = bfs_queue.pop_front() {
        // @step:buildFailureLinks
        let child_entries: Vec<(char, usize)> = nodes[current_idx]
            .children.iter().map(|(&ch, &idx)| (ch, idx)).collect();

        for (ch, child_idx) in child_entries {
            // @step:buildFailureLinks
            let mut failure_state = nodes[current_idx].failure_link; // @step:buildFailureLinks

            while let Some(failure_idx) = failure_state {
                // @step:buildFailureLinks
                if nodes[failure_idx].children.contains_key(&ch) {
                    break;
                }
                failure_state = nodes[failure_idx].failure_link; // @step:buildFailureLinks
            }

            let failure_child = if let Some(failure_idx) = failure_state {
                *nodes[failure_idx].children.get(&ch).unwrap_or(&0)
            } else {
                0
            };

            nodes[child_idx].failure_link = Some(if failure_child == child_idx { 0 } else { failure_child }); // @step:buildFailureLinks

            // Propagate output patterns from failure link
            let failure_link_idx = nodes[child_idx].failure_link.unwrap_or(0);
            let failure_outputs: Vec<String> = nodes[failure_link_idx].output_patterns.clone();
            for output_pattern in failure_outputs {
                // @step:buildFailureLinks
                if !nodes[child_idx].output_patterns.contains(&output_pattern) {
                    // @step:buildFailureLinks
                    nodes[child_idx].output_patterns.push(output_pattern); // @step:buildFailureLinks
                }
            }

            bfs_queue.push_back(child_idx); // @step:buildFailureLinks
        }
    }

    // Phase 3: Search text using the automaton
    let mut found_patterns: HashSet<String> = HashSet::new(); // @step:traverse-trie
    let mut current = 0usize; // @step:traverse-trie

    for ch in text.chars() {
        // @step:traverse-trie
        while current != 0 && !nodes[current].children.contains_key(&ch) {
            // @step:traverse-trie
            current = nodes[current].failure_link.unwrap_or(0); // @step:traverse-trie
        }

        if nodes[current].children.contains_key(&ch) {
            // @step:traverse-trie
            current = *nodes[current].children.get(&ch).unwrap(); // @step:traverse-trie
        }

        for matched_pattern in nodes[current].output_patterns.clone() {
            // @step:found
            found_patterns.insert(matched_pattern); // @step:found
        }
    }

    found_patterns.into_iter().collect() // @step:complete
}
