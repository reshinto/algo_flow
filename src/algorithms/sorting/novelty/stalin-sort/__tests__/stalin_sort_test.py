import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

stalin_sort_module = importlib.import_module("stalin-sort")
stalin_sort = stalin_sort_module.stalin_sort


def test_eliminates_out_of_order_elements():
    # 3 survives (first), 1 < 3 eliminated, 2 < 3 eliminated -> [3]
    assert stalin_sort([3, 1, 2]) == [3]


def test_keeps_all_elements_when_array_is_already_sorted():
    assert stalin_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]


def test_reduces_reverse_sorted_array_to_first_element():
    assert stalin_sort([5, 4, 3, 2, 1]) == [5]


def test_handles_array_with_partial_order():
    # 3 survives (max=3), 1 eliminated, 4 survives (max=4), 2 eliminated, 5 survives
    assert stalin_sort([3, 1, 4, 2, 5]) == [3, 4, 5]


def test_handles_array_with_equal_elements():
    # All equal — all survive (>= comparison)
    assert stalin_sort([2, 2, 2, 2]) == [2, 2, 2, 2]


def test_handles_single_element_array():
    assert stalin_sort([42]) == [42]


def test_handles_empty_array():
    assert stalin_sort([]) == []


def test_handles_array_with_duplicate_max_values():
    # 5 survives (max=5), 3 eliminated (3<5), 5 survives (5>=5)
    assert stalin_sort([5, 3, 5]) == [5, 5]


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    result = stalin_sort(original)
    assert result == [3]
    assert original == [3, 1, 2]


if __name__ == "__main__":
    test_eliminates_out_of_order_elements()
    test_keeps_all_elements_when_array_is_already_sorted()
    test_reduces_reverse_sorted_array_to_first_element()
    test_handles_array_with_partial_order()
    test_handles_array_with_equal_elements()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_handles_array_with_duplicate_max_values()
    test_does_not_mutate_original_array()
    print("All tests passed!")
