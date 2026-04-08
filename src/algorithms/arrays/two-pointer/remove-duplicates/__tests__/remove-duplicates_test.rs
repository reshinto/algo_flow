include!("../sources/remove-duplicates.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_sorted_array() {
        let (unique_count, result) = remove_duplicates(&[1, 1, 2, 2, 3]);
        assert_eq!(unique_count, 3);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn test_no_duplicates() {
        let (unique_count, result) = remove_duplicates(&[1, 2, 3, 4, 5]);
        assert_eq!(unique_count, 5);
        assert_eq!(result, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_all_same() {
        let (unique_count, result) = remove_duplicates(&[7, 7, 7, 7]);
        assert_eq!(unique_count, 1);
        assert_eq!(result, vec![7]);
    }

    #[test]
    fn test_single_element() {
        let (unique_count, result) = remove_duplicates(&[42]);
        assert_eq!(unique_count, 1);
        assert_eq!(result, vec![42]);
    }

    #[test]
    fn test_empty_array() {
        let (unique_count, result) = remove_duplicates(&[]);
        assert_eq!(unique_count, 0);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_long_runs() {
        let (unique_count, result) = remove_duplicates(&[1, 1, 1, 2, 2, 2, 3, 3, 3]);
        assert_eq!(unique_count, 3);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn test_default_input() {
        let (unique_count, result) = remove_duplicates(&[1, 1, 2, 2, 3, 4, 4, 5]);
        assert_eq!(unique_count, 5);
        assert_eq!(result, vec![1, 2, 3, 4, 5]);
    }
}
