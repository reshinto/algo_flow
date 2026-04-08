include!("sources/first-non-repeating-character.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_leetcode() {
        assert_eq!(first_non_repeating_character("leetcode"), 0);
    }

    #[test]
    fn test_loveleetcode() {
        assert_eq!(first_non_repeating_character("loveleetcode"), 2);
    }

    #[test]
    fn test_aabb_all_repeat() {
        assert_eq!(first_non_repeating_character("aabb"), -1);
    }

    #[test]
    fn test_single_character() {
        assert_eq!(first_non_repeating_character("z"), 0);
    }

    #[test]
    fn test_aabbcc_all_repeat() {
        assert_eq!(first_non_repeating_character("aabbcc"), -1);
    }

    #[test]
    fn test_unique_in_middle() {
        assert_eq!(first_non_repeating_character("aabbc"), 4);
    }

    #[test]
    fn test_first_is_unique() {
        assert_eq!(first_non_repeating_character("xaabb"), 0);
    }

    #[test]
    fn test_last_is_unique() {
        assert_eq!(first_non_repeating_character("aabbz"), 4);
    }

    #[test]
    fn test_all_identical() {
        assert_eq!(first_non_repeating_character("aaaa"), -1);
    }

    #[test]
    fn test_two_unique_chars() {
        assert_eq!(first_non_repeating_character("ab"), 0);
    }

    #[test]
    fn test_dddccdbba() {
        assert_eq!(first_non_repeating_character("dddccdbba"), 8);
    }
}
