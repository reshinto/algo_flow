// Same Tree Iterative — queue-based: compare pairs of nodes from both trees simultaneously

use std::collections::VecDeque;

struct BinaryNode {
    value: i32,
    left: Option<Box<BinaryNode>>,
    right: Option<Box<BinaryNode>>,
}

fn same_tree_iterative(tree_a: &Option<Box<BinaryNode>>, tree_b: &Option<Box<BinaryNode>>) -> bool {
    let mut queue: VecDeque<(*const Option<Box<BinaryNode>>, *const Option<Box<BinaryNode>>)> = VecDeque::new(); // @step:initialize
    queue.push_back((tree_a as *const _, tree_b as *const _));

    while !queue.is_empty() {
        // @step:visit
        let (ptr_a, ptr_b) = queue.pop_front().unwrap(); // @step:dequeue

        unsafe {
            let node_a = &*ptr_a;
            let node_b = &*ptr_b;

            match (node_a, node_b) {
                (None, None) => continue, // @step:compare
                (None, _) | (_, None) => return false, // @step:compare
                (Some(a), Some(b)) => {
                    if a.value != b.value {
                        return false; // @step:compare
                    }
                    queue.push_back((&a.left as *const _, &b.left as *const _)); // @step:enqueue
                    queue.push_back((&a.right as *const _, &b.right as *const _)); // @step:enqueue
                }
            }
        }
    }

    true // @step:complete
}
