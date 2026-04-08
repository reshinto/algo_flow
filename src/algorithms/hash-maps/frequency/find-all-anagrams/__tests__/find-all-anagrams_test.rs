include!("../sources/find-all-anagrams.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_finds_both_anagram_windows_in_default() {
        assert_eq!(find_all_anagrams("cbaebabacd", "abc"), vec![0, 6]);
    }

    #[test]
    fn test_finds_consecutive_overlapping_windows() {
        assert_eq!(find_all_anagrams("abab", "ab"), vec![0, 1, 2]);
    }

    #[test]
    fn test_returns_empty_when_no_anagram() {
        assert_eq!(find_all_anagrams("af", "be"), Vec::<usize>::new());
    }

    #[test]
    fn test_finds_match_when_entire_text_is_anagram() {
        assert_eq!(find_all_anagrams("cba", "abc"), vec![0]);
    }

    #[test]
    fn test_handles_single_character_pattern() {
        assert_eq!(find_all_anagrams("aaab", "a"), vec![0, 1, 2]);
    }

    #[test]
    fn test_returns_empty_when_pattern_longer_than_text() {
        assert_eq!(find_all_anagrams("ab", "abc"), Vec::<usize>::new());
    }

    #[test]
    fn test_returns_empty_when_no_window_matches() {
        assert_eq!(find_all_anagrams("aabbcc", "bca"), Vec::<usize>::new());
    }

    #[test]
    fn test_finds_all_windows_for_repeated_char_pattern() {
        let result = find_all_anagrams("aababb", "aab");
        assert!(result.contains(&0));
        assert!(result.contains(&1));
    }
}
