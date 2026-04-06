# N-ary Tree Traversal — preorder visit using children list

class NAryNode:
    def __init__(self, value: int, children=None):
        self.value = value
        self.children = children or []

def n_ary_tree_traversal(root) -> list:
    result = []  # @step:initialize

    def preorder(node):
        if not node:
            return  # @step:initialize

        result.append(node.value)  # @step:visit

        for child in node.children:
            preorder(child)  # @step:traverse-next

    preorder(root)  # @step:initialize
    return result  # @step:complete
