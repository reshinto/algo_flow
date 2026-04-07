// Reverse Linked List — iteratively redirect each node's next pointer to its predecessor
struct ListNode {
    value: i32,
    next: Option<Box<ListNode>>,
}

fn reverse_linked_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut prev: Option<Box<ListNode>> = None; // @step:initialize
    let mut current = head; // @step:initialize
    while let Some(mut node) = current {
        let next_node = node.next.take(); // @step:traverse-next
        node.next = prev; // @step:reverse-pointer
        prev = Some(node); // @step:reverse-pointer
        current = next_node; // @step:traverse-next
    }
    prev // @step:complete
}
