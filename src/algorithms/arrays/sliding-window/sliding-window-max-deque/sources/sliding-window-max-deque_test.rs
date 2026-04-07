include!("sliding-window-max-deque.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let result = sliding_window_max_deque(&[1, 3, -1, -3, 5, 3, 6, 7], 3);
        assert_eq!(result, vec![3, 3, 5, 5, 6, 7]);
    }

    #[test]
    fn test_empty_array() {
        let result = sliding_window_max_deque(&[], 3);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_window_exceeds_array_length() {
        let result = sliding_window_max_deque(&[1, 2], 5);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_window_size_zero() {
        let result = sliding_window_max_deque(&[1, 2, 3], 0);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_window_equals_array_length() {
        let result = sliding_window_max_deque(&[3, 1, 4, 1, 5], 5);
        assert_eq!(result, vec![5]);
    }

    #[test]
    fn test_window_size_one() {
        let result = sliding_window_max_deque(&[4, 2, 7, 1, 9], 1);
        assert_eq!(result, vec![4, 2, 7, 1, 9]);
    }

    #[test]
    fn test_all_equal_elements() {
        let result = sliding_window_max_deque(&[5, 5, 5, 5], 2);
        assert_eq!(result, vec![5, 5, 5]);
    }

    #[test]
    fn test_decreasing_array() {
        let result = sliding_window_max_deque(&[9, 7, 5, 3, 1], 3);
        assert_eq!(result, vec![9, 7, 5]);
    }

    #[test]
    fn test_increasing_array() {
        let result = sliding_window_max_deque(&[1, 3, 5, 7, 9], 3);
        assert_eq!(result, vec![5, 7, 9]);
    }

    #[test]
    fn test_negative_numbers() {
        let result = sliding_window_max_deque(&[-4, -2, -5, -1, -3], 2);
        assert_eq!(result, vec![-2, -2, -1, -1]);
    }

    #[test]
    fn test_result_length() {
        let input_array = [1, 3, -1, -3, 5, 3, 6, 7];
        let window_size = 3;
        let result = sliding_window_max_deque(&input_array, window_size);
        assert_eq!(result.len(), input_array.len() - window_size + 1);
    }
}
