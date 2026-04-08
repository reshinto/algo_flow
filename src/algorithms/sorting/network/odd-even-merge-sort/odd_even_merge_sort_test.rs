include!("sources/odd-even-merge-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_unsorted_array() {
        assert_eq!(odd_even_merge_sort(&[6, 3, 8, 1, 7, 2, 5, 4]), vec![1, 2, 3, 4, 5, 6, 7, 8]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(odd_even_merge_sort(&[1, 2, 3, 4, 5]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_reverse_sorted_array() {
        assert_eq!(odd_even_merge_sort(&[5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_array_with_duplicate_values() {
        assert_eq!(
            odd_even_merge_sort(&[3, 1, 4, 1, 5, 9, 2, 6, 5]),
            vec![1, 1, 2, 3, 4, 5, 5, 6, 9]
        );
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(odd_even_merge_sort(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(odd_even_merge_sort(&[]), vec![]);
    }

    #[test]
    fn handles_array_with_negative_numbers() {
        assert_eq!(odd_even_merge_sort(&[3, -1, 0, -5, 2]), vec![-5, -1, 0, 2, 3]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![4, 2, 3, 1];
        let sorted = odd_even_merge_sort(&original);
        assert_eq!(sorted, vec![1, 2, 3, 4]);
        assert_eq!(original, vec![4, 2, 3, 1]);
    }
}
