include!("../sources/two-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_finds_pair_summing_to_target_in_default() {
        assert_eq!(two_sum(&[2, 7, 11, 15], 9), [0, 1]);
    }

    #[test]
    fn test_finds_pair_at_end_of_array() {
        assert_eq!(two_sum(&[3, 2, 4], 6), [1, 2]);
    }

    #[test]
    fn test_finds_pair_using_same_index_once() {
        assert_eq!(two_sum(&[3, 3], 6), [0, 1]);
    }

    #[test]
    fn test_handles_negative_numbers() {
        assert_eq!(two_sum(&[-3, 4, 3, 90], 0), [0, 2]);
    }

    #[test]
    fn test_handles_zero_as_target() {
        assert_eq!(two_sum(&[-1, 0, 1, 2], 0), [0, 2]);
    }

    #[test]
    fn test_finds_pair_at_beginning() {
        assert_eq!(two_sum(&[5, 3, 1, 9], 8), [0, 1]);
    }

    #[test]
    fn test_handles_two_element_array() {
        assert_eq!(two_sum(&[4, 6], 10), [0, 1]);
    }
}
