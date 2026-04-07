include!("bst-delete-iterative.rs");

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
    fn test_deletes_leaf_node() {
        let tree = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)),
        );
        let result = bst_delete_iterative(tree, 7).unwrap();
        assert!(result.right.as_ref().unwrap().right.is_none());
    }

    #[test]
    fn test_deletes_node_with_two_children() {
        let tree = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)),
        );
        let result = bst_delete_iterative(tree, 6).unwrap();
        assert_eq!(result.right.as_ref().unwrap().value, 7);
    }

    #[test]
    fn test_returns_none_for_only_node() {
        assert!(bst_delete_iterative(leaf(5), 5).is_none());
    }

    #[test]
    fn test_unchanged_when_absent() {
        let tree = make_node(4, leaf(2), leaf(6));
        let result = bst_delete_iterative(tree, 99).unwrap();
        assert_eq!(result.value, 4);
    }
}
