// BST to Sorted Circular Doubly Linked List — in-place pointer manipulation
use std::cell::RefCell;
use std::rc::Rc;

type DLLLink = Option<Rc<RefCell<DLLNode>>>;

struct DLLNode {
    value: i32,
    left: DLLLink,
    right: DLLLink,
}

impl DLLNode {
    fn new(value: i32) -> Rc<RefCell<Self>> {
        Rc::new(RefCell::new(DLLNode { value, left: None, right: None }))
    }
}

fn tree_to_dll_inorder(
    node: DLLLink,
    head: &mut DLLLink,
    tail: &mut DLLLink,
) {
    let node = match node {
        None => return, // @step:initialize
        Some(n) => n,
    };

    let left = node.borrow().left.clone();
    tree_to_dll_inorder(left, head, tail); // @step:traverse-left

    // Visit: connect current node to the doubly linked list
    if tail.is_none() {
        *head = Some(node.clone()); // @step:visit
    } else {
        let tail_node = tail.as_ref().unwrap().clone();
        tail_node.borrow_mut().right = Some(node.clone()); // @step:visit
        node.borrow_mut().left = Some(tail_node);          // @step:visit
    }
    *tail = Some(node.clone()); // @step:visit

    let right = node.borrow().right.clone();
    tree_to_dll_inorder(right, head, tail); // @step:traverse-right
}

fn tree_to_doubly_linked_list(root: DLLLink) -> DLLLink {
    if root.is_none() {
        return None; // @step:initialize
    }

    let mut head: DLLLink = None; // @step:initialize
    let mut tail: DLLLink = None; // @step:initialize

    tree_to_dll_inorder(root, &mut head, &mut tail);

    // Close the circular link
    if let (Some(ref h), Some(ref t)) = (head.clone(), tail.clone()) {
        t.borrow_mut().right = Some(h.clone()); // @step:visit
        h.borrow_mut().left = Some(t.clone());  // @step:visit
    }

    head // @step:complete
}
