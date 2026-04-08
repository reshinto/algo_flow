// Insert at Position — insert a new node at a specified index
struct ListNode {
    value: i32,
    next: Option<Box<ListNode>>,
}

fn insert_at_position(head: Option<Box<ListNode>>, value: i32, position: usize) -> Option<Box<ListNode>> {
    let new_node = Box::new(ListNode { value, next: None }); // @step:initialize

    if position == 0 {
        // @step:initialize
        let mut new_node = new_node;
        new_node.next = head; // @step:insert-node
        return Some(new_node); // @step:complete
    }

    let mut head = head; // @step:initialize
    let mut current_position = 0usize; // @step:initialize
    let mut cursor: &mut Option<Box<ListNode>> = &mut head;

    while cursor.is_some() && current_position < position - 1 {
        cursor = &mut cursor.as_mut().unwrap().next; // @step:traverse-next
        current_position += 1; // @step:traverse-next
    }

    if cursor.is_some() {
        let mut new_node = new_node;
        new_node.next = cursor.as_mut().unwrap().next.take(); // @step:insert-node
        cursor.as_mut().unwrap().next = Some(new_node); // @step:insert-node
    }

    head // @step:complete
}
