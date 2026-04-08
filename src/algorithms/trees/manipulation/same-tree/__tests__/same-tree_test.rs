include!("../sources/same-tree.rs");

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
        assert_eq!(same_tree(&None, &None), true);
    }

    #[test]
    fn test_one_null_tree() {
        assert_eq!(same_tree(&leaf(1), &None), false);
    }

    #[test]
    fn test_identical_single_nodes() {
        assert_eq!(same_tree(&leaf(1), &leaf(1)), true);
    }

    #[test]
    fn test_different_single_nodes() {
        assert_eq!(same_tree(&leaf(1), &leaf(2)), false);
    }

    #[test]
    fn test_identical_7_node_bsts() {
        let tree_a = make_node(4, make_node(2, leaf(1), leaf(3)), make_node(6, leaf(5), leaf(7)));
        let tree_b = make_node(4, make_node(2, leaf(1), leaf(3)), make_node(6, leaf(5), leaf(7)));
        assert_eq!(same_tree(&tree_a, &tree_b), true);
    }

    #[test]
    fn test_different_structures() {
        let tree_a = make_node(1, leaf(2), None);
        let tree_b = make_node(1, None, leaf(2));
        assert_eq!(same_tree(&tree_a, &tree_b), false);
    }
}
