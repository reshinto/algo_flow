// Check if Sorted — verify each node's value ≤ the next
struct ListNode {
    value: i32,
    next: Option<Box<ListNode>>,
}

fn is_sorted(head: Option<&ListNode>) -> bool {
    let mut current: Option<&ListNode> = head; // @step:initialize
    while let Some(node) = current {
        if let Some(next_node) = node.next.as_deref() {
            if node.value > next_node.value {
                // @step:compare
                return false; // @step:complete
            }
        }
        current = node.next.as_deref(); // @step:traverse-next
    }
    true // @step:complete
}
