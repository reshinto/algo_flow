include!("sum-of-left-leaves.rs");

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
    fn test_7_node_bst() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(sum_of_left_leaves(root), 6);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(sum_of_left_leaves(None), 0);
    }

    #[test]
    fn test_single_node() {
        assert_eq!(sum_of_left_leaves(leaf(1)), 0);
    }

    #[test]
    fn test_left_leaf() {
        let root = make_node(1, leaf(5), None);
        assert_eq!(sum_of_left_leaves(root), 5);
    }

    #[test]
    fn test_no_left_leaves() {
        let root = make_node(1, None, leaf(2));
        assert_eq!(sum_of_left_leaves(root), 0);
    }
}
