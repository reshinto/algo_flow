// Linked List Length — count nodes by traversing from head to null
struct ListNode {
    value: i32,
    next: Option<Box<ListNode>>,
}

fn linked_list_length(head: Option<&ListNode>) -> usize {
    let mut count = 0usize; // @step:initialize
    let mut current: Option<&ListNode> = head; // @step:initialize
    while let Some(node) = current {
        count += 1; // @step:traverse-next
        current = node.next.as_deref(); // @step:traverse-next
    }
    count // @step:complete
}
