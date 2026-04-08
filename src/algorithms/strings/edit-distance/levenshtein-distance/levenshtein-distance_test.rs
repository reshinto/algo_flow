include!("sources/levenshtein-distance.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_kitten_to_sitting() {
        assert_eq!(levenshtein_distance("kitten", "sitting"), 3);
    }

    #[test]
    fn test_source_empty() {
        assert_eq!(levenshtein_distance("", "abc"), 3);
    }

    #[test]
    fn test_target_empty() {
        assert_eq!(levenshtein_distance("abc", ""), 3);
    }

    #[test]
    fn test_identical_strings() {
        assert_eq!(levenshtein_distance("abc", "abc"), 0);
    }

    #[test]
    fn test_two_empty_strings() {
        assert_eq!(levenshtein_distance("", ""), 0);
    }

    #[test]
    fn test_single_insertion() {
        assert_eq!(levenshtein_distance("cat", "cats"), 1);
    }

    #[test]
    fn test_single_deletion() {
        assert_eq!(levenshtein_distance("cats", "cat"), 1);
    }

    #[test]
    fn test_single_replacement() {
        assert_eq!(levenshtein_distance("cat", "bat"), 1);
    }

    #[test]
    fn test_completely_different() {
        assert_eq!(levenshtein_distance("abc", "xyz"), 3);
    }

    #[test]
    fn test_sunday_to_saturday() {
        assert_eq!(levenshtein_distance("sunday", "saturday"), 3);
    }

    #[test]
    fn test_single_char_match() {
        assert_eq!(levenshtein_distance("a", "a"), 0);
    }

    #[test]
    fn test_single_char_differ() {
        assert_eq!(levenshtein_distance("a", "b"), 1);
    }

    #[test]
    fn test_repeated_characters() {
        assert_eq!(levenshtein_distance("aaa", "aa"), 1);
    }
}
