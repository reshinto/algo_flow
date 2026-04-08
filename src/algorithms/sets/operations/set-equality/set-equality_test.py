import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

set_equality_module = importlib.import_module("set-equality")
set_equality = set_equality_module.set_equality


def test_same_elements_different_order():
    result = set_equality([3, 1, 2], [2, 3, 1])
    assert result["is_equal"] is True


def test_identical_arrays():
    result = set_equality([1, 2, 3], [1, 2, 3])
    assert result["is_equal"] is True


def test_b_has_element_not_in_a():
    result = set_equality([1, 2, 3], [1, 2, 9])
    assert result["is_equal"] is False


def test_a_has_more_unique_elements():
    result = set_equality([1, 2, 3, 4], [1, 2, 3])
    assert result["is_equal"] is False


def test_b_has_more_unique_elements():
    result = set_equality([1, 2, 3], [1, 2, 3, 4])
    assert result["is_equal"] is False


def test_both_empty():
    result = set_equality([], [])
    assert result["is_equal"] is True


def test_a_empty_b_non_empty():
    result = set_equality([], [1])
    assert result["is_equal"] is False


def test_b_empty_a_non_empty():
    result = set_equality([1], [])
    assert result["is_equal"] is False


def test_duplicates_same_unique_set():
    result = set_equality([1, 1, 2, 3], [1, 2, 2, 3])
    assert result["is_equal"] is True


def test_single_element_equal():
    result = set_equality([7], [7])
    assert result["is_equal"] is True


def test_single_element_not_equal():
    result = set_equality([7], [8])
    assert result["is_equal"] is False


if __name__ == "__main__":
    test_same_elements_different_order()
    test_identical_arrays()
    test_b_has_element_not_in_a()
    test_a_has_more_unique_elements()
    test_b_has_more_unique_elements()
    test_both_empty()
    test_a_empty_b_non_empty()
    test_b_empty_a_non_empty()
    test_duplicates_same_unique_set()
    test_single_element_equal()
    test_single_element_not_equal()
    print("All tests passed!")
