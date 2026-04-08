include!("sources/auto-complete-trie.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn sorted_vec(mut v: Vec<String>) -> Vec<String> {
        v.sort();
        v
    }

    #[test]
    fn test_matches_prefix() {
        let result = auto_complete_trie(&["apple", "app", "apricot", "banana", "bat"], "ap");
        assert_eq!(
            sorted_vec(result),
            sorted_vec(vec!["app".into(), "apple".into(), "apricot".into()])
        );
    }

    #[test]
    fn test_single_word_match() {
        let result = auto_complete_trie(&["apple", "banana", "cherry"], "ban");
        assert_eq!(result, vec!["banana".to_string()]);
    }

    #[test]
    fn test_no_match() {
        let result = auto_complete_trie(&["apple", "app", "apricot"], "ba");
        assert!(result.is_empty());
    }

    #[test]
    fn test_prefix_not_in_trie() {
        let result = auto_complete_trie(&["apple", "app"], "xyz");
        assert!(result.is_empty());
    }

    #[test]
    fn test_empty_word_list() {
        let result = auto_complete_trie(&[], "ap");
        assert!(result.is_empty());
    }

    #[test]
    fn test_prefix_equals_full_word() {
        let result = auto_complete_trie(&["apple", "app", "apricot"], "app");
        assert_eq!(
            sorted_vec(result),
            sorted_vec(vec!["app".into(), "apple".into()])
        );
    }

    #[test]
    fn test_single_word_dict_match() {
        let result = auto_complete_trie(&["hello"], "hel");
        assert_eq!(result, vec!["hello".to_string()]);
    }

    #[test]
    fn test_single_word_dict_no_match() {
        let result = auto_complete_trie(&["hello"], "world");
        assert!(result.is_empty());
    }

    #[test]
    fn test_single_char_prefix() {
        let result = auto_complete_trie(&["apple", "apricot", "banana"], "a");
        assert_eq!(
            sorted_vec(result),
            sorted_vec(vec!["apple".into(), "apricot".into()])
        );
    }
}
