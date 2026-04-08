include!("../sources/counting-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_unsorted_array() {
        let result = counting_sort(&[3, 1, 4, 1, 5, 9, 2, 6]);
        assert_eq!(result, vec![1, 1, 2, 3, 4, 5, 6, 9]);
    }

    #[test]
    fn test_already_sorted() {
        let result = counting_sort(&[1, 2, 3, 4, 5]);
        assert_eq!(result, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_reverse_sorted() {
        let result = counting_sort(&[5, 4, 3, 2, 1]);
        assert_eq!(result, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_all_same_elements() {
        let result = counting_sort(&[3, 3, 3, 3]);
        assert_eq!(result, vec![3, 3, 3, 3]);
    }

    #[test]
    fn test_single_element() {
        let result = counting_sort(&[7]);
        assert_eq!(result, vec![7]);
    }

    #[test]
    fn test_empty_array() {
        let result = counting_sort(&[]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_duplicates() {
        let result = counting_sort(&[4, 2, 2, 8, 3, 3, 1]);
        assert_eq!(result, vec![1, 2, 2, 3, 3, 4, 8]);
    }

    #[test]
    fn test_default_input() {
        let result = counting_sort(&[4, 2, 2, 8, 3, 3, 1, 7, 5]);
        assert_eq!(result, vec![1, 2, 2, 3, 3, 4, 5, 7, 8]);
    }
}
