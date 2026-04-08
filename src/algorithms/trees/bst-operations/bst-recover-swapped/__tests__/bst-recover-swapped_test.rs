include!("../sources/bst-recover-swapped.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::rc::Rc;
    use std::cell::RefCell;

    fn make_node(value: i32, left: NodeLink, right: NodeLink) -> NodeLink {
        let node = Rc::new(RefCell::new(BSTNode { value, left, right }));
        Some(node)
    }

    fn leaf(value: i32) -> NodeLink {
        make_node(value, None, None)
    }

    fn collect_inorder(root: &NodeLink) -> Vec<i32> {
        let mut result = vec![];
        fn traverse(node: &NodeLink, result: &mut Vec<i32>) {
            if let Some(n) = node {
                let n = n.borrow();
                traverse(&n.left, result);
                result.push(n.value);
                traverse(&n.right, result);
            }
        }
        traverse(root, &mut result);
        result
    }

    #[test]
    fn test_recovers_non_adjacent_swapped() {
        // Swap 3 and 7
        let root = make_node(4,
            make_node(2, leaf(1), leaf(7)),
            make_node(6, leaf(5), leaf(3)),
        );
        bst_recover_swapped(&root);
        assert_eq!(collect_inorder(&root), vec![1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn test_recovers_adjacent_swapped() {
        // Swap 2 and 3
        let root = make_node(4,
            make_node(3, leaf(1), leaf(2)),
            make_node(6, leaf(5), leaf(7)),
        );
        bst_recover_swapped(&root);
        assert_eq!(collect_inorder(&root), vec![1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn test_valid_bst_unchanged() {
        let root = make_node(4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)),
        );
        bst_recover_swapped(&root);
        assert_eq!(collect_inorder(&root), vec![1, 2, 3, 4, 5, 6, 7]);
    }
}
