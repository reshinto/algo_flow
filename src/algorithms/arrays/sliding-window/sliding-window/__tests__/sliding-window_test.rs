include!("../sources/sliding-window.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_array() {
        let (max_sum, window_start_index) = max_sum_subarray(&[2, 1, 5, 1, 3, 2], 3);
        assert_eq!(max_sum, 9);
        assert_eq!(window_start_index, 2);
    }

    #[test]
    fn test_window_at_start() {
        let (max_sum, window_start_index) = max_sum_subarray(&[10, 9, 8, 1, 2, 3], 3);
        assert_eq!(max_sum, 27);
        assert_eq!(window_start_index, 0);
    }

    #[test]
    fn test_window_at_end() {
        let (max_sum, window_start_index) = max_sum_subarray(&[1, 2, 3, 8, 9, 10], 3);
        assert_eq!(max_sum, 27);
        assert_eq!(window_start_index, 3);
    }

    #[test]
    fn test_empty_array() {
        let (max_sum, _) = max_sum_subarray(&[], 3);
        assert_eq!(max_sum, 0);
    }

    #[test]
    fn test_window_exceeds_length() {
        let (max_sum, _) = max_sum_subarray(&[1, 2], 5);
        assert_eq!(max_sum, 0);
    }

    #[test]
    fn test_negative_numbers() {
        let (max_sum, window_start_index) = max_sum_subarray(&[-1, -3, -5, -2, -1, -4], 2);
        assert_eq!(max_sum, -3);
        assert_eq!(window_start_index, 3);
    }

    #[test]
    fn test_default_algorithm_input() {
        let (max_sum, window_start_index) = max_sum_subarray(&[2, 1, 5, 1, 3, 2, 8, 4, 3, 5], 3);
        assert_eq!(max_sum, 15);
        assert_eq!(window_start_index, 6);
    }
}
