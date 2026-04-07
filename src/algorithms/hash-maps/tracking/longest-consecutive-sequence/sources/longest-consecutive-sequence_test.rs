include!("longest-consecutive-sequence.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_finds_sequence_1_2_3_4_in_default() {
        assert_eq!(longest_consecutive_sequence(&[100, 4, 200, 1, 3, 2]), 4);
    }

    #[test]
    fn test_returns_1_for_no_consecutive_pairs() {
        assert_eq!(longest_consecutive_sequence(&[10, 20, 30]), 1);
    }

    #[test]
    fn test_handles_fully_consecutive_array() {
        assert_eq!(longest_consecutive_sequence(&[1, 2, 3, 4, 5]), 5);
    }

    #[test]
    fn test_handles_single_element() {
        assert_eq!(longest_consecutive_sequence(&[42]), 1);
    }

    #[test]
    fn test_handles_duplicate_values() {
        assert_eq!(longest_consecutive_sequence(&[1, 2, 2, 3]), 3);
    }

    #[test]
    fn test_handles_negative_numbers() {
        assert_eq!(longest_consecutive_sequence(&[-3, -2, -1, 0, 1]), 5);
    }

    #[test]
    fn test_handles_sequence_spanning_negative_and_positive() {
        assert_eq!(longest_consecutive_sequence(&[-1, 0, 1]), 3);
    }

    #[test]
    fn test_returns_correct_length_for_two_disjoint_sequences() {
        assert_eq!(longest_consecutive_sequence(&[1, 2, 3, 10, 11, 12, 13]), 4);
    }

    #[test]
    fn test_handles_unsorted_input() {
        assert_eq!(longest_consecutive_sequence(&[5, 1, 3, 2, 4]), 5);
    }
}
