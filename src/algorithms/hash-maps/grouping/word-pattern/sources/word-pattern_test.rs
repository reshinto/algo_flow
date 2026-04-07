include!("word-pattern.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_true_for_abba_dog_cat_cat_dog() {
        assert!(word_pattern("abba", "dog cat cat dog"));
    }

    #[test]
    fn test_returns_false_when_char_maps_to_two_words() {
        assert!(!word_pattern("abba", "dog cat cat fish"));
    }

    #[test]
    fn test_returns_true_for_aabb_dog_dog_cat_cat() {
        assert!(word_pattern("aabb", "dog dog cat cat"));
    }

    #[test]
    fn test_returns_false_when_all_same_but_pattern_varied() {
        assert!(!word_pattern("aaaa", "dog cat cat dog"));
    }

    #[test]
    fn test_returns_false_when_pattern_and_word_count_differ() {
        assert!(!word_pattern("abc", "dog cat"));
    }

    #[test]
    fn test_returns_true_for_single_char_pattern() {
        assert!(word_pattern("a", "dog"));
    }

    #[test]
    fn test_returns_true_for_identical_pattern_same_word() {
        assert!(word_pattern("aa", "dog dog"));
    }

    #[test]
    fn test_returns_false_when_bijection_violated_word_to_char() {
        assert!(!word_pattern("ab", "dog dog"));
    }

    #[test]
    fn test_handles_all_unique_chars_and_words() {
        assert!(word_pattern("abcd", "one two three four"));
    }
}
