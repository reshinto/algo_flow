import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

search_rotated_array_module = importlib.import_module("search-rotated-array")
search_rotated_array = search_rotated_array_module.search_rotated_array


def test_finds_target_in_rotated_array_default_example():
    assert search_rotated_array([4, 5, 6, 7, 0, 1, 2], 0) == 4


def test_finds_target_in_left_sorted_half():
    assert search_rotated_array([4, 5, 6, 7, 0, 1, 2], 5) == 1


def test_finds_target_in_right_sorted_half():
    assert search_rotated_array([4, 5, 6, 7, 0, 1, 2], 1) == 5


def test_returns_minus_one_when_target_not_in_array():
    assert search_rotated_array([4, 5, 6, 7, 0, 1, 2], 3) == -1


def test_finds_target_in_non_rotated_array():
    assert search_rotated_array([1, 2, 3, 4, 5, 6, 7], 4) == 3


def test_finds_target_at_rotation_pivot():
    assert search_rotated_array([6, 7, 0, 1, 2, 3, 4, 5], 6) == 0


def test_handles_single_element_found():
    assert search_rotated_array([5], 5) == 0


def test_handles_single_element_not_found():
    assert search_rotated_array([5], 3) == -1


def test_finds_target_at_last_index():
    assert search_rotated_array([3, 4, 5, 1, 2], 2) == 4


def test_finds_target_at_first_index():
    assert search_rotated_array([3, 4, 5, 1, 2], 3) == 0


def test_handles_two_element_rotated_array():
    assert search_rotated_array([2, 1], 1) == 1


def test_handles_two_element_rotated_finding_first():
    assert search_rotated_array([2, 1], 2) == 0


def test_returns_minus_one_for_empty_array():
    assert search_rotated_array([], 5) == -1


if __name__ == "__main__":
    test_finds_target_in_rotated_array_default_example()
    test_finds_target_in_left_sorted_half()
    test_finds_target_in_right_sorted_half()
    test_returns_minus_one_when_target_not_in_array()
    test_finds_target_in_non_rotated_array()
    test_finds_target_at_rotation_pivot()
    test_handles_single_element_found()
    test_handles_single_element_not_found()
    test_finds_target_at_last_index()
    test_finds_target_at_first_index()
    test_handles_two_element_rotated_array()
    test_handles_two_element_rotated_finding_first()
    test_returns_minus_one_for_empty_array()
    print("All tests passed!")
