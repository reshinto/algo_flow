include!("../sources/strand-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_unsorted_array() {
        assert_eq!(strand_sort(&[64, 34, 25, 12, 22, 11, 90]), vec![11, 12, 22, 25, 34, 64, 90]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(strand_sort(&[1, 2, 3, 4, 5]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_reverse_sorted_array() {
        assert_eq!(strand_sort(&[5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_array_with_duplicate_values() {
        assert_eq!(strand_sort(&[3, 1, 4, 1, 5, 9, 2, 6, 5]), vec![1, 1, 2, 3, 4, 5, 5, 6, 9]);
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(strand_sort(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(strand_sort(&[]), vec![]);
    }

    #[test]
    fn handles_array_with_negative_numbers() {
        assert_eq!(strand_sort(&[3, -1, 0, -5, 2]), vec![-5, -1, 0, 2, 3]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![3, 1, 2];
        let sorted = strand_sort(&original);
        assert_eq!(sorted, vec![1, 2, 3]);
        assert_eq!(original, vec![3, 1, 2]);
    }

    #[test]
    fn handles_two_element_array() {
        assert_eq!(strand_sort(&[2, 1]), vec![1, 2]);
    }

    #[test]
    fn extracts_multiple_strands() {
        assert_eq!(strand_sort(&[3, 1, 4, 2, 5]), vec![1, 2, 3, 4, 5]);
    }
}
