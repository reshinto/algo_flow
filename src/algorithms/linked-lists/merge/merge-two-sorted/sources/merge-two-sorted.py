# Merge Two Sorted Lists — combine two sorted lists by comparing heads
class ListNode:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node

def merge_two_sorted(head_a, head_b):
    dummy = ListNode(-1)  # @step:initialize
    tail = dummy  # @step:initialize
    current_a = head_a  # @step:initialize
    current_b = head_b  # @step:initialize
    while current_a is not None and current_b is not None:
        if current_a.value <= current_b.value:  # @step:compare
            tail.next = current_a  # @step:traverse-next
            current_a = current_a.next  # @step:traverse-next
        else:
            tail.next = current_b  # @step:traverse-next
            current_b = current_b.next  # @step:traverse-next
        tail = tail.next  # @step:traverse-next
    tail.next = current_a if current_a is not None else current_b  # @step:complete
    return dummy.next  # @step:complete
