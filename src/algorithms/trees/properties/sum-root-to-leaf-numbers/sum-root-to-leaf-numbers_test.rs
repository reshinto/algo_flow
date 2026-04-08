include!("sources/sum-root-to-leaf-numbers.rs");

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
        // 421+423+465+467=1776
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(sum_root_to_leaf_numbers(root), 1776);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(sum_root_to_leaf_numbers(None), 0);
    }

    #[test]
    fn test_single_node() {
        assert_eq!(sum_root_to_leaf_numbers(leaf(5)), 5);
    }

    #[test]
    fn test_simple_3_node_tree() {
        // 12+13=25
        let root = make_node(1, leaf(2), leaf(3));
        assert_eq!(sum_root_to_leaf_numbers(root), 25);
    }
}
