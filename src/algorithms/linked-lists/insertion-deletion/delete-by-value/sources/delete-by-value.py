# Delete by Value — find and remove the first node matching a target value
class ListNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node


def delete_by_value(head, target):
    if head is None:  # @step:initialize
        return None  # @step:complete

    if head.value == target:  # @step:initialize
        # @step:compare
        return head.next  # @step:delete-node

    current = head  # @step:initialize
    previous = None  # @step:initialize

    while current is not None:  # @step:traverse-next
        if current.value == target:  # @step:compare
            if previous is not None:
                previous.next = current.next  # @step:delete-node
            return head  # @step:complete

        previous = current  # @step:traverse-next
        current = current.next  # @step:traverse-next

    return head  # @step:complete
