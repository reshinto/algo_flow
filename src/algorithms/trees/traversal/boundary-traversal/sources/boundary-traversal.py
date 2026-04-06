# Boundary Traversal — left boundary + leaf nodes + right boundary (counterclockwise)

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def is_leaf(node) -> bool:
    return node.left is None and node.right is None

def add_left_boundary(node, result: list) -> None:  # @step:traverse-left
    if node is None or is_leaf(node):  # @step:traverse-left
        return
    result.append(node.value)  # @step:traverse-left
    if node.left is not None:  # @step:traverse-left
        add_left_boundary(node.left, result)  # @step:traverse-left
    else:  # @step:traverse-left
        add_left_boundary(node.right, result)  # @step:traverse-left

def add_leaves(node, result: list) -> None:  # @step:visit
    if node is None:  # @step:visit
        return
    if is_leaf(node):  # @step:visit
        result.append(node.value)  # @step:visit
        return
    add_leaves(node.left, result)  # @step:visit
    add_leaves(node.right, result)  # @step:visit

def add_right_boundary(node, result: list) -> None:  # @step:traverse-right
    if node is None or is_leaf(node):  # @step:traverse-right
        return
    if node.right is not None:  # @step:traverse-right
        add_right_boundary(node.right, result)  # @step:traverse-right
    else:  # @step:traverse-right
        add_right_boundary(node.left, result)  # @step:traverse-right
    result.append(node.value)  # @step:traverse-right

def boundary_traversal(root) -> list:
    result = []  # @step:initialize
    if root is None:  # @step:initialize
        return result

    if not is_leaf(root):  # @step:initialize
        result.append(root.value)  # @step:initialize

    add_left_boundary(root.left, result)  # @step:traverse-left
    add_leaves(root, result)  # @step:visit
    add_right_boundary(root.right, result)  # @step:traverse-right

    return result  # @step:complete
