include!("sources/reverse-level-order.rs");

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
        assert_eq!(reverse_level_order(root), vec![vec![1, 3, 5, 7], vec![2, 6], vec![4]]);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(reverse_level_order(None), Vec::<Vec<i32>>::new());
    }

    #[test]
    fn test_single_node() {
        assert_eq!(reverse_level_order(leaf(42)), vec![vec![42]]);
    }

    #[test]
    fn test_left_skewed() {
        let root = make_node(5, make_node(4, leaf(3), None), None);
        assert_eq!(reverse_level_order(root), vec![vec![3], vec![4], vec![5]]);
    }

    #[test]
    fn test_right_skewed() {
        let root = make_node(1, None, make_node(2, None, leaf(3)));
        assert_eq!(reverse_level_order(root), vec![vec![3], vec![2], vec![1]]);
    }
}
