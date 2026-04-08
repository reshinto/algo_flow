include!("../sources/bst-to-greater-tree-iterative.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::rc::Rc;
    use std::cell::RefCell;

    fn make_node(value: i32, left: NodeLink, right: NodeLink) -> NodeLink {
        Some(Rc::new(RefCell::new(BSTNode { value, left, right })))
    }

    fn leaf(value: i32) -> NodeLink {
        make_node(value, None, None)
    }

    #[test]
    fn test_transforms_3_node_bst() {
        let tree = make_node(2, leaf(1), leaf(3));
        let result = bst_to_greater_tree_iterative(tree).unwrap();
        assert_eq!(result.borrow().value, 5);
        let right_val = result.borrow().right.as_ref().unwrap().borrow().value;
        assert_eq!(right_val, 3);
        let left_val = result.borrow().left.as_ref().unwrap().borrow().value;
        assert_eq!(left_val, 6);
    }

    #[test]
    fn test_single_node() {
        let single = leaf(7);
        let result = bst_to_greater_tree_iterative(single).unwrap();
        assert_eq!(result.borrow().value, 7);
    }

    #[test]
    fn test_null_tree() {
        assert!(bst_to_greater_tree_iterative(None).is_none());
    }
}
