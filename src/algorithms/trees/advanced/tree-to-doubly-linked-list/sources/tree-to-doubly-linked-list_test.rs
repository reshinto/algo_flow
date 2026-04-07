include!("tree-to-doubly-linked-list.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::rc::Rc;
    use std::cell::RefCell;

    fn make_node(value: i32, left: DLLLink, right: DLLLink) -> DLLLink {
        let node = DLLNode::new(value);
        node.borrow_mut().left = left;
        node.borrow_mut().right = right;
        Some(node)
    }

    fn leaf(value: i32) -> DLLLink {
        Some(DLLNode::new(value))
    }

    #[test]
    fn test_none_input() {
        assert!(tree_to_doubly_linked_list(None).is_none());
    }

    #[test]
    fn test_single_node_circular() {
        let root = leaf(5);
        let head = tree_to_doubly_linked_list(root).unwrap();
        assert_eq!(head.borrow().value, 5);
        // circular: head.right == head
        let right = head.borrow().right.clone().unwrap();
        assert!(Rc::ptr_eq(&right, &head));
        let left = head.borrow().left.clone().unwrap();
        assert!(Rc::ptr_eq(&left, &head));
    }

    #[test]
    fn test_3_node_bst() {
        let root = make_node(2, leaf(1), leaf(3));
        let head = tree_to_doubly_linked_list(root).unwrap();
        assert_eq!(head.borrow().value, 1);
        let node2 = head.borrow().right.clone().unwrap();
        assert_eq!(node2.borrow().value, 2);
        let node3 = node2.borrow().right.clone().unwrap();
        assert_eq!(node3.borrow().value, 3);
        // circular: node3.right == head
        let tail_right = node3.borrow().right.clone().unwrap();
        assert!(Rc::ptr_eq(&tail_right, &head));
    }

    #[test]
    fn test_7_node_bst() {
        let root = make_node(
            4,
            make_node(2, leaf(1), leaf(3)),
            make_node(6, leaf(5), leaf(7)),
        );
        let head = tree_to_doubly_linked_list(root).unwrap();
        let mut values = vec![];
        let mut current = head.clone();
        for _ in 0..7 {
            values.push(current.borrow().value);
            let next = current.borrow().right.clone().unwrap();
            current = next;
        }
        assert_eq!(values, vec![1, 2, 3, 4, 5, 6, 7]);
    }
}
