include!("../sources/valid-palindrome.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_a_man_a_plan() {
        assert!(valid_palindrome("A man, a plan, a canal: Panama"));
    }

    #[test]
    fn test_race_a_car_false() {
        assert!(!valid_palindrome("race a car"));
    }

    #[test]
    fn test_single_space() {
        assert!(valid_palindrome(" "));
    }

    #[test]
    fn test_single_alnum_with_punctuation() {
        assert!(valid_palindrome("a."));
    }

    #[test]
    fn test_empty_string() {
        assert!(valid_palindrome(""));
    }

    #[test]
    fn test_simple_palindrome() {
        assert!(valid_palindrome("racecar"));
    }

    #[test]
    fn test_simple_non_palindrome() {
        assert!(!valid_palindrome("hello"));
    }

    #[test]
    fn test_case_insensitive() {
        assert!(valid_palindrome("AbBa"));
    }

    #[test]
    fn test_only_punctuation() {
        assert!(valid_palindrome(".,!?"));
    }

    #[test]
    fn test_alnum_palindrome_with_punctuation() {
        assert!(valid_palindrome("...racecar..."));
    }

    #[test]
    fn test_alnum_mismatch_in_middle() {
        assert!(!valid_palindrome("ab2a"));
    }
}
