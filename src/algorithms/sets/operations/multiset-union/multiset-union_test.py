import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

multiset_union_module = importlib.import_module("multiset-union")
multiset_union = multiset_union_module.multiset_union


def test_sorted_bag_union_default():
    result = multiset_union([1, 1, 2, 3, 3, 3], [1, 1, 1, 2, 2, 3])
    assert result == [1, 1, 1, 2, 2, 3, 3, 3]


def test_both_empty():
    result = multiset_union([], [])
    assert result == []


def test_array_b_empty_returns_array_a():
    result = multiset_union([1, 1, 2], [])
    assert result == [1, 1, 2]


def test_array_a_empty_returns_array_b():
    result = multiset_union([], [3, 3, 4])
    assert result == [3, 3, 4]


def test_max_count_from_larger_side():
    result = multiset_union([5, 5, 5], [5])
    assert result == [5, 5, 5]


def test_elements_unique_to_each_side():
    result = multiset_union([1, 2], [3, 4])
    assert result == [1, 2, 3, 4]


def test_identical_arrays():
    result = multiset_union([1, 2, 2], [1, 2, 2])
    assert result == [1, 2, 2]


def test_single_element_same_value():
    result = multiset_union([7], [7])
    assert result == [7]


def test_single_element_different_values():
    result = multiset_union([3], [9])
    assert result == [3, 9]


def test_output_is_sorted():
    result = multiset_union([3, 1, 2], [4, 2, 1])
    assert result == sorted(result)


if __name__ == "__main__":
    test_sorted_bag_union_default()
    test_both_empty()
    test_array_b_empty_returns_array_a()
    test_array_a_empty_returns_array_b()
    test_max_count_from_larger_side()
    test_elements_unique_to_each_side()
    test_identical_arrays()
    test_single_element_same_value()
    test_single_element_different_values()
    test_output_is_sorted()
    print("All tests passed!")
