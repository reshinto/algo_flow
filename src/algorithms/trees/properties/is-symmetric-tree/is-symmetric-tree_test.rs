include!("sources/is-symmetric-tree.rs");

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
    fn test_non_symmetric_bst() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(is_symmetric_tree(root), false);
    }

    #[test]
    fn test_symmetric_tree() {
        let root = make_node(1,
            make_node(2, leaf(3), leaf(4)),
            make_node(2, leaf(4), leaf(3)));
        assert_eq!(is_symmetric_tree(root), true);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(is_symmetric_tree(None), true);
    }

    #[test]
    fn test_single_node() {
        assert_eq!(is_symmetric_tree(leaf(1)), true);
    }

    #[test]
    fn test_asymmetric_tree() {
        let root = make_node(1,
            make_node(2, None, leaf(3)),
            make_node(2, None, leaf(3)));
        assert_eq!(is_symmetric_tree(root), false);
    }
}
