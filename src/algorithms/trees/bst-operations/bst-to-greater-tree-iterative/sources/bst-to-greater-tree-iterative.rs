// BST to Greater Tree (Iterative) — stack-based reverse in-order accumulation
use std::cell::RefCell;
use std::rc::Rc;

type NodeLink = Option<Rc<RefCell<BSTNode>>>;

struct BSTNode {
    value: i32,
    left: NodeLink,
    right: NodeLink,
}

fn bst_to_greater_tree_iterative(root: NodeLink) -> NodeLink {
    let mut stack: Vec<Rc<RefCell<BSTNode>>> = Vec::new(); // @step:initialize
    let mut running_sum = 0;
    let mut current = root.clone();

    loop {
        // Push all right nodes first (reverse in-order visits right subtree first)
        while let Some(ref node) = current.clone() {
            stack.push(node.clone()); // @step:search-node
            current = node.borrow().right.clone();
        }

        if stack.is_empty() {
            break;
        }

        // Process the top node
        let node = stack.pop().unwrap();

        // Accumulate sum and update node value
        running_sum += node.borrow().value; // @step:found
        node.borrow_mut().value = running_sum;

        // Move to left subtree
        current = node.borrow().left.clone(); // @step:search-node
    }

    root // @step:complete
}
