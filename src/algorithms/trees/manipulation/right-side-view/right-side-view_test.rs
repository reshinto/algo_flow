include!("sources/right-side-view.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BinaryNode>>, right: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
        Some(Box::new(BinaryNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BinaryNode>> {
        make_node(value, None, None)
    }

    #[test]
    fn test_null_returns_empty() {
        assert_eq!(right_side_view(None), vec![] as Vec<i32>);
    }

    #[test]
    fn test_single_node() {
        assert_eq!(right_side_view(leaf(1)), vec![1]);
    }

    #[test]
    fn test_7_node_bst() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(right_side_view(root), vec![4, 6, 7]);
    }

    #[test]
    fn test_left_skewed_tree() {
        let root = make_node(1, make_node(2, leaf(3), None), None);
        assert_eq!(right_side_view(root), vec![1, 2, 3]);
    }
}
