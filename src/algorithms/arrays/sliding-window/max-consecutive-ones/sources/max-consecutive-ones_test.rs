include!("max-consecutive-ones.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (max_length, start_index) = max_consecutive_ones(&[1, 1, 0, 0, 1, 1, 1, 0, 1, 1], 2);
        assert_eq!(max_length, 7);
        assert_eq!(start_index, 0);
    }

    #[test]
    fn test_full_array_covered() {
        let (max_length, _) = max_consecutive_ones(&[1, 0, 1, 0, 1], 2);
        assert_eq!(max_length, 5);
    }

    #[test]
    fn test_all_ones() {
        let (max_length, start_index) = max_consecutive_ones(&[1, 1, 1, 1], 0);
        assert_eq!(max_length, 4);
        assert_eq!(start_index, 0);
    }

    #[test]
    fn test_no_flips_allowed() {
        let (max_length, _) = max_consecutive_ones(&[1, 1, 0, 1, 1], 0);
        assert_eq!(max_length, 2);
    }

    #[test]
    fn test_empty_array() {
        let (max_length, _) = max_consecutive_ones(&[], 2);
        assert_eq!(max_length, 0);
    }

    #[test]
    fn test_single_one() {
        let (max_length, start_index) = max_consecutive_ones(&[1], 0);
        assert_eq!(max_length, 1);
        assert_eq!(start_index, 0);
    }

    #[test]
    fn test_single_zero_with_flip() {
        let (max_length, _) = max_consecutive_ones(&[0], 1);
        assert_eq!(max_length, 1);
    }

    #[test]
    fn test_all_zeros_with_flips() {
        let (max_length, _) = max_consecutive_ones(&[0, 0, 0], 2);
        assert_eq!(max_length, 2);
    }

    #[test]
    fn test_window_with_three_ones() {
        let (max_length, _) = max_consecutive_ones(&[1, 0, 1], 1);
        assert_eq!(max_length, 3);
    }
}
