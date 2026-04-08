include!("sources/count-anagram-windows.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_array() {
        let (count, positions) = count_anagram_windows(&[1, 2, 3, 1, 2, 1, 3, 2, 1], &[1, 2, 3]);
        assert!(count > 0);
        assert!(positions.contains(&0));
    }

    #[test]
    fn test_anagram_at_first_position() {
        let (_, positions) = count_anagram_windows(&[3, 1, 2, 4, 5], &[1, 2, 3]);
        assert!(positions.contains(&0));
    }

    #[test]
    fn test_anagram_at_last_position() {
        let (_, positions) = count_anagram_windows(&[4, 5, 1, 2, 3], &[3, 2, 1]);
        assert!(positions.contains(&2));
    }

    #[test]
    fn test_no_anagram() {
        let (count, positions) = count_anagram_windows(&[1, 1, 1, 1], &[1, 2]);
        assert_eq!(count, 0);
        assert!(positions.is_empty());
    }

    #[test]
    fn test_pattern_equals_text_length() {
        let (count, positions) = count_anagram_windows(&[3, 1, 2], &[1, 2, 3]);
        assert_eq!(count, 1);
        assert_eq!(positions, vec![0]);
    }

    #[test]
    fn test_pattern_longer_than_text() {
        let (count, _) = count_anagram_windows(&[1, 2], &[1, 2, 3]);
        assert_eq!(count, 0);
    }

    #[test]
    fn test_empty_text() {
        let (count, _) = count_anagram_windows(&[], &[1, 2]);
        assert_eq!(count, 0);
    }

    #[test]
    fn test_empty_pattern() {
        let (count, _) = count_anagram_windows(&[1, 2, 3], &[]);
        assert_eq!(count, 0);
    }

    #[test]
    fn test_count_matches_positions_length() {
        let (count, positions) = count_anagram_windows(&[1, 2, 3, 1, 2, 1, 3, 2, 1], &[1, 2, 3]);
        assert_eq!(count, positions.len());
    }
}
