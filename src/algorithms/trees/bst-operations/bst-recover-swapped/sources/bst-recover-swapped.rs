// BST Recover Swapped (Recursive) — in-order detect two swapped nodes and fix
use std::cell::RefCell;
use std::rc::Rc;

type NodeLink = Option<Rc<RefCell<BSTNode>>>;

struct BSTNode {
    value: i32,
    left: NodeLink,
    right: NodeLink,
}

fn recover_inorder(
    node: &NodeLink,
    first_violation: &mut NodeLink,
    second_violation: &mut NodeLink,
    previous_node: &mut NodeLink,
) {
    let node = match node {
        None => return, // @step:initialize
        Some(n) => n.clone(),
    };

    let left = node.borrow().left.clone();
    recover_inorder(&left, first_violation, second_violation, previous_node); // @step:search-node

    // Check if BST property is violated at this position
    if let Some(ref prev) = previous_node.clone() {
        if prev.borrow().value > node.borrow().value {
            if first_violation.is_none() {
                // First violation: previous is the first swapped node
                *first_violation = Some(prev.clone()); // @step:found
            }
            // Second violation: current is always updated to the second swapped node
            *second_violation = Some(node.clone()); // @step:found
        }
    }
    *previous_node = Some(node.clone());

    let right = node.borrow().right.clone();
    recover_inorder(&right, first_violation, second_violation, previous_node); // @step:search-node
}

fn bst_recover_swapped(root: &NodeLink) {
    let mut first_violation: NodeLink = None; // @step:initialize
    let mut second_violation: NodeLink = None;
    let mut previous_node: NodeLink = None;

    recover_inorder(root, &mut first_violation, &mut second_violation, &mut previous_node);

    // Swap the values of the two misplaced nodes to recover the BST
    if let (Some(ref first), Some(ref second)) = (first_violation, second_violation) {
        let temp = first.borrow().value;
        first.borrow_mut().value = second.borrow().value; // @step:complete
        second.borrow_mut().value = temp;
    }
}
