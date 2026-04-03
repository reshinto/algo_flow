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

    tree_root = node_stack[0]  # @step:build-tree

    # Extract elements via inorder traversal (left → root → right)
    result_array: list[int] = []  # @step:extract
    traversal_stack: list[tuple[CartesianNode, bool]] = []  # @step:extract

    if tree_root:  # @step:extract
        traversal_stack.append((tree_root, False))  # @step:extract

    while traversal_stack:
        current_node, visited = traversal_stack[-1]  # @step:extract

        if not visited and current_node.left_child:
            traversal_stack[-1] = (current_node, True)  # @step:extract
            traversal_stack.append((current_node.left_child, False))  # @step:extract
        else:
            traversal_stack.pop()  # @step:extract
            result_array.append(current_node.value)  # @step:mark-sorted

            if current_node.right_child:  # @step:extract
                traversal_stack.append((current_node.right_child, False))  # @step:extract

    return result_array  # @step:complete
