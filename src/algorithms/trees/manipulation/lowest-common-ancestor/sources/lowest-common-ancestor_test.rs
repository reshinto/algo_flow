include!("lowest-common-ancestor.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BinaryNode>>, right: Option<Box<BinaryNode>>) -> Option<Box<BinaryNode>> {
        Some(Box::new(BinaryNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BinaryNode>> {
        make_node(value, None, None)
    }

    fn build_7_node_tree() -> Option<Box<BinaryNode>> {
        make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)))
    }

    #[test]
    fn test_null_root_returns_none() {
        assert!(lowest_common_ancestor(None, 1, 2).is_none());
    }

    #[test]
    fn test_lca_node_2_for_1_and_3() {
        let result = lowest_common_ancestor(build_7_node_tree(), 1, 3);
        assert_eq!(result.unwrap().value, 2);
    }

    #[test]
    fn test_lca_root_for_opposite_subtrees() {
        let result = lowest_common_ancestor(build_7_node_tree(), 3, 5);
        assert_eq!(result.unwrap().value, 4);
    }

    #[test]
    fn test_ancestor_of_other() {
        let root = make_node(4, make_node(2, leaf(1), None), None);
        let result = lowest_common_ancestor(root, 2, 1);
        assert_eq!(result.unwrap().value, 2);
    }
}
