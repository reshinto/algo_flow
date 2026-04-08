include!("sources/quick-sort-3-way.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_unsorted_array() {
        assert_eq!(quick_sort_3_way(&[64, 34, 25, 12, 22, 11, 90]), vec![11, 12, 22, 25, 34, 64, 90]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(quick_sort_3_way(&[1, 2, 3, 4, 5]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_reverse_sorted_array() {
        assert_eq!(quick_sort_3_way(&[5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_array_with_many_duplicates_3_way_specialization() {
        assert_eq!(quick_sort_3_way(&[3, 3, 3, 3, 3]), vec![3, 3, 3, 3, 3]);
    }

    #[test]
    fn handles_array_with_some_duplicate_values() {
        assert_eq!(
            quick_sort_3_way(&[3, 1, 4, 1, 5, 9, 2, 6, 5]),
            vec![1, 1, 2, 3, 4, 5, 5, 6, 9]
        );
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(quick_sort_3_way(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(quick_sort_3_way(&[]), vec![]);
    }

    #[test]
    fn handles_array_with_negative_numbers() {
        assert_eq!(quick_sort_3_way(&[3, -1, 0, -5, 2]), vec![-5, -1, 0, 2, 3]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![3, 1, 2];
        let sorted = quick_sort_3_way(&original);
        assert_eq!(sorted, vec![1, 2, 3]);
        assert_eq!(original, vec![3, 1, 2]);
    }
}
