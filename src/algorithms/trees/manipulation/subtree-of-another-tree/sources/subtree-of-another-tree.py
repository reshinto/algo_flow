# Subtree of Another Tree — recursive: for each node in main tree, check if subtree matches

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def is_same_tree(tree_a, tree_b) -> bool:
    if tree_a is None and tree_b is None:
        return True
    if tree_a is None or tree_b is None:
        return False
    if tree_a.value != tree_b.value:
        return False
    return is_same_tree(tree_a.left, tree_b.left) and is_same_tree(tree_a.right, tree_b.right)

def subtree_of_another_tree(main_tree, sub_tree) -> bool:
    if sub_tree is None:  # @step:initialize
        return True
    if main_tree is None:  # @step:initialize
        return False

    # Check if the tree rooted at main_tree matches sub_tree
    if is_same_tree(main_tree, sub_tree):  # @step:compare
        return True

    # Recursively check left and right subtrees
    return (subtree_of_another_tree(main_tree.left, sub_tree) or  # @step:traverse-left
            subtree_of_another_tree(main_tree.right, sub_tree))  # @step:traverse-right
