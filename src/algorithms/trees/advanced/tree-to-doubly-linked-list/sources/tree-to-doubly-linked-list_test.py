import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
module = importlib.import_module("tree-to-doubly-linked-list")
DLLNode = module.DLLNode
tree_to_doubly_linked_list = module.tree_to_doubly_linked_list


def make_node(value, left=None, right=None):
    node = DLLNode(value)
    node.left = left
    node.right = right
    return node


def test_returns_none_for_none_input():
    assert tree_to_doubly_linked_list(None) is None


def test_handles_single_node():
    root = make_node(5)
    head = tree_to_doubly_linked_list(root)
    assert head.value == 5
    assert head.right is head  # circular
    assert head.left is head


def test_sorted_dll_from_3_node_bst():
    root = make_node(2, make_node(1), make_node(3))
    head = tree_to_doubly_linked_list(root)
    assert head.value == 1
    assert head.right.value == 2
    assert head.right.right.value == 3
    # circular: tail.right == head
    assert head.right.right.right is head


def test_sorted_dll_from_7_node_bst():
    root = make_node(4, make_node(2, make_node(1), make_node(3)), make_node(6, make_node(5), make_node(7)))
    head = tree_to_doubly_linked_list(root)
    values = []
    current = head
    for _ in range(7):
        values.append(current.value)
        current = current.right
    assert values == [1, 2, 3, 4, 5, 6, 7]


if __name__ == "__main__":
    test_returns_none_for_none_input()
    test_handles_single_node()
    test_sorted_dll_from_3_node_bst()
    test_sorted_dll_from_7_node_bst()
    print("All tests passed!")
