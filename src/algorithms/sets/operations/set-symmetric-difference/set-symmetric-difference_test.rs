include!("sources/set-symmetric-difference.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn elements_exclusive_to_each_array() {
        let result = set_symmetric_difference(&[1, 2, 3, 4], &[3, 4, 5, 6]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, vec![1, 2, 5, 6]);
    }

    #[test]
    fn disjoint_arrays_return_all_elements() {
        let result = set_symmetric_difference(&[1, 3, 5], &[2, 4, 6]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, vec![1, 2, 3, 4, 5, 6]);
    }

    #[test]
    fn identical_arrays_return_empty() {
        let result = set_symmetric_difference(&[1, 2, 3], &[1, 2, 3]);
        assert!(result.is_empty());
    }

    #[test]
    fn empty_b_returns_all_of_a() {
        let result = set_symmetric_difference(&[1, 2, 3], &[]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, vec![1, 2, 3]);
    }

    #[test]
    fn empty_a_returns_all_of_b() {
        let result = set_symmetric_difference(&[], &[1, 2, 3]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, vec![1, 2, 3]);
    }

    #[test]
    fn single_element_match() {
        let result = set_symmetric_difference(&[7], &[7]);
        assert!(result.is_empty());
    }

    #[test]
    fn single_element_no_match() {
        let result = set_symmetric_difference(&[7], &[8]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, vec![7, 8]);
    }

    #[test]
    fn a_subset_of_b() {
        let result = set_symmetric_difference(&[2, 4], &[1, 2, 3, 4, 5]);
        let mut sorted = result.clone();
        sorted.sort();
        assert_eq!(sorted, vec![1, 3, 5]);
    }
}
