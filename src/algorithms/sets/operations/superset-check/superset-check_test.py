import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

superset_check_module = importlib.import_module("superset-check")
superset_check = superset_check_module.superset_check


def test_a_is_proper_superset_of_b():
    result = superset_check([1, 2, 3, 4, 5], [2, 4])
    assert result["is_superset"] is True


def test_element_of_b_missing_from_a():
    result = superset_check([1, 2, 3, 4, 5], [2, 9])
    assert result["is_superset"] is False


def test_identical_arrays():
    result = superset_check([1, 2, 3], [1, 2, 3])
    assert result["is_superset"] is True


def test_empty_b_a_is_superset():
    result = superset_check([1, 2, 3], [])
    assert result["is_superset"] is True


def test_empty_a_non_empty_b():
    result = superset_check([], [1])
    assert result["is_superset"] is False


def test_both_empty():
    result = superset_check([], [])
    assert result["is_superset"] is True


def test_b_has_elements_not_in_a():
    result = superset_check([2, 4], [1, 2, 3, 4, 5])
    assert result["is_superset"] is False


def test_b_equals_a_different_order():
    result = superset_check([1, 2, 3], [3, 1, 2])
    assert result["is_superset"] is True


def test_single_element_b_present_in_a():
    result = superset_check([5, 6, 7, 8], [7])
    assert result["is_superset"] is True


def test_single_element_b_absent_from_a():
    result = superset_check([5, 6, 7, 8], [9])
    assert result["is_superset"] is False


if __name__ == "__main__":
    test_a_is_proper_superset_of_b()
    test_element_of_b_missing_from_a()
    test_identical_arrays()
    test_empty_b_a_is_superset()
    test_empty_a_non_empty_b()
    test_both_empty()
    test_b_has_elements_not_in_a()
    test_b_equals_a_different_order()
    test_single_element_b_present_in_a()
    test_single_element_b_absent_from_a()
    print("All tests passed!")
