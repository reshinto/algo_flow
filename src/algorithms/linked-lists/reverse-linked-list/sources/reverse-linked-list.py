# Reverse Linked List — iteratively redirect each node's next pointer to its predecessor
class ListNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node


def reverse_linked_list(head):
    prev = None  # @step:initialize
    current = head  # @step:initialize
    while current is not None:
        next_node = current.next  # @step:traverse-next
        current.next = prev  # @step:reverse-pointer
        prev = current  # @step:reverse-pointer
        current = next_node  # @step:traverse-next
    return prev  # @step:complete
