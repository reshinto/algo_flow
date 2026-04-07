include!("bst-lowest-common-ancestor-iterative.rs");

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
    fn test_lca_1_and_3() {
        assert_eq!(bst_lowest_common_ancestor_iterative(&build_tree(), 1, 3), Some(2));
    }

    #[test]
    fn test_lca_5_and_7() {
        assert_eq!(bst_lowest_common_ancestor_iterative(&build_tree(), 5, 7), Some(6));
    }

    #[test]
    fn test_lca_1_and_7() {
        assert_eq!(bst_lowest_common_ancestor_iterative(&build_tree(), 1, 7), Some(4));
    }
}
