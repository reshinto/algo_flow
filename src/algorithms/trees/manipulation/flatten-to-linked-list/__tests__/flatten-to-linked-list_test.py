import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("flatten-to-linked-list")
BinaryNode = module.BinaryNode
flatten_to_linked_list = module.flatten_to_linked_list


def make_node(value, left=None, right=None):
    node = BinaryNode(value)
    node.left = left
    node.right = right
    return node


def collect_right_chain(root):
    result = []
    current = root
    while current:
        result.append(current.value)
        current = current.right
    return result


def test_null_root_does_not_throw():
    flatten_to_linked_list(None)


def test_single_node_unchanged():
    root = make_node(1)
    flatten_to_linked_list(root)
    assert root.left is None
    assert root.right is None


def test_two_node_with_left_child():
    root = make_node(1, make_node(2))
    flatten_to_linked_list(root)
    assert root.left is None
    assert collect_right_chain(root) == [1, 2]


def test_flattens_7_node_bst_in_preorder():
    root = make_node(4,
        make_node(2, make_node(1), make_node(3)),
        make_node(6, make_node(5), make_node(7)))
    flatten_to_linked_list(root)
    assert collect_right_chain(root) == [4, 2, 1, 3, 6, 5, 7]


def test_all_left_pointers_null():
    root = make_node(4,
        make_node(2, make_node(1), make_node(3)),
        make_node(6, make_node(5), make_node(7)))
    flatten_to_linked_list(root)
    current = root
    while current:
        assert current.left is None
        current = current.right


if __name__ == "__main__":
    test_null_root_does_not_throw()
    test_single_node_unchanged()
    test_two_node_with_left_child()
    test_flattens_7_node_bst_in_preorder()
    test_all_left_pointers_null()
    print("All tests passed!")
