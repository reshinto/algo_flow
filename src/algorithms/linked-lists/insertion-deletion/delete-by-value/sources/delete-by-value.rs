// Delete by Value — find and remove the first node matching a target value
#[derive(PartialEq, Debug)]
struct ListNode {
    value: i32,
    next: Option<Box<ListNode>>,
}

fn delete_by_value(head: Option<Box<ListNode>>, target: i32) -> Option<Box<ListNode>> {
    let mut head = head;
    if head.is_none() {
        // @step:initialize
        return None; // @step:complete
    }

    if head.as_ref().unwrap().value == target {
        // @step:initialize
        // @step:compare
        return head.unwrap().next; // @step:delete-node
    }

    let mut current: &mut Box<ListNode> = head.as_mut().unwrap(); // @step:initialize

    loop {
        // @step:traverse-next
        let next_value = current.next.as_ref().map(|node| node.value);
        match next_value {
            None => break,
            Some(val) if val == target => {
                // @step:compare
                let next_next = current.next.as_mut().unwrap().next.take();
                current.next = next_next; // @step:delete-node
                return head; // @step:complete
            }
            Some(_) => {
                current = current.next.as_mut().unwrap(); // @step:traverse-next
            }
        }
    }

    head // @step:complete
}
