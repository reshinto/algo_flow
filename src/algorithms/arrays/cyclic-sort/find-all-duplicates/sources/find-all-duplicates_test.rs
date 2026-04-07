include!("find-all-duplicates.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let mut result = find_all_duplicates(&[4, 3, 2, 7, 8, 2, 3, 1]);
        result.sort();
        assert_eq!(result, vec![2, 3]);
    }

    #[test]
    fn test_no_duplicates() {
        let result = find_all_duplicates(&[1, 2, 3, 4, 5]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_single_duplicate() {
        let result = find_all_duplicates(&[1, 2, 3, 2]);
        assert_eq!(result, vec![2]);
    }

    #[test]
    fn test_multiple_duplicates() {
        let mut result = find_all_duplicates(&[1, 1, 2, 2, 3, 3]);
        result.sort();
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn test_single_element() {
        let result = find_all_duplicates(&[1]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_empty_array() {
        let result = find_all_duplicates(&[]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_all_appear_twice() {
        let mut result = find_all_duplicates(&[2, 1, 2, 1]);
        result.sort();
        assert_eq!(result, vec![1, 2]);
    }
}
