include!("sources/sliding-window-min-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (min_sum, window_start_index) =
            min_sum_subarray(&[4, 2, 1, 7, 8, 1, 2, 8, 1, 0], 3);
        assert_eq!(min_sum, 7);
        assert_eq!(window_start_index, 0);
    }

    #[test]
    fn test_window_at_start() {
        let (min_sum, window_start_index) = min_sum_subarray(&[1, 2, 3, 8, 9, 10], 3);
        assert_eq!(min_sum, 6);
        assert_eq!(window_start_index, 0);
    }

    #[test]
    fn test_window_at_end() {
        let (min_sum, window_start_index) = min_sum_subarray(&[10, 9, 8, 1, 2, 3], 3);
        assert_eq!(min_sum, 6);
        assert_eq!(window_start_index, 3);
    }

    #[test]
    fn test_empty_array() {
        let (min_sum, _) = min_sum_subarray(&[], 3);
        assert_eq!(min_sum, 0);
    }

    #[test]
    fn test_window_size_exceeds_length() {
        let (min_sum, _) = min_sum_subarray(&[1, 2], 5);
        assert_eq!(min_sum, 0);
    }

    #[test]
    fn test_negative_numbers() {
        let (min_sum, window_start_index) = min_sum_subarray(&[-1, -3, -5, -2, -1, -4], 2);
        assert_eq!(min_sum, -8);
        assert_eq!(window_start_index, 1);
    }

    #[test]
    fn test_window_size_one() {
        let (min_sum, window_start_index) = min_sum_subarray(&[4, 1, 7, 2, 9], 1);
        assert_eq!(min_sum, 1);
        assert_eq!(window_start_index, 1);
    }

    #[test]
    fn test_all_same_elements() {
        let (min_sum, window_start_index) = min_sum_subarray(&[5, 5, 5, 5, 5], 2);
        assert_eq!(min_sum, 10);
        assert_eq!(window_start_index, 0);
    }
}
