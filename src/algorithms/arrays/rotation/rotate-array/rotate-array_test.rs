include!("sources/rotate-array.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_rotate_by_three() {
        assert_eq!(rotate_array(&[1, 2, 3, 4, 5, 6, 7], 3), vec![5, 6, 7, 1, 2, 3, 4]);
    }

    #[test]
    fn test_rotate_by_zero() {
        assert_eq!(rotate_array(&[1, 2, 3, 4, 5], 0), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_rotate_by_length() {
        assert_eq!(rotate_array(&[1, 2, 3, 4, 5], 5), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(rotate_array(&[42], 1), vec![42]);
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(rotate_array(&[], 3), vec![]);
    }

    #[test]
    fn test_two_elements_by_one() {
        assert_eq!(rotate_array(&[1, 2], 1), vec![2, 1]);
    }

    #[test]
    fn test_n_minus_one() {
        assert_eq!(rotate_array(&[1, 2, 3, 4, 5], 4), vec![2, 3, 4, 5, 1]);
    }

    #[test]
    fn test_multiple_of_length() {
        assert_eq!(rotate_array(&[1, 2, 3], 6), vec![1, 2, 3]);
    }

    #[test]
    fn test_rotate_by_one_larger() {
        assert_eq!(rotate_array(&[1, 2, 3, 4, 5], 1), vec![5, 1, 2, 3, 4]);
    }
}
