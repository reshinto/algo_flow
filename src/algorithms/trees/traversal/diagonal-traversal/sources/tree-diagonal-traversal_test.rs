include!("tree-diagonal-traversal.rs");

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
        assert_eq!(tree_diagonal_traversal(root), vec![vec![4, 6, 7], vec![2, 5, 3], vec![1]]);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(tree_diagonal_traversal(None), Vec::<Vec<i32>>::new());
    }

    #[test]
    fn test_single_node() {
        assert_eq!(tree_diagonal_traversal(leaf(42)), vec![vec![42]]);
    }

    #[test]
    fn test_right_skewed() {
        let root = make_node(1, None, make_node(2, None, leaf(3)));
        assert_eq!(tree_diagonal_traversal(root), vec![vec![1, 2, 3]]);
    }

    #[test]
    fn test_left_skewed() {
        let root = make_node(3, make_node(2, leaf(1), None), None);
        assert_eq!(tree_diagonal_traversal(root), vec![vec![3], vec![2], vec![1]]);
    }
}
