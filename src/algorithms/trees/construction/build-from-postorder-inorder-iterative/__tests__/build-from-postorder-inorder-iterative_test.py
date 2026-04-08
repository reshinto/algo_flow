import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("build-from-postorder-inorder-iterative")
TreeNode = module.TreeNode
build_from_postorder_inorder_iterative = module.build_from_postorder_inorder_iterative


def inorder(root):
    if root is None:
        return []
    return inorder(root.left) + [root.value] + inorder(root.right)


def postorder(root):
    if root is None:
        return []
    return postorder(root.left) + postorder(root.right) + [root.value]


def test_builds_balanced_7_node_bst():
    root = build_from_postorder_inorder_iterative([1, 3, 2, 5, 7, 6, 4], [1, 2, 3, 4, 5, 6, 7])
    assert root.value == 4
    assert inorder(root) == [1, 2, 3, 4, 5, 6, 7]


def test_preserves_inorder():
    input_inorder = [1, 2, 3, 4, 5, 6, 7]
    root = build_from_postorder_inorder_iterative([1, 3, 2, 5, 7, 6, 4], input_inorder)
    assert inorder(root) == input_inorder


def test_preserves_postorder():
    input_postorder = [1, 3, 2, 5, 7, 6, 4]
    root = build_from_postorder_inorder_iterative(input_postorder, [1, 2, 3, 4, 5, 6, 7])
    assert postorder(root) == input_postorder


def test_returns_none_for_empty():
    assert build_from_postorder_inorder_iterative([], []) is None


def test_single_node():
    root = build_from_postorder_inorder_iterative([7], [7])
    assert root.value == 7
    assert root.left is None
    assert root.right is None


if __name__ == "__main__":
    test_builds_balanced_7_node_bst()
    test_preserves_inorder()
    test_preserves_postorder()
    test_returns_none_for_empty()
    test_single_node()
    print("All tests passed!")
