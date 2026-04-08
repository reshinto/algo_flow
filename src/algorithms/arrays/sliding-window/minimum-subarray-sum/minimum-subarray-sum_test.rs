include!("sources/minimum-subarray-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (min_sum, start_index, end_index) =
            minimum_subarray_sum(&[3, -4, 2, -3, -1, 7, -5]);
        assert_eq!(min_sum, -6);
        assert_eq!(start_index, 1);
        assert_eq!(end_index, 4);
    }

    #[test]
    fn test_all_positive_returns_min_element() {
        let (min_sum, _, _) = minimum_subarray_sum(&[3, 1, 4, 1, 5]);
        assert_eq!(min_sum, 1);
    }

    #[test]
    fn test_all_negative_returns_full_array() {
        let (min_sum, start_index, end_index) = minimum_subarray_sum(&[-1, -2, -3]);
        assert_eq!(min_sum, -6);
        assert_eq!(start_index, 0);
        assert_eq!(end_index, 2);
    }

    #[test]
    fn test_single_element() {
        let (min_sum, start_index, end_index) = minimum_subarray_sum(&[-5]);
        assert_eq!(min_sum, -5);
        assert_eq!(start_index, 0);
        assert_eq!(end_index, 0);
    }

    #[test]
    fn test_empty_array() {
        let (min_sum, _, _) = minimum_subarray_sum(&[]);
        assert_eq!(min_sum, 0);
    }

    #[test]
    fn test_single_negative_amid_positives() {
        let (min_sum, start_index, end_index) = minimum_subarray_sum(&[5, 5, -20, 5, 5]);
        assert_eq!(min_sum, -20);
        assert_eq!(start_index, 2);
        assert_eq!(end_index, 2);
    }

    #[test]
    fn test_all_same_negative() {
        let (min_sum, start_index, end_index) = minimum_subarray_sum(&[-3, -3, -3]);
        assert_eq!(min_sum, -9);
        assert_eq!(start_index, 0);
        assert_eq!(end_index, 2);
    }

    #[test]
    fn test_large_negative_in_middle() {
        let (min_sum, start_index, end_index) = minimum_subarray_sum(&[100, -200, 100]);
        assert_eq!(min_sum, -200);
        assert_eq!(start_index, 1);
        assert_eq!(end_index, 1);
    }
}
