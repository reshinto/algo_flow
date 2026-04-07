include!("count-complete-tree-nodes.rs");

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
    fn test_7_node_perfect_tree() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(count_complete_tree_nodes(root), 7);
    }

    #[test]
    fn test_null_root_returns_zero() {
        assert_eq!(count_complete_tree_nodes(None), 0);
    }

    #[test]
    fn test_single_node() {
        assert_eq!(count_complete_tree_nodes(leaf(1)), 1);
    }

    #[test]
    fn test_3_node_perfect_tree() {
        let root = make_node(1, leaf(2), leaf(3));
        assert_eq!(count_complete_tree_nodes(root), 3);
    }
}
