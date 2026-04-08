include!("../sources/delete-leaves-with-value.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BinaryNode>>, right: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
        Some(Box::new(BinaryNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BinaryNode>> {
        make_node(value, None, None)
    }

    #[test]
    fn test_single_target_node_returns_none() {
        let root = leaf(1);
        assert!(delete_leaves_with_value(root, 1).is_none());
    }

    #[test]
    fn test_no_matching_leaf_unchanged() {
        let root = make_node(1, leaf(2), leaf(3));
        let result = delete_leaves_with_value(root, 9);
        assert_eq!(result.as_ref().unwrap().value, 1);
        assert!(result.as_ref().unwrap().left.is_some());
        assert!(result.as_ref().unwrap().right.is_some());
    }

    #[test]
    fn test_deletes_leaf_with_target() {
        let root = make_node(1, leaf(2), leaf(3));
        let result = delete_leaves_with_value(root, 2);
        assert!(result.as_ref().unwrap().left.is_none());
        assert_eq!(result.as_ref().unwrap().right.as_ref().unwrap().value, 3);
    }

    #[test]
    fn test_cascades_deletion() {
        let root = make_node(1, leaf(2), None);
        let result = delete_leaves_with_value(root, 2);
        assert_eq!(result.as_ref().unwrap().value, 1);
        assert!(result.as_ref().unwrap().left.is_none());
    }
}
