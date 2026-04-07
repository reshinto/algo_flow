include!("superset-check.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn a_is_proper_superset_of_b() {
        assert!(superset_check(&[1, 2, 3, 4, 5], &[2, 4]));
    }

    #[test]
    fn element_of_b_missing_from_a() {
        assert!(!superset_check(&[1, 2, 3, 4, 5], &[2, 9]));
    }

    #[test]
    fn identical_arrays() {
        assert!(superset_check(&[1, 2, 3], &[1, 2, 3]));
    }

    #[test]
    fn empty_b_a_is_superset() {
        assert!(superset_check(&[1, 2, 3], &[]));
    }

    #[test]
    fn empty_a_non_empty_b() {
        assert!(!superset_check(&[], &[1]));
    }

    #[test]
    fn both_empty() {
        assert!(superset_check(&[], &[]));
    }

    #[test]
    fn b_has_elements_not_in_a() {
        assert!(!superset_check(&[2, 4], &[1, 2, 3, 4, 5]));
    }

    #[test]
    fn b_equals_a_different_order() {
        assert!(superset_check(&[1, 2, 3], &[3, 1, 2]));
    }

    #[test]
    fn single_element_b_present_in_a() {
        assert!(superset_check(&[5, 6, 7, 8], &[7]));
    }

    #[test]
    fn single_element_b_absent_from_a() {
        assert!(!superset_check(&[5, 6, 7, 8], &[9]));
    }
}
