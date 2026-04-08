include!("sources/set-difference.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn elements_only_in_a() {
        let result = set_difference(&[1, 2, 3, 4, 5], &[3, 4, 5, 6, 7]);
        assert_eq!(result, vec![1, 2]);
    }

    #[test]
    fn disjoint_returns_all_of_a() {
        let result = set_difference(&[1, 3, 5], &[2, 4, 6]);
        assert_eq!(result, vec![1, 3, 5]);
    }

    #[test]
    fn a_subset_of_b_returns_empty() {
        let result = set_difference(&[2, 4], &[1, 2, 3, 4, 5]);
        assert!(result.is_empty());
    }

    #[test]
    fn empty_b_returns_all_of_a() {
        let result = set_difference(&[1, 2, 3], &[]);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn empty_a_returns_empty() {
        let result = set_difference(&[], &[1, 2, 3]);
        assert!(result.is_empty());
    }

    #[test]
    fn identical_arrays_return_empty() {
        let result = set_difference(&[1, 2, 3], &[1, 2, 3]);
        assert!(result.is_empty());
    }

    #[test]
    fn single_element_match() {
        let result = set_difference(&[7], &[7]);
        assert!(result.is_empty());
    }

    #[test]
    fn single_element_no_match() {
        let result = set_difference(&[7], &[8]);
        assert_eq!(result, vec![7]);
    }

    #[test]
    fn b_subset_of_a() {
        let result = set_difference(&[1, 2, 3, 4, 5], &[2, 4]);
        assert_eq!(result, vec![1, 3, 5]);
    }
}
