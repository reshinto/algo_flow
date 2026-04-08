import importlib
import sys
import os
from collections import deque

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("build-from-level-order")
TreeNode = module.TreeNode
build_from_level_order = module.build_from_level_order


def inorder(root):
    if root is None:
        return []
    return inorder(root.left) + [root.value] + inorder(root.right)


def level_order(root):
    if root is None:
        return []
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.value)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result


def test_builds_balanced_7_node_bst():
    root = build_from_level_order([4, 2, 6, 1, 3, 5, 7])
    assert root.value == 4
    assert inorder(root) == [1, 2, 3, 4, 5, 6, 7]


def test_produces_sorted_inorder():
    root = build_from_level_order([4, 2, 6, 1, 3, 5, 7])
    assert inorder(root) == [1, 2, 3, 4, 5, 6, 7]


def test_restores_level_order():
    input_seq = [4, 2, 6, 1, 3, 5, 7]
    root = build_from_level_order(input_seq)
    assert level_order(root) == input_seq


def test_returns_none_for_empty():
    assert build_from_level_order([]) is None


def test_single_node():
    root = build_from_level_order([42])
    assert root.value == 42
    assert root.left is None
    assert root.right is None


if __name__ == "__main__":
    test_builds_balanced_7_node_bst()
    test_produces_sorted_inorder()
    test_restores_level_order()
    test_returns_none_for_empty()
    test_single_node()
    print("All tests passed!")
