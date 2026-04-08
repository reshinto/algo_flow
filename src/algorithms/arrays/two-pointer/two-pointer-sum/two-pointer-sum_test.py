import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("two-pointer-sum")
two_pointer_sum = module.two_pointer_sum


def test_basic_sorted_array():
    result = two_pointer_sum([1, 2, 4, 6, 8, 11, 15], 10)
    assert result["found"] is True
    assert result["left_index"] == 1
    assert result["right_index"] == 4


def test_pair_at_outermost_positions():
    result = two_pointer_sum([1, 2, 3, 4, 5], 6)
    assert result["found"] is True
    assert result["left_index"] == 0
    assert result["right_index"] == 4


def test_not_found():
    result = two_pointer_sum([1, 3, 5, 7], 2)
    assert result["found"] is False
    assert result["left_index"] == -1
    assert result["right_index"] == -1


def test_single_element():
    result = two_pointer_sum([5], 10)
    assert result["found"] is False


def test_empty_array():
    result = two_pointer_sum([], 10)
    assert result["found"] is False


def test_all_identical_elements_match():
    result = two_pointer_sum([5, 5, 5, 5], 10)
    assert result["found"] is True


def test_all_identical_elements_no_match():
    result = two_pointer_sum([3, 3, 3, 3], 10)
    assert result["found"] is False


def test_negative_numbers():
    result = two_pointer_sum([-3, -1, 0, 2, 4], 1)
    assert result["found"] is True
    assert result["left_index"] == 0
    assert result["right_index"] == 4


if __name__ == "__main__":
    test_basic_sorted_array()
    test_pair_at_outermost_positions()
    test_not_found()
    test_single_element()
    test_empty_array()
    test_all_identical_elements_match()
    test_all_identical_elements_no_match()
    test_negative_numbers()
    print("All tests passed!")
