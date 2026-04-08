include!("sources/bst-preorder-iterative.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BSTNode>>, right: Option<Box<BSTNode>>) -> Option<Box<BSTNode>> {
        Some(Box::new(BSTNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BSTNode>> {
        make_node(value, None, None)
    }

    #[test]
    fn test_balanced_7_node_bst() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(bst_preorder_iterative(root), vec![4, 2, 1, 3, 6, 5, 7]);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(bst_preorder_iterative(None), Vec::<i32>::new());
    }

    #[test]
    fn test_single_node() {
        assert_eq!(bst_preorder_iterative(leaf(42)), vec![42]);
    }

    #[test]
    fn test_left_skewed() {
        let root = make_node(5, make_node(4, make_node(3, make_node(2, leaf(1), None), None), None), None);
        assert_eq!(bst_preorder_iterative(root), vec![5, 4, 3, 2, 1]);
    }

    #[test]
    fn test_right_skewed() {
        let root = make_node(1, None, make_node(2, None, make_node(3, None, make_node(4, None, leaf(5)))));
        assert_eq!(bst_preorder_iterative(root), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_left_child_only() {
        let root = make_node(5, leaf(3), None);
        assert_eq!(bst_preorder_iterative(root), vec![5, 3]);
    }

    #[test]
    fn test_right_child_only() {
        let root = make_node(5, None, leaf(8));
        assert_eq!(bst_preorder_iterative(root), vec![5, 8]);
    }
}
