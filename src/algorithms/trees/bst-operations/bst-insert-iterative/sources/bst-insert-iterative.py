# BST Insert (Iterative) — track parent, insert at correct leaf position

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def bst_insert_iterative(root, insert_value: int):
    new_node = BSTNode(insert_value)  # @step:initialize

    if root is None:  # @step:insert-child
        return new_node

    current = root

    while True:
        if insert_value < current.value:
            # Go left — if no left child, insert here
            if current.left is None:
                current.left = new_node  # @step:insert-child
                break
            current = current.left  # @step:search-node
        elif insert_value > current.value:
            # Go right — if no right child, insert here
            if current.right is None:
                current.right = new_node  # @step:insert-child
                break
            current = current.right  # @step:search-node
        else:
            # Duplicate value — do nothing
            break

    return root  # @step:complete
