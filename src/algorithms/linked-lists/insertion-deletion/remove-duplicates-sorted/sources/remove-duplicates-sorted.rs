// Remove Duplicates from Sorted List — skip duplicate nodes in a sorted list
struct ListNode {
    value: i32,
    next: Option<Box<ListNode>>,
}

fn remove_duplicates_sorted(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut head = head;
    let mut current: &mut Option<Box<ListNode>> = &mut head;
    // @step:initialize
    while current.is_some() && current.as_ref().unwrap().next.is_some() {
        // @step:compare
        let current_value = current.as_ref().unwrap().value;
        let next_value = current.as_ref().unwrap().next.as_ref().unwrap().value;
        if current_value == next_value {
            // @step:delete-node
            let next_next = current.as_mut().unwrap().next.as_mut().unwrap().next.take();
            current.as_mut().unwrap().next = next_next;
        } else {
            current = &mut current.as_mut().unwrap().next; // @step:traverse-next
        }
    }
    head // @step:complete
}
