include!("../sources/bitonic-sort-network.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_unsorted_array_of_power_of_2_size() {
        assert_eq!(bitonic_sort_network(&[6, 3, 8, 1, 7, 2, 5, 4]), vec![1, 2, 3, 4, 5, 6, 7, 8]);
    }

    #[test]
    fn sorts_array_that_is_not_a_power_of_2() {
        assert_eq!(bitonic_sort_network(&[5, 3, 1, 4, 2]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(bitonic_sort_network(&[1, 2, 3, 4]), vec![1, 2, 3, 4]);
    }

    #[test]
    fn handles_reverse_sorted_array() {
        assert_eq!(bitonic_sort_network(&[4, 3, 2, 1]), vec![1, 2, 3, 4]);
    }

    #[test]
    fn handles_array_with_duplicate_values() {
        assert_eq!(
            bitonic_sort_network(&[3, 1, 4, 1, 5, 9, 2, 6]),
            vec![1, 1, 2, 3, 4, 5, 6, 9]
        );
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(bitonic_sort_network(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(bitonic_sort_network(&[]), vec![]);
    }

    #[test]
    fn handles_array_with_negative_numbers() {
        assert_eq!(bitonic_sort_network(&[3, -1, 0, -5, 2]), vec![-5, -1, 0, 2, 3]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![4, 2, 3, 1];
        let sorted = bitonic_sort_network(&original);
        assert_eq!(sorted, vec![1, 2, 3, 4]);
        assert_eq!(original, vec![4, 2, 3, 1]);
    }
}
