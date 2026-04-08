import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("reverse-linked-list")
reverse_linked_list = module.reverse_linked_list
ListNode = module.ListNode


def build_list(values):
    head = None
    for val in reversed(values):
        head = ListNode(val, head)
    return head


def list_to_array(head):
    result = []
    current = head
    while current is not None:
        result.append(current.value)
        current = current.next
    return result


def test_reverse_five_node_list():
    result = reverse_linked_list(build_list([1, 2, 3, 4, 5]))
    assert list_to_array(result) == [5, 4, 3, 2, 1]


def test_null_input():
    result = reverse_linked_list(None)
    assert result is None


def test_single_node():
    result = reverse_linked_list(build_list([42]))
    assert list_to_array(result) == [42]


def test_two_node_list():
    result = reverse_linked_list(build_list([1, 2]))
    assert list_to_array(result) == [2, 1]


def test_three_node_list():
    result = reverse_linked_list(build_list([3, 1, 4]))
    assert list_to_array(result) == [4, 1, 3]


def test_new_head_is_last_element():
    result = reverse_linked_list(build_list([10, 20, 30]))
    assert result is not None
    assert result.value == 30


if __name__ == "__main__":
    test_reverse_five_node_list()
    test_null_input()
    test_single_node()
    test_two_node_list()
    test_three_node_list()
    test_new_head_is_last_element()
    print("All tests passed.")
