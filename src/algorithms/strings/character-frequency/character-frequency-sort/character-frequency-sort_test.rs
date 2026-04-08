include!("sources/character-frequency-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty_string() {
        assert_eq!(character_frequency_sort(""), "");
    }

    #[test]
    fn test_tree_starts_with_ee() {
        let result = character_frequency_sort("tree");
        assert!(result.starts_with("ee"), "Expected 'ee' prefix, got: {}", result);
        assert_eq!(result.len(), 4);
    }

    #[test]
    fn test_cccaaa_grouped_blocks() {
        let result = character_frequency_sort("cccaaa");
        assert_eq!(result.len(), 6);
        let first_block = &result[..3];
        let second_block = &result[3..];
        assert!(first_block == "ccc" || first_block == "aaa");
        assert!(second_block == "ccc" || second_block == "aaa");
        assert_ne!(first_block, second_block);
    }

    #[test]
    fn test_aab_starts_with_aa() {
        let result = character_frequency_sort("aab");
        assert!(result.starts_with("aa"), "Expected 'aa' prefix, got: {}", result);
        assert_eq!(result.len(), 3);
    }

    #[test]
    fn test_single_character() {
        assert_eq!(character_frequency_sort("z"), "z");
    }

    #[test]
    fn test_all_same_characters() {
        assert_eq!(character_frequency_sort("aaaa"), "aaaa");
    }

    #[test]
    fn test_preserves_all_characters() {
        let input = "programming";
        let result = character_frequency_sort(input);
        assert_eq!(result.len(), input.len());
        for ch in input.chars().collect::<std::collections::HashSet<_>>() {
            let input_count = input.chars().filter(|&c| c == ch).count();
            let output_count = result.chars().filter(|&c| c == ch).count();
            assert_eq!(input_count, output_count);
        }
    }

    #[test]
    fn test_eeebba_starts_with_eee() {
        let result = character_frequency_sort("eeebba");
        assert!(result.starts_with("eee"), "Expected 'eee' prefix, got: {}", result);
    }

    #[test]
    fn test_aabbcc_contiguous_blocks() {
        let result = character_frequency_sort("aabbcc");
        assert_eq!(result.len(), 6);
        let chars: Vec<char> = result.chars().collect();
        for block_start in (0..6).step_by(2) {
            assert_eq!(chars[block_start], chars[block_start + 1]);
        }
    }

    #[test]
    fn test_uppercase_lowercase_distinct() {
        let result = character_frequency_sort("Aabb");
        assert!(result.starts_with("bb"), "Expected 'bb' prefix, got: {}", result);
        assert_eq!(result.len(), 4);
    }
}
