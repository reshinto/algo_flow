# Red-Black Tree Insertion — maintains balance via color rebalancing and rotations

RED = "red"
BLACK = "black"

class RBNode:
    def __init__(self, value):
        self.value = value
        self.color = RED
        self.left = None
        self.right = None
        self.parent = None

def red_black_insert(values: list) -> list:
    root = [None]  # @step:initialize

    def rotate_left(node):
        right_child = node.right  # @step:rotate-left
        node.right = right_child.left
        if right_child.left:
            right_child.left.parent = node
        right_child.parent = node.parent
        if not node.parent:
            root[0] = right_child
        elif node is node.parent.left:
            node.parent.left = right_child
        else:
            node.parent.right = right_child
        right_child.left = node
        node.parent = right_child  # @step:rotate-left

    def rotate_right(node):
        left_child = node.left  # @step:rotate-right
        node.left = left_child.right
        if left_child.right:
            left_child.right.parent = node
        left_child.parent = node.parent
        if not node.parent:
            root[0] = left_child
        elif node is node.parent.right:
            node.parent.right = left_child
        else:
            node.parent.left = left_child
        left_child.right = node
        node.parent = left_child  # @step:rotate-right

    def fix_insert(current):
        while current.parent and current.parent.color == RED:  # @step:recolor-node
            parent = current.parent
            grandparent = parent.parent
            if parent is grandparent.left:
                uncle = grandparent.right
                if uncle and uncle.color == RED:
                    parent.color = BLACK  # @step:recolor-node
                    uncle.color = BLACK  # @step:recolor-node
                    grandparent.color = RED  # @step:recolor-node
                    current = grandparent
                else:
                    if current is parent.right:
                        current = parent
                        rotate_left(current)  # @step:rotate-left
                    current.parent.color = BLACK  # @step:recolor-node
                    grandparent.color = RED  # @step:recolor-node
                    rotate_right(grandparent)  # @step:rotate-right
            else:
                uncle = grandparent.left
                if uncle and uncle.color == RED:
                    parent.color = BLACK  # @step:recolor-node
                    uncle.color = BLACK  # @step:recolor-node
                    grandparent.color = RED  # @step:recolor-node
                    current = grandparent
                else:
                    if current is parent.left:
                        current = parent
                        rotate_right(current)  # @step:rotate-right
                    current.parent.color = BLACK  # @step:recolor-node
                    grandparent.color = RED  # @step:recolor-node
                    rotate_left(grandparent)  # @step:rotate-left
        root[0].color = BLACK  # @step:recolor-node

    def insert(value):
        new_node = RBNode(value)  # @step:insert-node
        if not root[0]:
            root[0] = new_node
            root[0].color = BLACK  # @step:recolor-node
            return
        current = root[0]
        while True:
            if value < current.value:
                if not current.left:
                    current.left = new_node
                    new_node.parent = current
                    break
                current = current.left
            else:
                if not current.right:
                    current.right = new_node
                    new_node.parent = current
                    break
                current = current.right
        fix_insert(new_node)  # @step:recolor-node

    for value in values:
        insert(value)  # @step:insert-node

    result = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        result.append(node.value)
        inorder(node.right)
    inorder(root[0])
    return result  # @step:complete
