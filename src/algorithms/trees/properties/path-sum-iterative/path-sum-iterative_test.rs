include!("sources/path-sum-iterative.rs");

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
    fn test_path_sum_exists() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(path_sum_iterative(root, 7), true);
    }

    #[test]
    fn test_path_sum_not_exists() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(path_sum_iterative(root, 100), false);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(path_sum_iterative(None, 5), false);
    }

    #[test]
    fn test_single_node_matching() {
        assert_eq!(path_sum_iterative(leaf(5), 5), true);
    }
}
