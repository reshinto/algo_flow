include!("cyclic-sort.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_unsorted() {
        assert_eq!(cyclic_sort(&[3, 5, 2, 1, 4]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_already_sorted() {
        assert_eq!(cyclic_sort(&[1, 2, 3, 4]), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_reverse_sorted() {
        assert_eq!(cyclic_sort(&[5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_single_element() {
        assert_eq!(cyclic_sort(&[1]), vec![1]);
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(cyclic_sort(&[]), vec![]);
    }

    #[test]
    fn test_two_elements_swapped() {
        assert_eq!(cyclic_sort(&[2, 1]), vec![1, 2]);
    }

    #[test]
    fn test_default_input() {
        assert_eq!(cyclic_sort(&[3, 5, 2, 1, 4, 6]), vec![1, 2, 3, 4, 5, 6]);
    }

    #[test]
    fn test_longer_array() {
        assert_eq!(
            cyclic_sort(&[8, 3, 6, 1, 5, 9, 2, 7, 4, 10]),
            vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        );
    }
}
