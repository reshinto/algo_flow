include!("sources/first-negative-in-window.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        assert_eq!(
            first_negative_in_window(&[12, -1, -7, 8, -15, 30, 16, 28], 3),
            vec![-1, -1, -7, -15, -15, 0]
        );
    }

    #[test]
    fn test_no_negatives() {
        assert_eq!(first_negative_in_window(&[1, 2, 3, 4, 5], 3), vec![0, 0, 0]);
    }

    #[test]
    fn test_all_negatives() {
        assert_eq!(first_negative_in_window(&[-3, -5, -2, -8], 2), vec![-3, -5, -2]);
    }

    #[test]
    fn test_window_size_one() {
        assert_eq!(first_negative_in_window(&[4, -2, 3, -1], 1), vec![0, -2, 0, -1]);
    }

    #[test]
    fn test_window_full_array() {
        assert_eq!(first_negative_in_window(&[1, 2, -3, 4], 4), vec![-3]);
    }

    #[test]
    fn test_empty_input() {
        assert_eq!(first_negative_in_window(&[], 3), vec![]);
    }

    #[test]
    fn test_window_exceeds_length() {
        assert_eq!(first_negative_in_window(&[1, 2], 5), vec![]);
    }

    #[test]
    fn test_window_size_zero() {
        assert_eq!(first_negative_in_window(&[1, -2, 3], 0), vec![]);
    }

    #[test]
    fn test_correct_output_length() {
        let input_array = [12, -1, -7, 8, -15, 30, 16, 28];
        let window_size = 3;
        let result = first_negative_in_window(&input_array, window_size);
        assert_eq!(result.len(), input_array.len() - window_size + 1);
    }
}
