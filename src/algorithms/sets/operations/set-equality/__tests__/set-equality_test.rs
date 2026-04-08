include!("../sources/set-equality.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn same_elements_different_order() {
        assert!(set_equality(&[3, 1, 2], &[2, 3, 1]));
    }

    #[test]
    fn identical_arrays() {
        assert!(set_equality(&[1, 2, 3], &[1, 2, 3]));
    }

    #[test]
    fn b_has_element_not_in_a() {
        assert!(!set_equality(&[1, 2, 3], &[1, 2, 9]));
    }

    #[test]
    fn a_has_more_unique_elements() {
        assert!(!set_equality(&[1, 2, 3, 4], &[1, 2, 3]));
    }

    #[test]
    fn b_has_more_unique_elements() {
        assert!(!set_equality(&[1, 2, 3], &[1, 2, 3, 4]));
    }

    #[test]
    fn both_empty() {
        assert!(set_equality(&[], &[]));
    }

    #[test]
    fn a_empty_b_non_empty() {
        assert!(!set_equality(&[], &[1]));
    }

    #[test]
    fn b_empty_a_non_empty() {
        assert!(!set_equality(&[1], &[]));
    }

    #[test]
    fn duplicates_same_unique_set() {
        assert!(set_equality(&[1, 1, 2, 3], &[1, 2, 2, 3]));
    }

    #[test]
    fn single_element_equal() {
        assert!(set_equality(&[7], &[7]));
    }

    #[test]
    fn single_element_not_equal() {
        assert!(!set_equality(&[7], &[8]));
    }
}
