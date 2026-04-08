include!("sources/huffman-coding-tree.rs");

#[cfg(test)]
mod tests {
    use super::*;

    const DEFAULT_FREQS: &[(char, i32)] = &[
        ('a', 5), ('b', 9), ('c', 12), ('d', 13), ('e', 16), ('f', 45),
    ];

    #[test]
    fn test_produces_encodings_for_all_characters() {
        let result = huffman_coding_tree(DEFAULT_FREQS);
        for &(ch, _) in DEFAULT_FREQS {
            assert!(result.contains_key(&ch), "Missing encoding for {}", ch);
            assert!(!result[&ch].is_empty(), "Empty encoding for {}", ch);
        }
    }

    #[test]
    fn test_produces_valid_binary_strings() {
        let result = huffman_coding_tree(DEFAULT_FREQS);
        for (_, encoding) in &result {
            assert!(encoding.chars().all(|bit| bit == '0' || bit == '1'));
        }
    }

    #[test]
    fn test_most_frequent_gets_shortest_code() {
        let result = huffman_coding_tree(DEFAULT_FREQS);
        let f_len = result[&'f'].len();
        for (&ch, encoding) in &result {
            if ch != 'f' {
                assert!(f_len <= encoding.len());
            }
        }
    }

    #[test]
    fn test_all_codes_prefix_free() {
        let result = huffman_coding_tree(DEFAULT_FREQS);
        let codes: Vec<&String> = result.values().collect();
        for (idx_a, code_a) in codes.iter().enumerate() {
            for (idx_b, code_b) in codes.iter().enumerate() {
                if idx_a != idx_b {
                    assert!(!(code_a.starts_with(code_b.as_str()) && code_a != code_b));
                }
            }
        }
    }

    #[test]
    fn test_single_character() {
        let result = huffman_coding_tree(&[('x', 10)]);
        assert_eq!(result[&'x'], "0");
    }
}
