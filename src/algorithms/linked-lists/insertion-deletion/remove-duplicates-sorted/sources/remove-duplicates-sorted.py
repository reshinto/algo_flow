# Remove Duplicates from Sorted List — skip duplicate nodes in a sorted list
class ListNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node


def remove_duplicates_sorted(head):
    current = head  # @step:initialize
    while current is not None and current.next is not None:
        # @step:compare
        if current.value == current.next.value:
            # @step:delete-node
            current.next = current.next.next
        else:
            current = current.next  # @step:traverse-next
    return head  # @step:complete
