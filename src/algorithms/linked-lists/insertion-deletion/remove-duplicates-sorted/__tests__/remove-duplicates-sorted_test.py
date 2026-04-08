import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("remove-duplicates-sorted")
remove_duplicates_sorted = module.remove_duplicates_sorted
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


def test_removes_consecutive_duplicates():
    result = remove_duplicates_sorted(build_list([1, 1, 2, 3, 3, 3, 4, 5, 5]))
    assert list_to_array(result) == [1, 2, 3, 4, 5]


def test_no_duplicates_unchanged():
    result = remove_duplicates_sorted(build_list([1, 2, 3, 4, 5]))
    assert list_to_array(result) == [1, 2, 3, 4, 5]


def test_all_same_values():
    result = remove_duplicates_sorted(build_list([7, 7, 7, 7]))
    assert list_to_array(result) == [7]


def test_empty_list():
    result = remove_duplicates_sorted(None)
    assert result is None


def test_single_element():
    result = remove_duplicates_sorted(build_list([5]))
    assert list_to_array(result) == [5]


def test_two_element_duplicates():
    result = remove_duplicates_sorted(build_list([3, 3]))
    assert list_to_array(result) == [3]


def test_two_different_elements():
    result = remove_duplicates_sorted(build_list([1, 2]))
    assert list_to_array(result) == [1, 2]


def test_mixed_run_lengths():
    result = remove_duplicates_sorted(build_list([1, 2, 2, 3, 3, 3, 4]))
    assert list_to_array(result) == [1, 2, 3, 4]


if __name__ == "__main__":
    test_removes_consecutive_duplicates()
    test_no_duplicates_unchanged()
    test_all_same_values()
    test_empty_list()
    test_single_element()
    test_two_element_duplicates()
    test_two_different_elements()
    test_mixed_run_lengths()
    print("All tests passed.")
