include!("sources/maximum-depth.rs");

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
    fn test_balanced_7_node_bst() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(maximum_depth(root), 3);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(maximum_depth(None), 0);
    }

    #[test]
    fn test_single_node() {
        assert_eq!(maximum_depth(leaf(42)), 1);
    }

    #[test]
    fn test_left_skewed_tree() {
        let root = make_node(5, make_node(4, make_node(3, make_node(2, leaf(1), None), None), None), None);
        assert_eq!(maximum_depth(root), 5);
    }

    #[test]
    fn test_two_level_tree() {
        let root = make_node(1, leaf(2), None);
        assert_eq!(maximum_depth(root), 2);
    }
}
