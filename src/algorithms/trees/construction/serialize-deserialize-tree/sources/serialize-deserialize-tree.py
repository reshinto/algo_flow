# Serialize and Deserialize Binary Tree (BFS / Level-Order)
# Serialization: BFS level-by-level, null nodes represented as "null"
# Deserialization: parse the string back into a tree using a queue

from collections import deque

class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def serialize_tree(root) -> str:
    if root is None:  # @step:initialize
        return "null"

    queue = deque([root])  # @step:initialize
    parts = []  # @step:initialize

    while queue:  # @step:search-node
        node = queue.popleft()  # @step:search-node

        if node is None:
            parts.append("null")  # @step:visit
        else:
            parts.append(str(node.value))  # @step:visit
            queue.append(node.left)  # @step:build-node
            queue.append(node.right)  # @step:build-node

    return ",".join(parts)  # @step:complete

def deserialize_tree(data: str):
    if data == "null" or data == "":  # @step:initialize
        return None

    parts = data.split(",")  # @step:initialize
    root = TreeNode(int(parts[0]))  # @step:build-node
    queue = deque([root])  # @step:initialize
    part_index = 1  # @step:initialize

    while queue and part_index < len(parts):  # @step:search-node
        current_node = queue.popleft()  # @step:search-node

        left_value = parts[part_index]  # @step:select-element
        part_index += 1  # @step:select-element

        if left_value != "null":
            left_node = TreeNode(int(left_value))  # @step:build-node
            current_node.left = left_node  # @step:connect-child
            queue.append(left_node)  # @step:visit

        if part_index < len(parts):
            right_value = parts[part_index]  # @step:select-element
            part_index += 1  # @step:select-element

            if right_value != "null":
                right_node = TreeNode(int(right_value))  # @step:build-node
                current_node.right = right_node  # @step:connect-child
                queue.append(right_node)  # @step:visit

    return root  # @step:complete
