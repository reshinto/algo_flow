// Huffman Coding Tree — build optimal prefix-free encoding from character frequencies
use std::collections::HashMap;

struct HuffmanNode {
    freq: i32,
    char_val: Option<char>,
    left: Option<Box<HuffmanNode>>,
    right: Option<Box<HuffmanNode>>,
}

impl HuffmanNode {
    fn leaf(ch: char, freq: i32) -> Self {
        HuffmanNode { freq, char_val: Some(ch), left: None, right: None }
    }

    fn internal(freq: i32, left: Box<HuffmanNode>, right: Box<HuffmanNode>) -> Self {
        HuffmanNode { freq, char_val: None, left: Some(left), right: Some(right) }
    }
}

fn generate_codes(node: &Option<Box<HuffmanNode>>, code: String, encodings: &mut HashMap<char, String>) {
    let node = match node {
        None => return,
        Some(n) => n,
    };
    if let Some(ch) = node.char_val {
        encodings.insert(ch, if code.is_empty() { "0".to_string() } else { code }); // @step:encode-char
        return;
    }
    generate_codes(&node.left, format!("{}0", code), encodings);  // @step:traverse-left
    generate_codes(&node.right, format!("{}1", code), encodings); // @step:traverse-right
}

fn huffman_coding_tree(frequencies: &[(char, i32)]) -> HashMap<char, String> {
    let mut min_heap: Vec<Box<HuffmanNode>> = frequencies
        .iter()
        .map(|&(ch, freq)| Box::new(HuffmanNode::leaf(ch, freq)))
        .collect(); // @step:initialize

    // Sort ascending to simulate a min-heap
    min_heap.sort_by_key(|node| node.freq); // @step:select-min-freq

    while min_heap.len() > 1 {
        // Extract two minimums
        let left_node = min_heap.remove(0);  // @step:select-min-freq
        let right_node = min_heap.remove(0); // @step:select-min-freq

        // Merge into a new internal node
        let merged_freq = left_node.freq + right_node.freq;
        let merged = Box::new(HuffmanNode::internal(merged_freq, left_node, right_node)); // @step:build-node

        // Re-insert maintaining sorted order
        let insert_pos = min_heap.iter().position(|node| node.freq > merged_freq).unwrap_or(min_heap.len());
        min_heap.insert(insert_pos, merged); // @step:build-node
    }

    let huffman_root = min_heap.into_iter().next();
    let mut encodings = HashMap::new();
    generate_codes(&huffman_root, String::new(), &mut encodings);
    encodings // @step:complete
}
