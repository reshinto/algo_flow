import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("merge-two-sorted")
merge_two_sorted = module.merge_two_sorted
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


def test_merge_interleaved():
    result = merge_two_sorted(build_list([1, 3, 5, 7]), build_list([2, 4, 6, 8]))
    assert list_to_array(result) == [1, 2, 3, 4, 5, 6, 7, 8]


def test_merge_two_empty_lists():
    result = merge_two_sorted(None, None)
    assert list_to_array(result) == []


def test_merge_empty_with_nonempty():
    result = merge_two_sorted(None, build_list([1, 2, 3]))
    assert list_to_array(result) == [1, 2, 3]


def test_merge_nonempty_with_empty():
    result = merge_two_sorted(build_list([1, 2, 3]), None)
    assert list_to_array(result) == [1, 2, 3]


def test_merge_single_nodes():
    result = merge_two_sorted(build_list([1]), build_list([2]))
    assert list_to_array(result) == [1, 2]


def test_merge_nonoverlapping_a_before_b():
    result = merge_two_sorted(build_list([1, 2, 3]), build_list([4, 5, 6]))
    assert list_to_array(result) == [1, 2, 3, 4, 5, 6]


def test_merge_nonoverlapping_b_before_a():
    result = merge_two_sorted(build_list([4, 5, 6]), build_list([1, 2, 3]))
    assert list_to_array(result) == [1, 2, 3, 4, 5, 6]


def test_merge_with_duplicate_values():
    result = merge_two_sorted(build_list([1, 3, 5]), build_list([1, 4, 5]))
    assert list_to_array(result) == [1, 1, 3, 4, 5, 5]


def test_merge_single_nodes_reversed():
    result = merge_two_sorted(build_list([5]), build_list([3]))
    assert list_to_array(result) == [3, 5]


def test_merge_unequal_length_lists():
    result = merge_two_sorted(build_list([10, 20, 30]), build_list([15, 25]))
    assert list_to_array(result) == [10, 15, 20, 25, 30]


if __name__ == "__main__":
    test_merge_interleaved()
    test_merge_two_empty_lists()
    test_merge_empty_with_nonempty()
    test_merge_nonempty_with_empty()
    test_merge_single_nodes()
    test_merge_nonoverlapping_a_before_b()
    test_merge_nonoverlapping_b_before_a()
    test_merge_with_duplicate_values()
    test_merge_single_nodes_reversed()
    test_merge_unequal_length_lists()
    print("All tests passed.")
