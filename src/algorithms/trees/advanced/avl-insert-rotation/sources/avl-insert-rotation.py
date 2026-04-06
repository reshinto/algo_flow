# AVL Tree Insertion with Rotations — maintains balance via LL/RR/LR/RL rotations

class AVLNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None
        self.height = 1

def avl_insert_rotation(values: list) -> list:
    root = None  # @step:initialize

    def height(node) -> int:
        return node.height if node else 0  # @step:check-balance

    def update_height(node) -> None:
        node.height = 1 + max(height(node.left), height(node.right))  # @step:update-height

    def balance_factor(node) -> int:
        return height(node.left) - height(node.right)  # @step:check-balance

    def rotate_right(pivot_node):
        left_child = pivot_node.left  # @step:rotate-right
        pivot_node.left = left_child.right
        left_child.right = pivot_node
        update_height(pivot_node)
        update_height(left_child)
        return left_child  # @step:rotate-right

    def rotate_left(pivot_node):
        right_child = pivot_node.right  # @step:rotate-left
        pivot_node.right = right_child.left
        right_child.left = pivot_node
        update_height(pivot_node)
        update_height(right_child)
        return right_child  # @step:rotate-left

    def insert(node, value):
        if not node:
            return AVLNode(value)  # @step:insert-node

        if value < node.value:
            node.left = insert(node.left, value)  # @step:traverse-left
        elif value > node.value:
            node.right = insert(node.right, value)  # @step:traverse-right
        else:
            return node  # @step:visit

        update_height(node)
        balance = balance_factor(node)  # @step:check-balance

        # LL case
        if balance > 1 and node.left and value < node.left.value:
            return rotate_right(node)  # @step:rotate-right
        # RR case
        if balance < -1 and node.right and value > node.right.value:
            return rotate_left(node)  # @step:rotate-left
        # LR case
        if balance > 1 and node.left:
            node.left = rotate_left(node.left)  # @step:rotate-left
            return rotate_right(node)  # @step:rotate-right
        # RL case
        if balance < -1 and node.right:
            node.right = rotate_right(node.right)  # @step:rotate-right
            return rotate_left(node)  # @step:rotate-left

        return node

    for value in values:
        root = insert(root, value)  # @step:insert-node

    result = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        result.append(node.value)
        inorder(node.right)
    inorder(root)
    return result  # @step:complete
