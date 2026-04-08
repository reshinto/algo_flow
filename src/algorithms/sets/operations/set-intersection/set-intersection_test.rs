include!("sources/set-intersection.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn common_elements_default() {
        let result = set_intersection(&[1, 2, 3, 4, 5, 8], &[2, 4, 6, 8, 10]);
        assert_eq!(result, vec![2, 4, 8]);
    }

    #[test]
    fn disjoint_returns_empty() {
        let result = set_intersection(&[1, 3, 5], &[2, 4, 6]);
        assert!(result.is_empty());
    }

    #[test]
    fn a_subset_of_b() {
        let result = set_intersection(&[2, 4], &[1, 2, 3, 4, 5]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, vec![2, 4]);
    }

    #[test]
    fn no_duplicates_when_b_has_repeated_values() {
        let result = set_intersection(&[1, 2, 3], &[2, 2, 2]);
        assert_eq!(result, vec![2]);
    }

    #[test]
    fn empty_a() {
        let result = set_intersection(&[], &[1, 2, 3]);
        assert!(result.is_empty());
    }

    #[test]
    fn empty_b() {
        let result = set_intersection(&[1, 2, 3], &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn single_element_match() {
        let result = set_intersection(&[7], &[7]);
        assert_eq!(result, vec![7]);
    }

    #[test]
    fn single_element_no_match() {
        let result = set_intersection(&[7], &[8]);
        assert!(result.is_empty());
    }
}
