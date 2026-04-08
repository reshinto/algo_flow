include!("sources/sliding-window-maximum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn leetcode_239_example() {
        assert_eq!(sliding_window_max_monotonic(&[1, 3, -1, -3, 5, 3, 6, 7], 3), vec![3, 3, 5, 5, 6, 7]);
    }

    #[test]
    fn window_equals_array_length() {
        assert_eq!(sliding_window_max_monotonic(&[4, 2, 7], 3), vec![7]);
    }

    #[test]
    fn window_size_one() {
        assert_eq!(sliding_window_max_monotonic(&[5, 3, 8, 1], 1), vec![5, 3, 8, 1]);
    }

    #[test]
    fn strictly_increasing() {
        assert_eq!(sliding_window_max_monotonic(&[1, 2, 3, 4, 5], 3), vec![3, 4, 5]);
    }

    #[test]
    fn strictly_decreasing() {
        assert_eq!(sliding_window_max_monotonic(&[5, 4, 3, 2, 1], 3), vec![5, 4, 3]);
    }

    #[test]
    fn negative_numbers() {
        assert_eq!(sliding_window_max_monotonic(&[-4, -2, -7, -1], 2), vec![-2, -2, -1]);
    }

    #[test]
    fn single_element() {
        assert_eq!(sliding_window_max_monotonic(&[42], 1), vec![42]);
    }

    #[test]
    fn all_equal() {
        assert_eq!(sliding_window_max_monotonic(&[3, 3, 3, 3], 2), vec![3, 3, 3]);
    }
}
