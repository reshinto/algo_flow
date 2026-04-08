from typing import Optional

class CartesianNode:
    def __init__(self, value: int, original_index: int) -> None:
        self.value = value
        self.original_index = original_index
        self.left_child: Optional["CartesianNode"] = None
        self.right_child: Optional["CartesianNode"] = None

def cartesian_tree_sort(input_array: list[int]) -> list[int]:  # @step:initialize
    array_length = len(input_array)  # @step:initialize
    if array_length == 0:  # @step:initialize
        return []  # @step:initialize

    # Build the Cartesian tree using a stack-based O(n) construction
    # @step:build-tree
    node_stack: list[CartesianNode] = []  # @step:build-tree

    for build_index in range(array_length):
        new_node = CartesianNode(input_array[build_index], build_index)  # @step:compare

        # Pop nodes from the stack that are larger than the new node (min-heap property)
        last_popped: Optional[CartesianNode] = None  # @step:swap
        while node_stack and node_stack[-1].value > new_node.value:  # @step:swap
            last_popped = node_stack.pop()  # @step:swap
        new_node.left_child = last_popped  # @step:swap
        if node_stack:  # @step:swap
            node_stack[-1].right_child = new_node  # @step:swap
        node_stack.append(new_node)  # @step:swap

    tree_root: Optional[CartesianNode] = node_stack[0] if node_stack else None  # @step:build-tree

    # Merge two Cartesian sub-trees while maintaining min-heap order
    def merge_trees(
        left_tree: Optional[CartesianNode],
        right_tree: Optional[CartesianNode],
    ) -> Optional[CartesianNode]:
        if left_tree is None:  # @step:extract
            return right_tree
        if right_tree is None:  # @step:extract
            return left_tree

        if left_tree.value <= right_tree.value:  # @step:compare
            left_tree.right_child = merge_trees(left_tree.right_child, right_tree)  # @step:extract
            return left_tree  # @step:extract
        else:
            right_tree.left_child = merge_trees(left_tree, right_tree.left_child)  # @step:extract
            return right_tree  # @step:extract

    # Repeatedly extract the minimum (root) and merge its two subtrees
    result_array: list[int] = []  # @step:extract

    while tree_root is not None:
        result_array.append(tree_root.value)  # @step:mark-sorted

        # Merge left and right subtrees to form the new tree without the extracted root
        tree_root = merge_trees(tree_root.left_child, tree_root.right_child)  # @step:extract

    return result_array  # @step:complete
