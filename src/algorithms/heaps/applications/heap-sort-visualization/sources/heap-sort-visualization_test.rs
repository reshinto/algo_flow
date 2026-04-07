include!("heap-sort-visualization.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let result = heap_sort_visualization(&[9, 5, 7, 1, 3, 8, 2, 6, 4]);
        assert_eq!(result, vec![1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }

    #[test]
    fn test_already_sorted() {
        let result = heap_sort_visualization(&[1, 2, 3, 4, 5]);
        assert_eq!(result, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_reverse_sorted() {
        let result = heap_sort_visualization(&[5, 4, 3, 2, 1]);
        assert_eq!(result, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_duplicates() {
        let result = heap_sort_visualization(&[3, 1, 4, 1, 5, 9, 2, 6, 5]);
        assert_eq!(result, vec![1, 1, 2, 3, 4, 5, 5, 6, 9]);
    }

    #[test]
    fn test_single_element() {
        let result = heap_sort_visualization(&[42]);
        assert_eq!(result, vec![42]);
    }

    #[test]
    fn test_empty_array() {
        let result = heap_sort_visualization(&[]);
        assert_eq!(result, Vec::<i64>::new());
    }

    #[test]
    fn test_two_elements() {
        let result = heap_sort_visualization(&[2, 1]);
        assert_eq!(result, vec![1, 2]);
    }

    #[test]
    fn test_negative_values() {
        let result = heap_sort_visualization(&[-3, 1, -5, 4, 0]);
        assert_eq!(result, vec![-5, -3, 0, 1, 4]);
    }
}
