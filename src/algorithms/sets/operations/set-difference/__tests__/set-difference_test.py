import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

set_difference_module = importlib.import_module("set-difference")
set_difference = set_difference_module.set_difference


def test_elements_only_in_a():
    result = set_difference([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])
    assert result == [1, 2]


def test_disjoint_returns_all_of_a():
    result = set_difference([1, 3, 5], [2, 4, 6])
    assert result == [1, 3, 5]


def test_a_subset_of_b_returns_empty():
    result = set_difference([2, 4], [1, 2, 3, 4, 5])
    assert result == []


def test_empty_b_returns_all_of_a():
    result = set_difference([1, 2, 3], [])
    assert result == [1, 2, 3]


def test_empty_a_returns_empty():
    result = set_difference([], [1, 2, 3])
    assert result == []


def test_identical_arrays_returns_empty():
    result = set_difference([1, 2, 3], [1, 2, 3])
    assert result == []


def test_single_element_match():
    result = set_difference([7], [7])
    assert result == []


def test_single_element_no_match():
    result = set_difference([7], [8])
    assert result == [7]


def test_b_subset_of_a():
    result = set_difference([1, 2, 3, 4, 5], [2, 4])
    assert result == [1, 3, 5]


if __name__ == "__main__":
    test_elements_only_in_a()
    test_disjoint_returns_all_of_a()
    test_a_subset_of_b_returns_empty()
    test_empty_b_returns_all_of_a()
    test_empty_a_returns_empty()
    test_identical_arrays_returns_empty()
    test_single_element_match()
    test_single_element_no_match()
    test_b_subset_of_a()
    print("All tests passed!")
