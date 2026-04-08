import importlib
import sys
import os
from collections import deque

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("merge-binary-trees")
BinaryNode = module.BinaryNode
merge_binary_trees = module.merge_binary_trees


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


def test_tree_a_null_returns_tree_b():
    tree_b = make_node(1)
    assert merge_binary_trees(None, tree_b) is tree_b


def test_tree_b_null_returns_tree_a():
    tree_a = make_node(1)
    assert merge_binary_trees(tree_a, None) is tree_a


def test_sums_two_single_nodes():
    result = merge_binary_trees(make_node(3), make_node(5))
    assert result.value == 8


def test_merges_7_node_trees():
    tree_a = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    tree_b = make_node(40, make_node(20, make_node(10), make_node(30)), make_node(60, make_node(50), make_node(70)))
    result = merge_binary_trees(tree_a, tree_b)
    assert result.value == 44


if __name__ == "__main__":
    test_tree_a_null_returns_tree_b()
    test_tree_b_null_returns_tree_a()
    test_sums_two_single_nodes()
    test_merges_7_node_trees()
    print("All tests passed!")
