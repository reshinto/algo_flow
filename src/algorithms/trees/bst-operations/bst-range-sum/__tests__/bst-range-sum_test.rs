include!("../sources/bst-range-sum.rs");

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
    fn test_sums_range_2_to_6() {
        assert_eq!(bst_range_sum(&build_tree(), 2, 6), 20);
    }

    #[test]
    fn test_sums_all_values() {
        assert_eq!(bst_range_sum(&build_tree(), 1, 7), 28);
    }

    #[test]
    fn test_no_match_returns_zero() {
        assert_eq!(bst_range_sum(&build_tree(), 10, 20), 0);
    }

    #[test]
    fn test_single_match() {
        assert_eq!(bst_range_sum(&build_tree(), 4, 4), 4);
    }

    #[test]
    fn test_null_tree() {
        assert_eq!(bst_range_sum(&None, 1, 7), 0);
    }
}
