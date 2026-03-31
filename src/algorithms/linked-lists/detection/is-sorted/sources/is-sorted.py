# Check if Sorted — verify each node's value ≤ the next
class ListNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node

def is_sorted(head):
    current = head  # @step:initialize
    while current is not None and current.next is not None:
        if current.value > current.next.value:  # @step:compare
            return False  # @step:complete
        current = current.next  # @step:traverse-next
    return True  # @step:complete
