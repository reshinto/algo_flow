import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("maximum-path-sum")
maximum_path_sum = mod.maximum_path_sum
TreeNode = mod.TreeNode


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_balanced_7_node_bst():
    # best path: 3+2+4+6+7 = 22
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert maximum_path_sum(root) == 22


def test_single_node():
    assert maximum_path_sum(make_node(-3)) == -3


def test_all_negative():
    root = make_node(-1, make_node(-2), make_node(-3))
    assert maximum_path_sum(root) == -1


def test_null_root():
    import math
    assert maximum_path_sum(None) == float("-inf") or maximum_path_sum(None) == -math.inf


if __name__ == "__main__":
    test_balanced_7_node_bst()
    test_single_node()
    test_all_negative()
    test_null_root()
    print("All tests passed!")
