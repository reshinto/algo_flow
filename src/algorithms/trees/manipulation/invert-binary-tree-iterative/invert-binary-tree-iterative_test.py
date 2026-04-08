import importlib
import sys
import os
from collections import deque

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("invert-binary-tree-iterative")
BinaryNode = module.BinaryNode
invert_binary_tree_iterative = module.invert_binary_tree_iterative


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def collect_level_order(root):
    if root is None:
        return []
    result = []
    queue = deque([root])
    while queue:
        current = queue.popleft()
        result.append(current.value)
        if current.left:
            queue.append(current.left)
        if current.right:
            queue.append(current.right)
    return result


def test_null_returns_none():
    assert invert_binary_tree_iterative(None) is None


def test_single_node():
    root = make_node(1)
    result = invert_binary_tree_iterative(root)
    assert result.value == 1
    assert result.left is None
    assert result.right is None


def test_swaps_children_two_node():
    root = make_node(1, make_node(2))
    result = invert_binary_tree_iterative(root)
    assert result.left is None
    assert result.right.value == 2


def test_inverts_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = invert_binary_tree_iterative(root)
    assert collect_level_order(result) == [4, 6, 2, 7, 5, 3, 1]


if __name__ == "__main__":
    test_null_returns_none()
    test_single_node()
    test_swaps_children_two_node()
    test_inverts_7_node_bst()
    print("All tests passed!")
