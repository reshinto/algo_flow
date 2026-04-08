// Merge Two Sorted Lists — combine two sorted lists by comparing heads
struct ListNode {
    value: i32,
    next: Option<Box<ListNode>>,
}

fn merge_two_sorted(
    head_a: Option<Box<ListNode>>,
    head_b: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    let mut dummy = Box::new(ListNode { value: -1, next: None }); // @step:initialize
    let mut tail: &mut Box<ListNode> = &mut dummy; // @step:initialize
    let mut current_a = head_a; // @step:initialize
    let mut current_b = head_b; // @step:initialize

    while current_a.is_some() && current_b.is_some() {
        if current_a.as_ref().unwrap().value <= current_b.as_ref().unwrap().value {
            // @step:compare
            let mut node = current_a.take().unwrap();
            current_a = node.next.take(); // @step:traverse-next
            tail.next = Some(node); // @step:traverse-next
        } else {
            let mut node = current_b.take().unwrap();
            current_b = node.next.take(); // @step:traverse-next
            tail.next = Some(node); // @step:traverse-next
        }
        tail = tail.next.as_mut().unwrap(); // @step:traverse-next
    }
    tail.next = if current_a.is_some() { current_a } else { current_b }; // @step:complete
    dummy.next // @step:complete
}
