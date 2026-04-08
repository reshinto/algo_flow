include!("../sources/bst-floor-ceil-iterative.rs");

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
    fn test_exact_match() {
        let tree = build_tree();
        let result = bst_floor_ceil_iterative(&tree, 3);
        assert_eq!(result.floor, Some(3));
        assert_eq!(result.ceil, Some(3));
    }

    #[test]
    fn test_null_floor_below_all() {
        let tree = build_tree();
        let result = bst_floor_ceil_iterative(&tree, 0);
        assert_eq!(result.floor, None);
        assert_eq!(result.ceil, Some(1));
    }

    #[test]
    fn test_null_tree() {
        let result = bst_floor_ceil_iterative(&None, 5);
        assert_eq!(result.floor, None);
        assert_eq!(result.ceil, None);
    }
}
