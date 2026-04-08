import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("quickselect")
quickselect = module.quickselect


def test_fourth_smallest():
    result = quickselect([7, 2, 1, 6, 8, 5, 3, 4], 4)
    assert result["kth_element"] == 4


def test_minimum():
    result = quickselect([7, 2, 1, 6, 8, 5, 3, 4], 1)
    assert result["kth_element"] == 1


def test_maximum():
    result = quickselect([7, 2, 1, 6, 8, 5, 3, 4], 8)
    assert result["kth_element"] == 8


def test_single_element():
    result = quickselect([42], 1)
    assert result["kth_element"] == 42


def test_already_sorted():
    result = quickselect([1, 2, 3, 4, 5], 3)
    assert result["kth_element"] == 3


def test_reverse_sorted():
    result = quickselect([5, 4, 3, 2, 1], 2)
    assert result["kth_element"] == 2


def test_duplicates():
    result = quickselect([3, 3, 1, 2], 2)
    assert result["kth_element"] == 2


def test_invalid_k_zero():
    result = quickselect([1, 2, 3], 0)
    assert result["kth_element"] == -1


def test_invalid_k_too_large():
    result = quickselect([1, 2, 3], 5)
    assert result["kth_element"] == -1


def test_empty_array():
    result = quickselect([], 1)
    assert result["kth_element"] == -1


def test_median():
    result = quickselect([3, 1, 4, 1, 5, 9, 2, 6, 5], 5)
    assert result["kth_element"] == 4


if __name__ == "__main__":
    test_fourth_smallest()
    test_minimum()
    test_maximum()
    test_single_element()
    test_already_sorted()
    test_reverse_sorted()
    test_duplicates()
    test_invalid_k_zero()
    test_invalid_k_too_large()
    test_empty_array()
    test_median()
    print("All tests passed!")
