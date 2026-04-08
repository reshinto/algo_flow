include!("../sources/subset-check.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn a_is_proper_subset_of_b() {
        assert!(subset_check(&[2, 4], &[1, 2, 3, 4, 5]));
    }

    #[test]
    fn element_of_a_missing_from_b() {
        assert!(!subset_check(&[2, 9], &[1, 2, 3, 4, 5]));
    }

    #[test]
    fn identical_arrays() {
        assert!(subset_check(&[1, 2, 3], &[1, 2, 3]));
    }

    #[test]
    fn empty_a_is_subset_of_any() {
        assert!(subset_check(&[], &[1, 2, 3]));
    }

    #[test]
    fn empty_b_non_empty_a() {
        assert!(!subset_check(&[1], &[]));
    }

    #[test]
    fn both_empty() {
        assert!(subset_check(&[], &[]));
    }

    #[test]
    fn a_has_elements_not_in_b() {
        assert!(!subset_check(&[1, 2, 3, 4, 5], &[2, 4]));
    }

    #[test]
    fn a_equals_b_different_order() {
        assert!(subset_check(&[3, 1, 2], &[1, 2, 3]));
    }

    #[test]
    fn single_element_present_in_b() {
        assert!(subset_check(&[7], &[5, 6, 7, 8]));
    }

    #[test]
    fn single_element_absent_from_b() {
        assert!(!subset_check(&[9], &[5, 6, 7, 8]));
    }
}
