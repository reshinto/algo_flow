include!("sources/binary-tree-tilt.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        Some(Box::new(TreeNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<TreeNode>> {
        make_node(value, None, None)
    }

    #[test]
    fn test_null_root_returns_zero() {
        assert_eq!(binary_tree_tilt(&None), 0);
    }

    #[test]
    fn test_single_node_returns_zero() {
        assert_eq!(binary_tree_tilt(&leaf(1)), 0);
    }

    #[test]
    fn test_simple_3_node_tree() {
        let root = make_node(1, leaf(2), leaf(3));
        assert_eq!(binary_tree_tilt(&root), 1);
    }

    #[test]
    fn test_non_negative_for_any_tree() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert!(binary_tree_tilt(&root) >= 0);
    }
}
