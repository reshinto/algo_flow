include!("sources/find-the-difference.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_finds_e_added_to_abcd() {
        assert_eq!(find_the_difference("abcd", "abcde"), 'e');
    }

    #[test]
    fn test_finds_added_char_at_start() {
        assert_eq!(find_the_difference("abc", "zabc"), 'z');
    }

    #[test]
    fn test_finds_added_char_duplicating_existing() {
        assert_eq!(find_the_difference("aab", "aabb"), 'b');
    }

    #[test]
    fn test_handles_empty_original() {
        assert_eq!(find_the_difference("", "x"), 'x');
    }

    #[test]
    fn test_finds_added_char_in_middle() {
        assert_eq!(find_the_difference("ab", "amb"), 'm');
    }

    #[test]
    fn test_handles_single_character_original() {
        assert_eq!(find_the_difference("a", "ab"), 'b');
    }

    #[test]
    fn test_finds_duplicated_char_in_all_same_string() {
        assert_eq!(find_the_difference("aaa", "aaaa"), 'a');
    }

    #[test]
    fn test_works_with_uppercase_letters() {
        assert_eq!(find_the_difference("ABC", "ABCD"), 'D');
    }
}
