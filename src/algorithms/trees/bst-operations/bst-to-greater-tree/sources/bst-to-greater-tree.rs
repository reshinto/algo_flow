// BST to Greater Tree (Recursive) — reverse in-order: accumulate running sum
use std::cell::RefCell;
use std::rc::Rc;

type NodeLink = Option<Rc<RefCell<BSTNode>>>;

struct BSTNode {
    value: i32,
    left: NodeLink,
    right: NodeLink,
}

fn reverse_inorder(node: &NodeLink, running_sum: &mut i32) {
    let node = match node {
        None => return, // @step:initialize
        Some(n) => n.clone(),
    };

    // Visit right subtree first (larger values in descending order)
    let right = node.borrow().right.clone();
    reverse_inorder(&right, running_sum); // @step:search-node

    // Add current node's value to running sum, then update node
    *running_sum += node.borrow().value; // @step:found
    node.borrow_mut().value = *running_sum;

    // Visit left subtree (smaller values)
    let left = node.borrow().left.clone();
    reverse_inorder(&left, running_sum); // @step:search-node
}

fn bst_to_greater_tree(root: NodeLink) -> NodeLink {
    let mut running_sum = 0; // @step:initialize

    reverse_inorder(&root, &mut running_sum);
    root // @step:complete
}
