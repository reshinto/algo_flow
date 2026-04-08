import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("all-root-to-leaf-paths-iterative")
TreeNode = module.TreeNode
all_root_to_leaf_paths_iterative = module.all_root_to_leaf_paths_iterative


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_returns_4_paths_for_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    paths = all_root_to_leaf_paths_iterative(root)
    assert len(paths) == 4


def test_returns_correct_path_strings():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    paths = all_root_to_leaf_paths_iterative(root)
    assert "4->2->1" in paths


def test_empty_for_null_root():
    assert all_root_to_leaf_paths_iterative(None) == []


def test_single_node():
    assert all_root_to_leaf_paths_iterative(make_node(5)) == ["5"]


if __name__ == "__main__":
    test_returns_4_paths_for_7_node_bst()
    test_returns_correct_path_strings()
    test_empty_for_null_root()
    test_single_node()
    print("All tests passed!")
