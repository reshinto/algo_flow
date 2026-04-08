include!("sources/multiset-intersection.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorted_bag_intersection_default() {
        let result = multiset_intersection(&[1, 1, 2, 3, 3, 3], &[1, 1, 1, 2, 2, 3]);
        assert_eq!(result, vec![1, 1, 2, 3]);
    }

    #[test]
    fn both_empty() {
        let result = multiset_intersection(&[], &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn array_a_empty() {
        let result = multiset_intersection(&[], &[1, 2, 3]);
        assert!(result.is_empty());
    }

    #[test]
    fn array_b_empty() {
        let result = multiset_intersection(&[1, 2, 3], &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn disjoint_arrays() {
        let result = multiset_intersection(&[1, 3, 5], &[2, 4, 6]);
        assert!(result.is_empty());
    }

    #[test]
    fn min_count_from_smaller_side() {
        let result = multiset_intersection(&[5, 5, 5], &[5]);
        assert_eq!(result, vec![5]);
    }

    #[test]
    fn identical_arrays() {
        let result = multiset_intersection(&[1, 2, 2, 3], &[1, 2, 2, 3]);
        assert_eq!(result, vec![1, 2, 2, 3]);
    }

    #[test]
    fn single_element_match() {
        let result = multiset_intersection(&[7], &[7]);
        assert_eq!(result, vec![7]);
    }

    #[test]
    fn single_element_no_match() {
        let result = multiset_intersection(&[7], &[8]);
        assert!(result.is_empty());
    }

    #[test]
    fn output_is_sorted() {
        let result = multiset_intersection(&[3, 1, 2, 2], &[4, 2, 1, 3]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(result, sorted);
    }
}
