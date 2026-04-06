# Flip Equivalent Trees — recursive: trees are flip-equivalent if children match or are swapped

class BinaryNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def flip_equivalent_trees(tree_a, tree_b) -> bool:
    if tree_a is None and tree_b is None:  # @step:initialize
        return True
    if tree_a is None or tree_b is None:  # @step:compare
        return False
    if tree_a.value != tree_b.value:  # @step:compare
        return False

    # Check if children match without flipping
    no_flip = (  # @step:traverse-left
        flip_equivalent_trees(tree_a.left, tree_b.left) and  # @step:traverse-left
        flip_equivalent_trees(tree_a.right, tree_b.right)  # @step:traverse-right
    )

    # Check if children match with flipping
    with_flip = (  # @step:traverse-left
        flip_equivalent_trees(tree_a.left, tree_b.right) and  # @step:traverse-left
        flip_equivalent_trees(tree_a.right, tree_b.left)  # @step:traverse-right
    )

    return no_flip or with_flip  # @step:visit
