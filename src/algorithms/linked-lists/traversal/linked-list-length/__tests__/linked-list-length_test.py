import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("linked-list-length")
linked_list_length = module.linked_list_length
ListNode = module.ListNode


def build_list(values):
    head = None
    for val in reversed(values):
        head = ListNode(val, head)
    return head


def test_five_node_list():
    assert linked_list_length(build_list([1, 2, 3, 4, 5])) == 5


def test_null_input():
    assert linked_list_length(None) == 0


def test_single_node():
    assert linked_list_length(build_list([42])) == 1


def test_three_node_list():
    assert linked_list_length(build_list([10, 20, 30])) == 3


def test_ten_node_list():
    assert linked_list_length(build_list([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) == 10


if __name__ == "__main__":
    test_five_node_list()
    test_null_input()
    test_single_node()
    test_three_node_list()
    test_ten_node_list()
    print("All tests passed.")
