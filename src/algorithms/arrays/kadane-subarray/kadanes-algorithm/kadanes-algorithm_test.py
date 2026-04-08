import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

module = importlib.import_module("kadanes-algorithm")
kadanes_algorithm = module.kadanes_algorithm


def test_mixed_array():
    result = kadanes_algorithm([-2, 1, -3, 4, -1, 2, 1, -5, 4])
    assert result["max_sum"] == 6
    assert result["start_index"] == 3
    assert result["end_index"] == 6


def test_all_positive():
    result = kadanes_algorithm([1, 2, 3, 4, 5])
    assert result["max_sum"] == 15
    assert result["start_index"] == 0
    assert result["end_index"] == 4


def test_all_negative():
    result = kadanes_algorithm([-5, -3, -8, -1, -4])
    assert result["max_sum"] == -1
    assert result["start_index"] == 3
    assert result["end_index"] == 3


def test_single_element():
    result = kadanes_algorithm([42])
    assert result["max_sum"] == 42
    assert result["start_index"] == 0
    assert result["end_index"] == 0


def test_single_negative_element():
    result = kadanes_algorithm([-7])
    assert result["max_sum"] == -7


def test_empty_array():
    result = kadanes_algorithm([])
    assert result["max_sum"] == 0
    assert result["start_index"] == -1
    assert result["end_index"] == -1


def test_all_identical():
    result = kadanes_algorithm([3, 3, 3, 3])
    assert result["max_sum"] == 12
    assert result["start_index"] == 0
    assert result["end_index"] == 3


def test_max_at_start():
    result = kadanes_algorithm([10, 9, -100, 1, 2])
    assert result["max_sum"] == 19
    assert result["start_index"] == 0
    assert result["end_index"] == 1


def test_max_at_end():
    result = kadanes_algorithm([1, -100, 8, 9, 10])
    assert result["max_sum"] == 27
    assert result["start_index"] == 2
    assert result["end_index"] == 4


if __name__ == "__main__":
    test_mixed_array()
    test_all_positive()
    test_all_negative()
    test_single_element()
    test_single_negative_element()
    test_empty_array()
    test_all_identical()
    test_max_at_start()
    test_max_at_end()
    print("All tests passed!")
