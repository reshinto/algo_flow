# BST to Sorted Circular Doubly Linked List — in-place pointer manipulation

class DLLNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def tree_to_doubly_linked_list(root) -> object:
    if not root:
        return None  # @step:initialize

    head = [None]  # @step:initialize
    tail = [None]  # @step:initialize

    def inorder(node):
        if not node:
            return  # @step:initialize

        inorder(node.left)  # @step:traverse-left

        if not tail[0]:
            head[0] = node  # @step:visit
        else:
            tail[0].right = node  # @step:visit
            node.left = tail[0]  # @step:visit
        tail[0] = node  # @step:visit

        inorder(node.right)  # @step:traverse-right

    inorder(root)

    if head[0] and tail[0]:
        tail[0].right = head[0]  # @step:visit
        head[0].left = tail[0]  # @step:visit

    return head[0]  # @step:complete
