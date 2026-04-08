include!("sources/bst-iterator.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BSTNode>>, right: Option<Box<BSTNode>>) -> BSTNode {
        BSTNode { value, left, right }
    }

    fn leaf_node(value: i32) -> BSTNode {
        BSTNode { value, left: None, right: None }
    }

    #[test]
    fn test_sorted_ascending_order() {
        let tree = make_node(4,
            Some(Box::new(make_node(2, Some(Box::new(leaf_node(1))), Some(Box::new(leaf_node(3)))))),
            Some(Box::new(make_node(6, Some(Box::new(leaf_node(5))), Some(Box::new(leaf_node(7)))))),
        );
        assert_eq!(bst_iterator(Some(&tree)), vec![1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn test_null_tree_returns_empty() {
        assert_eq!(bst_iterator(None), vec![]);
    }

    #[test]
    fn test_single_element() {
        let node = leaf_node(42);
        assert_eq!(bst_iterator(Some(&node)), vec![42]);
    }

    #[test]
    fn test_right_skewed_tree() {
        let skewed = make_node(1, None, Some(Box::new(make_node(2, None, Some(Box::new(leaf_node(3)))))));
        assert_eq!(bst_iterator(Some(&skewed)), vec![1, 2, 3]);
    }
}
