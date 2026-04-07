include!("cousins-in-binary-tree.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>>) -> Option<Box<TreeNode>> {
        Some(Box::new(TreeNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<TreeNode>> {
        make_node(value, None, None)
    }

    fn build_7_node_tree() -> Option<Box<TreeNode>> {
        make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)))
    }

    #[test]
    fn test_cousins_1_and_5() {
        assert_eq!(cousins_in_binary_tree(build_7_node_tree(), 1, 5), true);
    }

    #[test]
    fn test_siblings_not_cousins() {
        assert_eq!(cousins_in_binary_tree(build_7_node_tree(), 1, 3), false);
    }

    #[test]
    fn test_different_depths_not_cousins() {
        assert_eq!(cousins_in_binary_tree(build_7_node_tree(), 2, 1), false);
    }

    #[test]
    fn test_null_root_returns_false() {
        assert_eq!(cousins_in_binary_tree(None, 1, 2), false);
    }

    #[test]
    fn test_cousins_3_and_7() {
        assert_eq!(cousins_in_binary_tree(build_7_node_tree(), 3, 7), true);
    }
}
