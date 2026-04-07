include!("avl-insert-rotation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_inserts_single_value() {
        assert_eq!(avl_insert_rotation(&[5]), vec![5]);
    }

    #[test]
    fn test_rr_rotation_ascending() {
        assert_eq!(avl_insert_rotation(&[1, 2, 3]), vec![1, 2, 3]);
    }

    #[test]
    fn test_ll_rotation_descending() {
        assert_eq!(avl_insert_rotation(&[3, 2, 1]), vec![1, 2, 3]);
    }

    #[test]
    fn test_lr_rotation() {
        assert_eq!(avl_insert_rotation(&[3, 1, 2]), vec![1, 2, 3]);
    }

    #[test]
    fn test_rl_rotation() {
        assert_eq!(avl_insert_rotation(&[1, 3, 2]), vec![1, 2, 3]);
    }

    #[test]
    fn test_multiple_rotations_six_values() {
        let values = vec![10, 20, 30, 25, 28, 27];
        let mut result = avl_insert_rotation(&values);
        let mut expected = values.clone();
        expected.sort();
        result.sort();
        assert_eq!(result, expected);
    }

    #[test]
    fn test_empty_input() {
        assert_eq!(avl_insert_rotation(&[]), vec![]);
    }
}
