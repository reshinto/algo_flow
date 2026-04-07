include!("binary-tree-pruning.rs");

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
    fn test_returns_none_for_all_zeros() {
        let root = make_node(0, leaf(0), leaf(0));
        assert!(binary_tree_pruning(root).is_none());
    }

    #[test]
    fn test_returns_none_for_single_zero() {
        assert!(binary_tree_pruning(leaf(0)).is_none());
    }

    #[test]
    fn test_keeps_single_one_node() {
        let result = binary_tree_pruning(leaf(1));
        assert!(result.is_some());
        assert_eq!(result.unwrap().value, 1);
    }

    #[test]
    fn test_prunes_zero_only_subtrees() {
        let root = make_node(
            1,
            make_node(0, leaf(0), leaf(0)),
            make_node(1, leaf(0), leaf(1)),
        );
        let pruned = binary_tree_pruning(root).unwrap();
        assert!(pruned.left.is_none());
        assert!(pruned.right.is_some());
        let right = pruned.right.unwrap();
        assert!(right.left.is_none());
        assert_eq!(right.right.unwrap().value, 1);
    }

    #[test]
    fn test_null_input() {
        assert!(binary_tree_pruning(None).is_none());
    }
}
