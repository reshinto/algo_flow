import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("path-sum")
path_sum = mod.path_sum
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_path_sum_exists():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert path_sum(root, 7) is True


def test_path_sum_not_exists():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert path_sum(root, 100) is False


def test_null_root():
    assert path_sum(None, 5) is False


def test_single_node_matching():
    assert path_sum(make_node(5), 5) is True


def test_single_node_not_matching():
    assert path_sum(make_node(5), 3) is False


if __name__ == "__main__":
    test_path_sum_exists()
    test_path_sum_not_exists()
    test_null_root()
    test_single_node_matching()
    test_single_node_not_matching()
    print("All tests passed!")
