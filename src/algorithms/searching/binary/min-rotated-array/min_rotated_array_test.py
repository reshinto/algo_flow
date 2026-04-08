import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

min_rotated_array_module = importlib.import_module("min-rotated-array")
min_rotated_array = min_rotated_array_module.min_rotated_array


def test_finds_minimum_in_rotated_array():
    assert min_rotated_array([4, 5, 6, 7, 0, 1, 2]) == 0


def test_finds_minimum_when_not_rotated():
    assert min_rotated_array([1, 2, 3, 4, 5]) == 1


def test_finds_minimum_when_rotation_at_last_position():
    assert min_rotated_array([2, 3, 4, 5, 1]) == 1


def test_handles_single_element():
    assert min_rotated_array([42]) == 42


def test_handles_two_element_array_rotated():
    assert min_rotated_array([2, 1]) == 1


def test_handles_two_element_array_not_rotated():
    assert min_rotated_array([1, 2]) == 1


def test_finds_minimum_when_min_is_at_index_zero():
    assert min_rotated_array([0, 1, 2, 4, 5, 6, 7]) == 0


def test_finds_minimum_with_larger_rotation_offset():
    assert min_rotated_array([11, 13, 15, 17, 2, 5, 6, 7]) == 2


def test_handles_minimum_at_last_position():
    assert min_rotated_array([3, 4, 5, 6, 7, 8, 1]) == 1


def test_handles_minimum_at_pivot():
    assert min_rotated_array([6, 7, 0, 1, 2, 3, 4, 5]) == 0


def test_handles_three_element_array():
    assert min_rotated_array([3, 1, 2]) == 1


def test_handles_minimum_at_middle():
    assert min_rotated_array([5, 6, 7, 1, 2, 3, 4]) == 1


if __name__ == "__main__":
    test_finds_minimum_in_rotated_array()
    test_finds_minimum_when_not_rotated()
    test_finds_minimum_when_rotation_at_last_position()
    test_handles_single_element()
    test_handles_two_element_array_rotated()
    test_handles_two_element_array_not_rotated()
    test_finds_minimum_when_min_is_at_index_zero()
    test_finds_minimum_with_larger_rotation_offset()
    test_handles_minimum_at_last_position()
    test_handles_minimum_at_pivot()
    test_handles_three_element_array()
    test_handles_minimum_at_middle()
    print("All tests passed!")
