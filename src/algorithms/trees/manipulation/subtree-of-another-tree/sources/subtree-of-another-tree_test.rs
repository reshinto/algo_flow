include!("subtree-of-another-tree.rs");

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
    fn test_null_subtree_returns_true() {
        assert_eq!(subtree_of_another_tree(leaf(1), None), true);
    }

    #[test]
    fn test_null_main_tree_returns_false() {
        assert_eq!(subtree_of_another_tree(None, leaf(1)), false);
    }

    #[test]
    fn test_subtree_is_left_subtree() {
        let main_tree = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        let sub_tree = make_node(2, leaf(1), leaf(3));
        assert_eq!(subtree_of_another_tree(main_tree, sub_tree), true);
    }

    #[test]
    fn test_subtree_not_in_main_tree() {
        let main_tree = make_node(4, leaf(2), leaf(6));
        let sub_tree = leaf(9);
        assert_eq!(subtree_of_another_tree(main_tree, sub_tree), false);
    }

    #[test]
    fn test_value_matches_but_structure_differs() {
        let main_tree = make_node(4, make_node(2, leaf(1), None), None);
        let sub_tree = make_node(2, None, leaf(1));
        assert_eq!(subtree_of_another_tree(main_tree, sub_tree), false);
    }
}
