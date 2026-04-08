include!("sources/bst-validation-iterative.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BSTNode>>, right: Option<Box<BSTNode>>) -> Option<Box<BSTNode>> {
        Some(Box::new(BSTNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BSTNode>> {
        make_node(value, None, None)
    }

    fn build_valid_tree() -> Option<Box<BSTNode>> {
        make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)),
        )
    }

    #[test]
    fn test_validates_correct_bst() {
        assert_eq!(bst_validation_iterative(build_valid_tree()), true);
    }

    #[test]
    fn test_rejects_invalid_bst() {
        let invalid = make_node(5, leaf(6), leaf(7));
        assert_eq!(bst_validation_iterative(invalid), false);
    }

    #[test]
    fn test_accepts_null() {
        assert_eq!(bst_validation_iterative(None), true);
    }

    #[test]
    fn test_accepts_single_node() {
        assert_eq!(bst_validation_iterative(leaf(10)), true);
    }
}
