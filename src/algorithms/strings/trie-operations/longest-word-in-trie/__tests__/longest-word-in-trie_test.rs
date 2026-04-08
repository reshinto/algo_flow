include!("../sources/longest-word-in-trie.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_full_chain() {
        assert_eq!(longest_word_in_trie(&["w", "wo", "wor", "worl", "world"]), "world");
    }

    #[test]
    fn test_empty_list() {
        assert_eq!(longest_word_in_trie(&[]), "");
    }

    #[test]
    fn test_single_char_word() {
        assert_eq!(longest_word_in_trie(&["a"]), "a");
    }

    #[test]
    fn test_no_word_with_all_prefixes() {
        assert_eq!(longest_word_in_trie(&["world"]), "");
    }

    #[test]
    fn test_full_apple_chain() {
        assert_eq!(longest_word_in_trie(&["a", "ap", "app", "appl", "apple"]), "apple");
    }

    #[test]
    fn test_lexicographically_smallest_on_tie() {
        assert_eq!(longest_word_in_trie(&["b", "ba", "c", "ca"]), "ba");
    }

    #[test]
    fn test_skips_incomplete_chain() {
        assert_eq!(longest_word_in_trie(&["d", "dog"]), "d");
    }

    #[test]
    fn test_empty_words_with_no_prefixes() {
        assert_eq!(longest_word_in_trie(&["abc", "def", "ghi"]), "");
    }

    #[test]
    fn test_picks_longer_competing_chain() {
        assert_eq!(longest_word_in_trie(&["a", "ab", "abc", "x", "xy"]), "abc");
    }

    #[test]
    fn test_duplicate_words() {
        assert_eq!(longest_word_in_trie(&["a", "a", "ab", "ab"]), "ab");
    }

    #[test]
    fn test_lexicographically_smallest_single_chars() {
        assert_eq!(longest_word_in_trie(&["b", "c"]), "b");
    }
}
