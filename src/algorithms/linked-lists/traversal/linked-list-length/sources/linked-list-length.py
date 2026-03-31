# Linked List Length — count nodes by traversing from head to null
class ListNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node

def linked_list_length(head):
    count = 0  # @step:initialize
    current = head  # @step:initialize
    while current is not None:
        count += 1  # @step:traverse-next
        current = current.next  # @step:traverse-next
    return count  # @step:complete
