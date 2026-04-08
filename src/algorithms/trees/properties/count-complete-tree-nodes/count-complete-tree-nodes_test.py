import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
module = importlib.import_module("count-complete-tree-nodes")
TreeNode = module.TreeNode
count_complete_tree_nodes = module.count_complete_tree_nodes


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def test_7_node_perfect_tree():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    assert count_complete_tree_nodes(root) == 7


def test_null_root_returns_zero():
    assert count_complete_tree_nodes(None) == 0


def test_single_node():
    assert count_complete_tree_nodes(make_node(1)) == 1


def test_3_node_perfect_tree():
    assert count_complete_tree_nodes(make_node(1, make_node(2), make_node(3))) == 3


if __name__ == "__main__":
    test_7_node_perfect_tree()
    test_null_root_returns_zero()
    test_single_node()
    test_3_node_perfect_tree()
    print("All tests passed!")
