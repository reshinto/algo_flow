include!("remove-all-adjacent-duplicates.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_abbaca() {
        assert_eq!(remove_all_adjacent_duplicates("abbaca"), "ca");
    }

    #[test]
    fn cascading_azxxzy() {
        assert_eq!(remove_all_adjacent_duplicates("azxxzy"), "ay");
    }

    #[test]
    fn empty_string() {
        assert_eq!(remove_all_adjacent_duplicates(""), "");
    }

    #[test]
    fn no_adjacent_duplicates() {
        assert_eq!(remove_all_adjacent_duplicates("abc"), "abc");
    }

    #[test]
    fn all_same_characters() {
        assert_eq!(remove_all_adjacent_duplicates("aaaaaa"), "");
    }

    #[test]
    fn paired_characters() {
        assert_eq!(remove_all_adjacent_duplicates("aabb"), "");
    }

    #[test]
    fn single_character() {
        assert_eq!(remove_all_adjacent_duplicates("a"), "a");
    }

    #[test]
    fn palindrome_cancels() {
        assert_eq!(remove_all_adjacent_duplicates("abba"), "");
    }
}
