include!("trie-insert-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_finds_exact_word() {
        assert!(trie_insert_search(&["apple", "app"], "app"));
    }

    #[test]
    fn test_prefix_not_full_word() {
        assert!(!trie_insert_search(&["apple"], "ap"));
    }

    #[test]
    fn test_finds_longer_word() {
        assert!(trie_insert_search(&["apple", "app"], "apple"));
    }

    #[test]
    fn test_not_in_trie() {
        assert!(!trie_insert_search(&["apple", "app", "apricot"], "banana"));
    }

    #[test]
    fn test_empty_trie() {
        assert!(!trie_insert_search(&[], "app"));
    }

    #[test]
    fn test_single_word_found() {
        assert!(trie_insert_search(&["hello"], "hello"));
    }

    #[test]
    fn test_extends_beyond_inserted() {
        assert!(!trie_insert_search(&["app"], "apple"));
    }

    #[test]
    fn test_no_common_prefix_found() {
        assert!(trie_insert_search(&["cat", "dog", "bird"], "dog"));
    }

    #[test]
    fn test_no_common_prefix_miss() {
        assert!(!trie_insert_search(&["cat", "dog", "bird"], "fox"));
    }

    #[test]
    fn test_duplicate_words() {
        assert!(trie_insert_search(&["apple", "apple"], "apple"));
    }

    #[test]
    fn test_single_char_words() {
        assert!(trie_insert_search(&["a", "b", "c"], "b"));
    }

    #[test]
    fn test_empty_search_no_empty_word() {
        assert!(!trie_insert_search(&["apple", "app"], ""));
    }
}
