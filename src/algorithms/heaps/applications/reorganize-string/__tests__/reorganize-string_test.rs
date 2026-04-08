include!("../sources/reorganize-string.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn has_adjacent_duplicates(text: &str) -> bool {
        let chars: Vec<char> = text.chars().collect();
        for idx in 1..chars.len() {
            if chars[idx] == chars[idx - 1] {
                return true;
            }
        }
        false
    }

    #[test]
    fn test_aabbc() {
        let result = reorganize_string("aabbc");
        assert_eq!(result.len(), 5);
        assert!(!has_adjacent_duplicates(&result));
    }

    #[test]
    fn test_impossible_aaab() {
        assert_eq!(reorganize_string("aaab"), "");
    }

    #[test]
    fn test_single_char() {
        assert_eq!(reorganize_string("a"), "a");
    }

    #[test]
    fn test_two_different() {
        let result = reorganize_string("ab");
        assert_eq!(result.len(), 2);
        assert!(!has_adjacent_duplicates(&result));
    }

    #[test]
    fn test_aab() {
        let result = reorganize_string("aab");
        assert_eq!(result.len(), 3);
        assert!(!has_adjacent_duplicates(&result));
    }

    #[test]
    fn test_impossible_aaa() {
        assert_eq!(reorganize_string("aaa"), "");
    }

    #[test]
    fn test_impossible_aa() {
        assert_eq!(reorganize_string("aa"), "");
    }

    #[test]
    fn test_all_unique() {
        let result = reorganize_string("abcde");
        assert_eq!(result.len(), 5);
        assert!(!has_adjacent_duplicates(&result));
    }
}
