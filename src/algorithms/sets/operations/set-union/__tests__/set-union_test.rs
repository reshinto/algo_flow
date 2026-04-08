include!("../sources/set-union.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn combines_unique_elements() {
        let result = set_union(&[1, 2, 3, 4, 5], &[3, 4, 5, 6, 7]);
        assert_eq!(result, vec![1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn disjoint_returns_all_elements() {
        let result = set_union(&[1, 3, 5], &[2, 4, 6]);
        assert_eq!(result, vec![1, 3, 5, 2, 4, 6]);
    }

    #[test]
    fn identical_arrays() {
        let result = set_union(&[1, 2, 3], &[1, 2, 3]);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn empty_a() {
        let result = set_union(&[], &[1, 2, 3]);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn empty_b() {
        let result = set_union(&[1, 2, 3], &[]);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn both_empty() {
        let result = set_union(&[], &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn single_element_match() {
        let result = set_union(&[7], &[7]);
        assert_eq!(result, vec![7]);
    }

    #[test]
    fn single_element_no_match() {
        let result = set_union(&[7], &[8]);
        assert_eq!(result, vec![7, 8]);
    }

    #[test]
    fn no_duplicates_from_repeated_b_values() {
        let result = set_union(&[1, 2, 3], &[2, 2, 2]);
        assert_eq!(result, vec![1, 2, 3]);
    }
}
