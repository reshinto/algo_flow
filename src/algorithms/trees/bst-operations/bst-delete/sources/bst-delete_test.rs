include!("bst-delete.rs");

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
        let result = bst_delete(tree, 1).unwrap();
        assert!(result.left.as_ref().unwrap().left.is_none());
    }

    #[test]
    fn test_deletes_node_with_one_child() {
        let tree = make_node(4, make_node(2, leaf(1), None), leaf(6));
        let result = bst_delete(tree, 2).unwrap();
        assert_eq!(result.left.as_ref().unwrap().value, 1);
    }

    #[test]
    fn test_deletes_node_with_two_children() {
        let tree = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)),
        );
        assert!(bst_delete(tree, 4).is_some());
    }

    #[test]
    fn test_returns_none_for_only_node() {
        assert!(bst_delete(leaf(5), 5).is_none());
    }

    #[test]
    fn test_unchanged_when_not_found() {
        let tree = make_node(4, leaf(2), leaf(6));
        let result = bst_delete(tree, 99).unwrap();
        assert_eq!(result.value, 4);
    }
}
