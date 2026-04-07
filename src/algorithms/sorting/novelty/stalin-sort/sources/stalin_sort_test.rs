include!("stalin-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn eliminates_out_of_order_elements() {
        // 3 survives (first), 1 < 3 eliminated, 2 < 3 eliminated -> [3]
        assert_eq!(stalin_sort(&[3, 1, 2]), vec![3]);
    }

    #[test]
    fn keeps_all_elements_when_array_is_already_sorted() {
        assert_eq!(stalin_sort(&[1, 2, 3, 4, 5]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn reduces_reverse_sorted_array_to_first_element() {
        assert_eq!(stalin_sort(&[5, 4, 3, 2, 1]), vec![5]);
    }

    #[test]
    fn handles_array_with_partial_order() {
        assert_eq!(stalin_sort(&[3, 1, 4, 2, 5]), vec![3, 4, 5]);
    }

    #[test]
    fn handles_array_with_equal_elements() {
        assert_eq!(stalin_sort(&[2, 2, 2, 2]), vec![2, 2, 2, 2]);
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(stalin_sort(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(stalin_sort(&[]), vec![]);
    }

    #[test]
    fn handles_array_with_duplicate_max_values() {
        assert_eq!(stalin_sort(&[5, 3, 5]), vec![5, 5]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![3, 1, 2];
        let result = stalin_sort(&original);
        assert_eq!(result, vec![3]);
        assert_eq!(original, vec![3, 1, 2]);
    }
}
