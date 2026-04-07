include!("subarray-sum-equals-k.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_counts_two_subarrays_for_default() {
        assert_eq!(subarray_sum_equals_k(&[1, 1, 1], 2), 2);
    }

    #[test]
    fn test_returns_2_for_1_2_3_target_3() {
        assert_eq!(subarray_sum_equals_k(&[1, 2, 3], 3), 2);
    }

    #[test]
    fn test_returns_0_when_no_subarray_sums_to_target() {
        assert_eq!(subarray_sum_equals_k(&[1, 2, 3], 10), 0);
    }

    #[test]
    fn test_handles_single_element_matching_target() {
        assert_eq!(subarray_sum_equals_k(&[5], 5), 1);
    }

    #[test]
    fn test_handles_single_element_not_matching() {
        assert_eq!(subarray_sum_equals_k(&[5], 3), 0);
    }

    #[test]
    fn test_handles_negative_numbers() {
        assert_eq!(subarray_sum_equals_k(&[1, -1, 1], 1), 3);
    }

    #[test]
    fn test_handles_entire_array_summing_to_target() {
        assert_eq!(subarray_sum_equals_k(&[1, 2, 3, 4], 10), 1);
    }

    #[test]
    fn test_counts_multiple_overlapping_subarrays() {
        assert_eq!(subarray_sum_equals_k(&[0, 0, 0], 0), 6);
    }

    #[test]
    fn test_handles_all_same_elements() {
        assert_eq!(subarray_sum_equals_k(&[2, 2, 2, 2], 4), 3);
    }

    #[test]
    fn test_handles_target_zero_with_mixed_values() {
        assert_eq!(subarray_sum_equals_k(&[1, -1, 2, -2], 0), 3);
    }
}
