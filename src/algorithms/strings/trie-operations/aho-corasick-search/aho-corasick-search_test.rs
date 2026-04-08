include!("sources/aho-corasick-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn sorted_vec(mut v: Vec<String>) -> Vec<String> {
        v.sort();
        v
    }

    #[test]
    fn test_classic_example() {
        let result = aho_corasick_search("ahishers", &["he", "she", "his", "hers"]);
        assert_eq!(
            sorted_vec(result),
            sorted_vec(vec!["he".into(), "hers".into(), "his".into(), "she".into()])
        );
    }

    #[test]
    fn test_no_patterns_found() {
        let result = aho_corasick_search("hello world", &["xyz", "abc"]);
        assert!(result.is_empty());
    }

    #[test]
    fn test_empty_patterns_list() {
        let result = aho_corasick_search("hello", &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn test_empty_text() {
        let result = aho_corasick_search("", &["hello", "world"]);
        assert!(result.is_empty());
    }

    #[test]
    fn test_single_pattern_found() {
        let result = aho_corasick_search("banana", &["nan"]);
        assert_eq!(result, vec!["nan".to_string()]);
    }

    #[test]
    fn test_pattern_found_once_despite_multiple_occurrences() {
        let result = aho_corasick_search("aaaa", &["aa"]);
        assert_eq!(result.len(), 1);
        assert!(result.contains(&"aa".to_string()));
    }

    #[test]
    fn test_returns_only_found_patterns() {
        let result = aho_corasick_search("cat", &["cat", "dog", "bird"]);
        assert_eq!(result, vec!["cat".to_string()]);
    }

    #[test]
    fn test_case_sensitive() {
        let result = aho_corasick_search("Hello", &["hello"]);
        assert!(result.is_empty());
    }

    #[test]
    fn test_pattern_at_end() {
        let result = aho_corasick_search("xyzabc", &["abc"]);
        assert_eq!(result, vec!["abc".to_string()]);
    }

    #[test]
    fn test_pattern_at_start() {
        let result = aho_corasick_search("abcxyz", &["abc"]);
        assert_eq!(result, vec!["abc".to_string()]);
    }
}
