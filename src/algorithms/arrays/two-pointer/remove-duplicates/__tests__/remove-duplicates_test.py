import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("remove-duplicates")
remove_duplicates = module.remove_duplicates


def test_basic_sorted_array():
    result = remove_duplicates([1, 1, 2, 2, 3])
    assert result["unique_count"] == 3
    assert result["result"] == [1, 2, 3]


def test_no_duplicates():
    result = remove_duplicates([1, 2, 3, 4, 5])
    assert result["unique_count"] == 5
    assert result["result"] == [1, 2, 3, 4, 5]


def test_all_same():
    result = remove_duplicates([7, 7, 7, 7])
    assert result["unique_count"] == 1
    assert result["result"] == [7]


def test_single_element():
    result = remove_duplicates([42])
    assert result["unique_count"] == 1
    assert result["result"] == [42]


def test_empty_array():
    result = remove_duplicates([])
    assert result["unique_count"] == 0
    assert result["result"] == []


def test_two_identical():
    result = remove_duplicates([3, 3])
    assert result["unique_count"] == 1
    assert result["result"] == [3]


def test_long_runs():
    result = remove_duplicates([1, 1, 1, 2, 2, 2, 3, 3, 3])
    assert result["unique_count"] == 3
    assert result["result"] == [1, 2, 3]


def test_default_input():
    result = remove_duplicates([1, 1, 2, 2, 3, 4, 4, 5])
    assert result["unique_count"] == 5
    assert result["result"] == [1, 2, 3, 4, 5]


if __name__ == "__main__":
    test_basic_sorted_array()
    test_no_duplicates()
    test_all_same()
    test_single_element()
    test_empty_array()
    test_two_identical()
    test_long_runs()
    test_default_input()
    print("All tests passed!")
