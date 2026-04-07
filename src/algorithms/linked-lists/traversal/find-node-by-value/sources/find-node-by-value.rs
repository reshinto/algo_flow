// Find Node by Value — walk the list comparing each node's value to a target, returning the node or null
struct ListNode {
    value: i32,
    next: Option<Box<ListNode>>,
}

fn find_node_by_value(head: Option<&ListNode>, target: i32) -> Option<&ListNode> {
    let mut current: Option<&ListNode> = head; // @step:initialize
    while let Some(node) = current {
        if node.value == target {
            // @step:compare
            return Some(node); // @step:found
        }
        current = node.next.as_deref(); // @step:traverse-next
    }
    None // @step:complete
}
