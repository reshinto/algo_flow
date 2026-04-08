include!("../sources/slow-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sorts_unsorted_array() {
        assert_eq!(slow_sort(&[5, 3, 1, 4, 2]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn handles_already_sorted_array() {
        assert_eq!(slow_sort(&[1, 2, 3]), vec![1, 2, 3]);
    }

    #[test]
    fn handles_reverse_sorted_array() {
        assert_eq!(slow_sort(&[3, 2, 1]), vec![1, 2, 3]);
    }

    #[test]
    fn handles_array_with_duplicate_values() {
        assert_eq!(slow_sort(&[3, 1, 2, 1, 3]), vec![1, 1, 2, 3, 3]);
    }

    #[test]
    fn handles_single_element_array() {
        assert_eq!(slow_sort(&[42]), vec![42]);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(slow_sort(&[]), vec![]);
    }

    #[test]
    fn handles_array_with_negative_numbers() {
        assert_eq!(slow_sort(&[3, -1, 2]), vec![-1, 2, 3]);
    }

    #[test]
    fn does_not_mutate_original_array() {
        let original = vec![5, 3, 1, 4, 2];
        let sorted = slow_sort(&original);
        assert_eq!(sorted, vec![1, 2, 3, 4, 5]);
        assert_eq!(original, vec![5, 3, 1, 4, 2]);
    }
}
