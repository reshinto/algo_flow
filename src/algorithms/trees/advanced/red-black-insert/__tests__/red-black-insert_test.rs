include!("../sources/red-black-insert.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_inserts_single_value() {
        assert_eq!(red_black_insert(&[5]), vec![5]);
    }

    #[test]
    fn test_sorted_inorder_default_input() {
        let values = vec![7, 3, 18, 10, 22, 8, 11, 26];
        let result = red_black_insert(&values);
        let mut expected = values.clone();
        expected.sort();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_ascending_insert() {
        assert_eq!(red_black_insert(&[1, 2, 3, 4, 5]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_descending_insert() {
        assert_eq!(red_black_insert(&[5, 4, 3, 2, 1]), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_empty_input() {
        assert_eq!(red_black_insert(&[]), vec![]);
    }

    #[test]
    fn test_duplicates_handled() {
        let result = red_black_insert(&[5, 3, 5]);
        assert!(!result.is_empty());
    }
}
