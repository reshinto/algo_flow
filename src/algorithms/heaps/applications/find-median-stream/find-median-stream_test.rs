include!("sources/find-median-stream.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_stream() {
        let result = find_median_stream(&[5, 2, 8, 1, 9, 3, 7]);
        assert_eq!(result, vec![5.0, 3.5, 5.0, 3.5, 5.0, 4.0, 5.0]);
    }

    #[test]
    fn test_single_element() {
        let result = find_median_stream(&[42]);
        assert_eq!(result, vec![42.0]);
    }

    #[test]
    fn test_two_elements() {
        let result = find_median_stream(&[3, 7]);
        assert_eq!(result, vec![3.0, 5.0]);
    }

    #[test]
    fn test_all_identical() {
        let result = find_median_stream(&[4, 4, 4, 4]);
        assert_eq!(result, vec![4.0, 4.0, 4.0, 4.0]);
    }

    #[test]
    fn test_ascending_stream() {
        let result = find_median_stream(&[1, 2, 3, 4, 5]);
        assert_eq!(result, vec![1.0, 1.5, 2.0, 2.5, 3.0]);
    }

    #[test]
    fn test_descending_stream() {
        let result = find_median_stream(&[5, 4, 3, 2, 1]);
        assert_eq!(result, vec![5.0, 4.5, 4.0, 3.5, 3.0]);
    }

    #[test]
    fn test_negative_numbers() {
        let result = find_median_stream(&[-5, -1, -3]);
        assert_eq!(result, vec![-5.0, -3.0, -3.0]);
    }

    #[test]
    fn test_mixed_negative_positive() {
        let result = find_median_stream(&[-2, 0, 2]);
        assert_eq!(result, vec![-2.0, -1.0, 0.0]);
    }

    #[test]
    fn test_odd_length_stream() {
        let result = find_median_stream(&[1, 3, 5, 7, 9]);
        assert_eq!(result, vec![1.0, 2.0, 3.0, 4.0, 5.0]);
    }

    #[test]
    fn test_two_equal_values() {
        let result = find_median_stream(&[7, 7]);
        assert_eq!(result, vec![7.0, 7.0]);
    }
}
