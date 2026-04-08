include!("sources/rotate-array-cyclic.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_rotate_by_two() {
        assert_eq!(rotate_array_cyclic(&[1, 2, 3, 4, 5, 6], 2), vec![5, 6, 1, 2, 3, 4]);
    }

    #[test]
    fn test_rotate_by_one() {
        assert_eq!(rotate_array_cyclic(&[1, 2, 3, 4, 5], 1), vec![5, 1, 2, 3, 4]);
    }

    #[test]
    fn test_rotate_by_length() {
        assert_eq!(rotate_array_cyclic(&[1, 2, 3, 4], 4), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_rotate_larger_than_length() {
        assert_eq!(rotate_array_cyclic(&[1, 2, 3, 4, 5, 6], 8), vec![5, 6, 1, 2, 3, 4]);
    }

    #[test]
    fn test_rotate_by_zero() {
        assert_eq!(rotate_array_cyclic(&[1, 2, 3, 4], 0), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(rotate_array_cyclic(&[], 3), vec![]);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(rotate_array_cyclic(&[42], 5), vec![42]);
    }

    #[test]
    fn test_two_elements() {
        assert_eq!(rotate_array_cyclic(&[1, 2], 1), vec![2, 1]);
    }

    #[test]
    fn test_single_long_cycle() {
        assert_eq!(rotate_array_cyclic(&[1, 2, 3, 4, 5, 6], 1), vec![6, 1, 2, 3, 4, 5]);
    }
}
