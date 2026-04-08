include!("../sources/maximum-path-sum.rs");

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
        // best path: 3+2+4+6+7 = 22
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(maximum_path_sum(root), 22);
    }

    #[test]
    fn test_single_node() {
        assert_eq!(maximum_path_sum(leaf(-3)), -3);
    }

    #[test]
    fn test_all_negative() {
        let root = make_node(-1, leaf(-2), leaf(-3));
        assert_eq!(maximum_path_sum(root), -1);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(maximum_path_sum(None), i32::MIN);
    }
}
