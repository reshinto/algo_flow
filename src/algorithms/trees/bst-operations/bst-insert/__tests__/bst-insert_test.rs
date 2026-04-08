include!("../sources/bst-insert.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BSTNode>>, right: Option<Box<BSTNode>>) -> Option<Box<BSTNode>> {
        Some(Box::new(BSTNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BSTNode>> {
        make_node(value, None, None)
    }

    fn build_tree() -> Option<Box<BSTNode>> {
        make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)),
        )
    }

    #[test]
    fn test_inserts_greater_than_all() {
        let result = bst_insert(build_tree(), 8);
        assert_eq!(result.right.as_ref().unwrap().right.as_ref().unwrap().right.as_ref().unwrap().value, 8);
    }

    #[test]
    fn test_inserts_into_left_subtree() {
        let result = bst_insert(build_tree(), 0);
        assert_eq!(result.left.as_ref().unwrap().left.as_ref().unwrap().left.as_ref().unwrap().value, 0);
    }

    #[test]
    fn test_creates_root_from_none() {
        let result = bst_insert(None, 10);
        assert_eq!(result.value, 10);
    }

    #[test]
    fn test_ignores_duplicates() {
        let tree = make_node(4, leaf(2), leaf(6));
        let result = bst_insert(tree, 4);
        assert_eq!(result.value, 4);
    }
}
