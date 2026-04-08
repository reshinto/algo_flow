include!("sources/boundary-traversal.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_node(value: i32, left: Option<Box<BSTNode>>, right: Option<Box<BSTNode>>) -> Option<Box<BSTNode>> {
        Some(Box::new(BSTNode { value, left, right }))
    }

    fn leaf(value: i32) -> Option<Box<BSTNode>> {
        make_node(value, None, None)
    }

    #[test]
    fn test_balanced_7_node_bst() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)));
        assert_eq!(boundary_traversal(&root), vec![4, 2, 1, 3, 5, 7, 6]);
    }

    #[test]
    fn test_null_root() {
        assert_eq!(boundary_traversal(&None), Vec::<i32>::new());
    }

    #[test]
    fn test_single_node() {
        assert_eq!(boundary_traversal(&leaf(42)), vec![42]);
    }

    #[test]
    fn test_only_right_child() {
        let root = make_node(5, None, leaf(8));
        assert_eq!(boundary_traversal(&root), vec![5, 8]);
    }

    #[test]
    fn test_only_left_child() {
        let root = make_node(5, leaf(3), None);
        assert_eq!(boundary_traversal(&root), vec![5, 3]);
    }
}
