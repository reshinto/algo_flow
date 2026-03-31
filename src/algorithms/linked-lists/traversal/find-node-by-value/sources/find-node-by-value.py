# Find Node by Value — walk the list comparing each node's value to a target, returning the node or null
class ListNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node

def find_node_by_value(head, target):
    current = head  # @step:initialize
    while current is not None:
        if current.value == target:
            # @step:compare
            return current  # @step:found
        current = current.next  # @step:traverse-next
    return None  # @step:complete
