# Insert at Position — insert a new node at a specified index
class ListNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node


def insert_at_position(head, value, position):
    new_node = ListNode(value)  # @step:initialize

    if position == 0:  # @step:initialize
        new_node.next = head  # @step:insert-node
        return new_node  # @step:complete

    current = head  # @step:initialize
    current_position = 0  # @step:initialize

    while current is not None and current_position < position - 1:
        current = current.next  # @step:traverse-next
        current_position += 1  # @step:traverse-next

    if current is not None:
        new_node.next = current.next  # @step:insert-node
        current.next = new_node  # @step:insert-node

    return head  # @step:complete
