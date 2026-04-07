include!("bst-search-iterative.rs");

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
    fn test_finds_value() {
        assert_eq!(bst_search_iterative(&build_tree(), 6), Some(6));
    }

    #[test]
    fn test_returns_none_for_missing() {
        assert_eq!(bst_search_iterative(&build_tree(), 10), None);
    }

    #[test]
    fn test_finds_root() {
        assert_eq!(bst_search_iterative(&build_tree(), 4), Some(4));
    }

    #[test]
    fn test_null_tree() {
        assert_eq!(bst_search_iterative(&None, 5), None);
    }

    #[test]
    fn test_finds_left_leaf() {
        assert_eq!(bst_search_iterative(&build_tree(), 1), Some(1));
    }
}
