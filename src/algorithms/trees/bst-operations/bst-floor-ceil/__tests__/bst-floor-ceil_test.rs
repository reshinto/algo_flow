include!("../sources/bst-floor-ceil.rs");

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
        let result = bst_floor_ceil(&tree, 5);
        assert_eq!(result.floor, Some(5));
        assert_eq!(result.ceil, Some(5));
    }

    #[test]
    fn test_null_floor_for_value_below_all() {
        let tree = build_tree();
        let result = bst_floor_ceil(&tree, 0);
        assert_eq!(result.floor, None);
        assert_eq!(result.ceil, Some(1));
    }

    #[test]
    fn test_null_ceil_for_value_above_all() {
        let tree = build_tree();
        let result = bst_floor_ceil(&tree, 8);
        assert_eq!(result.floor, Some(7));
        assert_eq!(result.ceil, None);
    }

    #[test]
    fn test_null_tree() {
        let result = bst_floor_ceil(&None, 5);
        assert_eq!(result.floor, None);
        assert_eq!(result.ceil, None);
    }
}
