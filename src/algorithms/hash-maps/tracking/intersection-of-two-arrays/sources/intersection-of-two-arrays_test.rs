include!("intersection-of-two-arrays.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_2_for_default() {
        assert_eq!(intersection_of_two_arrays(&[1, 2, 2, 1], &[2, 2]), vec![2]);
    }

    #[test]
    fn test_returns_4_9_for_second_example() {
        let mut result = intersection_of_two_arrays(&[4, 9, 5], &[9, 4, 9, 8, 4]);
        result.sort_unstable();
        assert_eq!(result, vec![4, 9]);
    }

    #[test]
    fn test_returns_empty_for_no_overlap() {
        assert_eq!(intersection_of_two_arrays(&[1, 2], &[3, 4]), Vec::<i32>::new());
    }

    #[test]
    fn test_returns_empty_for_empty_arrays() {
        assert_eq!(intersection_of_two_arrays(&[], &[]), Vec::<i32>::new());
    }

    #[test]
    fn test_returns_empty_when_first_empty() {
        assert_eq!(intersection_of_two_arrays(&[], &[1, 2]), Vec::<i32>::new());
    }

    #[test]
    fn test_returns_empty_when_second_empty() {
        assert_eq!(intersection_of_two_arrays(&[1, 2], &[]), Vec::<i32>::new());
    }

    #[test]
    fn test_handles_identical_arrays() {
        let mut result = intersection_of_two_arrays(&[1, 2, 3], &[1, 2, 3]);
        result.sort_unstable();
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn test_returns_single_element_intersection() {
        assert_eq!(intersection_of_two_arrays(&[5], &[5]), vec![5]);
    }
}
