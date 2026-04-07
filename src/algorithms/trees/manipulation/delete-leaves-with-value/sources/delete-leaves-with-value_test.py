import importlib
import sys
import os
from collections import deque

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("delete-leaves-with-value")
BinaryNode = module.BinaryNode
delete_leaves_with_value = module.delete_leaves_with_value


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


def test_single_node_that_is_target_returns_none():
    root = make_node(1)
    assert delete_leaves_with_value(root, 1) is None


def test_no_matching_leaf():
    root = make_node(1, make_node(2), make_node(3))
    result = delete_leaves_with_value(root, 9)
    assert collect_level_order(result) == [1, 2, 3]


def test_deletes_leaf_with_target():
    root = make_node(1, make_node(2), make_node(3))
    result = delete_leaves_with_value(root, 2)
    assert result.left is None
    assert result.right.value == 3


def test_cascades_deletion():
    root = make_node(1, make_node(2))
    result = delete_leaves_with_value(root, 2)
    assert result.value == 1
    assert result.left is None


if __name__ == "__main__":
    test_single_node_that_is_target_returns_none()
    test_no_matching_leaf()
    test_deletes_leaf_with_target()
    test_cascades_deletion()
    print("All tests passed!")
