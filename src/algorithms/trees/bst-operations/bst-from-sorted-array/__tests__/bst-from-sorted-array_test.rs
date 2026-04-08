include!("../sources/bst-from-sorted-array.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_root_at_mid_value() {
        let result = bst_from_sorted_array(&[1, 2, 3, 4, 5, 6, 7]).unwrap();
        assert_eq!(result.value, 4);
    }

    #[test]
    fn test_single_element() {
        let result = bst_from_sorted_array(&[42]).unwrap();
        assert_eq!(result.value, 42);
        assert!(result.left.is_none());
        assert!(result.right.is_none());
    }

    #[test]
    fn test_empty_array() {
        assert!(bst_from_sorted_array(&[]).is_none());
    }

    #[test]
    fn test_two_element_tree() {
        let result = bst_from_sorted_array(&[1, 2]).unwrap();
        assert_eq!(result.value, 1);
        assert_eq!(result.right.as_ref().unwrap().value, 2);
    }

    #[test]
    fn test_five_element_tree() {
        let result = bst_from_sorted_array(&[1, 2, 3, 4, 5]).unwrap();
        assert_eq!(result.value, 3);
        assert_eq!(result.left.as_ref().unwrap().value, 1);
        assert_eq!(result.right.as_ref().unwrap().value, 4);
    }
}
