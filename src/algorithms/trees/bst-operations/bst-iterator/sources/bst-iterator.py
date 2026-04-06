# BST Iterator — stack-based controlled in-order traversal (has_next/next interface)

class BSTNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

class BSTIteratorClass:
    def __init__(self, root):
        self.stack = []  # @step:initialize
        self._push_left(root)  # @step:initialize

    def _push_left(self, node) -> None:
        while node is not None:
            self.stack.append(node)  # @step:search-node
            node = node.left

    def has_next(self) -> bool:
        return len(self.stack) > 0  # @step:search-node

    def next(self) -> int:
        node = self.stack.pop()  # @step:found
        self._push_left(node.right)
        return node.value

def bst_iterator(root) -> list:
    iterator = BSTIteratorClass(root)  # @step:initialize
    result = []

    while iterator.has_next():
        result.append(iterator.next())  # @step:found

    return result  # @step:complete
