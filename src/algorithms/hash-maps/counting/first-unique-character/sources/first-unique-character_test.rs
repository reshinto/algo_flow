include!("first-unique-character.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_0_for_leetcode() {
        assert_eq!(first_unique_character("leetcode"), 0);
    }

    #[test]
    fn test_returns_2_for_loveleetcode() {
        assert_eq!(first_unique_character("loveleetcode"), 2);
    }

    #[test]
    fn test_returns_minus1_for_aabb() {
        assert_eq!(first_unique_character("aabb"), -1);
    }

    #[test]
    fn test_returns_0_for_single_char() {
        assert_eq!(first_unique_character("z"), 0);
    }

    #[test]
    fn test_returns_minus1_when_all_repeat() {
        assert_eq!(first_unique_character("aabbcc"), -1);
    }

    #[test]
    fn test_returns_last_index_when_only_last_is_unique() {
        assert_eq!(first_unique_character("aabc"), 2);
    }

    #[test]
    fn test_handles_all_distinct_characters() {
        assert_eq!(first_unique_character("abcde"), 0);
    }

    #[test]
    fn test_returns_minus1_for_abab() {
        assert_eq!(first_unique_character("abab"), -1);
    }

    #[test]
    fn test_handles_aadadaad() {
        assert_eq!(first_unique_character("aadadaad"), -1);
    }

    #[test]
    fn test_finds_uniqueness_considering_full_frequency() {
        assert_eq!(first_unique_character("aba"), 1);
    }
}
