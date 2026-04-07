include!("tree-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_unsorted_array() {
        assert_eq!(tree_sort(&[5, 3, 7, 1, 4, 6, 2]), vec![1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(tree_sort(&[1, 2, 3, 4, 5]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_reverse_sorted_array() {
        assert_eq!(tree_sort(&[5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_array_with_duplicate_values() {
        assert_eq!(tree_sort(&[3, 1, 4, 1, 5, 9, 2, 6, 5]), vec![1, 1, 2, 3, 4, 5, 5, 6, 9]);
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(tree_sort(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(tree_sort(&[]), vec![]);
    }

    #[test]
    fn handles_array_with_negative_numbers() {
        assert_eq!(tree_sort(&[3, -1, 0, -5, 2]), vec![-5, -1, 0, 2, 3]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![3, 1, 2];
        let sorted = tree_sort(&original);
        assert_eq!(sorted, vec![1, 2, 3]);
        assert_eq!(original, vec![3, 1, 2]);
    }
}
