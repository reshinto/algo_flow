import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("build-from-preorder-inorder-iterative")
TreeNode = module.TreeNode
build_from_preorder_inorder_iterative = module.build_from_preorder_inorder_iterative


def inorder(root):
    if root is None:
        return []
    return inorder(root.left) + [root.value] + inorder(root.right)


def preorder(root):
    if root is None:
        return []
    return [root.value] + preorder(root.left) + preorder(root.right)


def test_builds_balanced_7_node_bst():
    root = build_from_preorder_inorder_iterative([4, 2, 1, 3, 6, 5, 7], [1, 2, 3, 4, 5, 6, 7])
    assert root.value == 4
    assert inorder(root) == [1, 2, 3, 4, 5, 6, 7]


def test_preserves_inorder():
    input_inorder = [1, 2, 3, 4, 5, 6, 7]
    root = build_from_preorder_inorder_iterative([4, 2, 1, 3, 6, 5, 7], input_inorder)
    assert inorder(root) == input_inorder


def test_preserves_preorder():
    input_preorder = [4, 2, 1, 3, 6, 5, 7]
    root = build_from_preorder_inorder_iterative(input_preorder, [1, 2, 3, 4, 5, 6, 7])
    assert preorder(root) == input_preorder


def test_returns_none_for_empty():
    assert build_from_preorder_inorder_iterative([], []) is None


def test_single_node():
    root = build_from_preorder_inorder_iterative([42], [42])
    assert root.value == 42
    assert root.left is None
    assert root.right is None


if __name__ == "__main__":
    test_builds_balanced_7_node_bst()
    test_preserves_inorder()
    test_preserves_preorder()
    test_returns_none_for_empty()
    test_single_node()
    print("All tests passed!")
