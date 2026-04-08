include!("../sources/flip-equivalent-trees.rs");

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
    fn test_two_null_trees() {
        assert_eq!(flip_equivalent_trees(&None, &None), true);
    }

    #[test]
    fn test_one_null_tree() {
        assert_eq!(flip_equivalent_trees(&leaf(1), &None), false);
        assert_eq!(flip_equivalent_trees(&None, &leaf(1)), false);
    }

    #[test]
    fn test_identical_trees() {
        let tree_a = make_node(1, leaf(2), leaf(3));
        let tree_b = make_node(1, leaf(2), leaf(3));
        assert_eq!(flip_equivalent_trees(&tree_a, &tree_b), true);
    }

    #[test]
    fn test_flipped_at_root() {
        let tree_a = make_node(1, leaf(2), leaf(3));
        let tree_b = make_node(1, leaf(3), leaf(2));
        assert_eq!(flip_equivalent_trees(&tree_a, &tree_b), true);
    }

    #[test]
    fn test_different_root_values() {
        assert_eq!(flip_equivalent_trees(&leaf(1), &leaf(2)), false);
    }

    #[test]
    fn test_different_leaf_values() {
        let tree_a = make_node(1, leaf(2), leaf(3));
        let tree_b = make_node(1, leaf(9), leaf(3));
        assert_eq!(flip_equivalent_trees(&tree_a, &tree_b), false);
    }
}
