include!("sources/pigeonhole-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_unsorted_array() {
        assert_eq!(pigeonhole_sort(&[64, 34, 25, 12, 22, 11, 90]), vec![11, 12, 22, 25, 34, 64, 90]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(pigeonhole_sort(&[1, 2, 3, 4, 5]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_reverse_sorted_array() {
        assert_eq!(pigeonhole_sort(&[5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_array_with_duplicate_values() {
        assert_eq!(pigeonhole_sort(&[3, 1, 4, 1, 5, 9, 2, 6, 5]), vec![1, 1, 2, 3, 4, 5, 5, 6, 9]);
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(pigeonhole_sort(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(pigeonhole_sort(&[]), vec![]);
    }

    #[test]
    fn handles_negative_numbers_using_offset() {
        assert_eq!(pigeonhole_sort(&[3, -1, 0, -5, 2]), vec![-5, -1, 0, 2, 3]);
    }

    #[test]
    fn handles_array_where_all_elements_are_the_same() {
        assert_eq!(pigeonhole_sort(&[7, 7, 7, 7]), vec![7, 7, 7, 7]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![3, 1, 2];
        let sorted = pigeonhole_sort(&original);
        assert_eq!(sorted, vec![1, 2, 3]);
        assert_eq!(original, vec![3, 1, 2]);
    }
}
