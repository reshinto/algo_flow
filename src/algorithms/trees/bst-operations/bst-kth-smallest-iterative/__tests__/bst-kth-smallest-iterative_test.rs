include!("../sources/bst-kth-smallest-iterative.rs");

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
    fn test_first_smallest() {
        assert_eq!(bst_kth_smallest_iterative(&build_tree(), 1), 1);
    }

    #[test]
    fn test_second_smallest() {
        assert_eq!(bst_kth_smallest_iterative(&build_tree(), 2), 2);
    }

    #[test]
    fn test_seventh_smallest() {
        assert_eq!(bst_kth_smallest_iterative(&build_tree(), 7), 7);
    }

    #[test]
    fn test_out_of_range() {
        assert_eq!(bst_kth_smallest_iterative(&build_tree(), 99), -1);
    }
}
