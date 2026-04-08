import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("serialize-deserialize-tree")
TreeNode = module.TreeNode
serialize_tree = module.serialize_tree
deserialize_tree = module.deserialize_tree


def make_node(value, left=None, right=None):
    node = TreeNode(value)
    node.left = left
    node.right = right
    return node


def inorder(root):
    if root is None:
        return []
    return inorder(root.left) + [root.value] + inorder(root.right)


def test_serializes_null_as_null_string():
    assert serialize_tree(None) == "null"


def test_serializes_single_node():
    result = serialize_tree(make_node(42))
    assert "42" in result


def test_serializes_balanced_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    result = serialize_tree(root)
    assert "4" in result and "2" in result and "6" in result


def test_deserializes_null_string():
    assert deserialize_tree("null") is None


def test_round_trips_balanced_7_node_bst():
    original = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    serialized = serialize_tree(original)
    reconstructed = deserialize_tree(serialized)
    assert inorder(reconstructed) == [1, 2, 3, 4, 5, 6, 7]
    assert reconstructed.value == 4


def test_round_trips_single_node():
    original = make_node(99)
    serialized = serialize_tree(original)
    reconstructed = deserialize_tree(serialized)
    assert reconstructed.value == 99
    assert reconstructed.left is None
    assert reconstructed.right is None


if __name__ == "__main__":
    test_serializes_null_as_null_string()
    test_serializes_single_node()
    test_serializes_balanced_7_node_bst()
    test_deserializes_null_string()
    test_round_trips_balanced_7_node_bst()
    test_round_trips_single_node()
    print("All tests passed!")
