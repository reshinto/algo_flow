include!("sources/multiset-union.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorted_bag_union_default() {
        let result = multiset_union(&[1, 1, 2, 3, 3, 3], &[1, 1, 1, 2, 2, 3]);
        assert_eq!(result, vec![1, 1, 1, 2, 2, 3, 3, 3]);
    }

    #[test]
    fn both_empty() {
        let result = multiset_union(&[], &[]);
        assert!(result.is_empty());
    }

    #[test]
    fn array_b_empty_returns_array_a() {
        let result = multiset_union(&[1, 1, 2], &[]);
        assert_eq!(result, vec![1, 1, 2]);
    }

    #[test]
    fn array_a_empty_returns_array_b() {
        let result = multiset_union(&[], &[3, 3, 4]);
        assert_eq!(result, vec![3, 3, 4]);
    }

    #[test]
    fn max_count_from_larger_side() {
        let result = multiset_union(&[5, 5, 5], &[5]);
        assert_eq!(result, vec![5, 5, 5]);
    }

    #[test]
    fn identical_arrays() {
        let result = multiset_union(&[1, 2, 2], &[1, 2, 2]);
        assert_eq!(result, vec![1, 2, 2]);
    }

    #[test]
    fn single_element_same_value() {
        let result = multiset_union(&[7], &[7]);
        assert_eq!(result, vec![7]);
    }

    #[test]
    fn single_element_different_values() {
        let result = multiset_union(&[3], &[9]);
        assert_eq!(result, vec![3, 9]);
    }

    #[test]
    fn output_is_sorted() {
        let result = multiset_union(&[3, 1, 2], &[4, 2, 1]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(result, sorted);
    }
}
