include!("../sources/trie-prefix-count.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_counts_shared_prefix() {
        assert_eq!(trie_prefix_count(&["apple", "app", "apricot", "ape"], "ap"), 4);
    }

    #[test]
    fn test_single_word_match() {
        assert_eq!(trie_prefix_count(&["hello"], "he"), 1);
    }

    #[test]
    fn test_empty_word_list() {
        assert_eq!(trie_prefix_count(&[], "a"), 0);
    }

    #[test]
    fn test_no_word_starts_with_prefix() {
        assert_eq!(trie_prefix_count(&["apple", "app", "apricot"], "banana"), 0);
    }

    #[test]
    fn test_exact_prefix_match() {
        assert_eq!(trie_prefix_count(&["apple", "app", "apricot", "ape"], "apple"), 1);
    }

    #[test]
    fn test_prefix_equals_full_word() {
        assert_eq!(trie_prefix_count(&["app", "apple", "application"], "app"), 3);
    }

    #[test]
    fn test_prefix_longer_than_stored() {
        assert_eq!(trie_prefix_count(&["app"], "application"), 0);
    }

    #[test]
    fn test_duplicate_words_counted_separately() {
        assert_eq!(trie_prefix_count(&["apple", "apple"], "ap"), 2);
    }

    #[test]
    fn test_single_char_prefix() {
        assert_eq!(trie_prefix_count(&["apple", "ant", "ace"], "a"), 3);
    }

    #[test]
    fn test_no_common_prefix() {
        assert_eq!(trie_prefix_count(&["cat", "dog", "bird"], "c"), 1);
    }

    #[test]
    fn test_empty_prefix_returns_zero() {
        assert_eq!(trie_prefix_count(&["apple", "app"], ""), 0);
    }

    #[test]
    fn test_varying_length_words() {
        assert_eq!(trie_prefix_count(&["a", "ab", "abc", "abcd"], "ab"), 3);
    }
}
