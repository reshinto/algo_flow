include!("../sources/merge-binary-trees-iterative.rs");

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
    fn test_tree_a_null_returns_tree_b() {
        let tree_b = leaf(1);
        let result = merge_binary_trees_iterative(None, tree_b);
        assert_eq!(result.unwrap().value, 1);
    }

    #[test]
    fn test_sums_two_single_nodes() {
        let result = merge_binary_trees_iterative(leaf(3), leaf(5));
        assert_eq!(result.unwrap().value, 8);
    }

    #[test]
    fn test_merges_7_node_trees() {
        let tree_a = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        let tree_b = make_node(40,
            make_node(20, leaf(10), leaf(30)),
            make_node(60, leaf(50), leaf(70)));
        let result = merge_binary_trees_iterative(tree_a, tree_b);
        assert_eq!(result.unwrap().value, 44);
    }
}
