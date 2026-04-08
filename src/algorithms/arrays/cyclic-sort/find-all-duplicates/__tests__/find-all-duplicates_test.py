import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

find_all_duplicates_module = importlib.import_module("find-all-duplicates")
find_all_duplicates = find_all_duplicates_module.find_all_duplicates


def test_default_input():
    result = sorted(find_all_duplicates([4, 3, 2, 7, 8, 2, 3, 1]))
    assert result == [2, 3], f"Expected [2, 3], got {result}"


def test_no_duplicates():
    result = find_all_duplicates([1, 2, 3, 4, 5])
    assert result == [], f"Expected [], got {result}"


def test_single_duplicate():
    result = find_all_duplicates([1, 2, 3, 2])
    assert result == [2], f"Expected [2], got {result}"


def test_multiple_duplicates():
    result = sorted(find_all_duplicates([1, 1, 2, 2, 3, 3]))
    assert result == [1, 2, 3], f"Expected [1, 2, 3], got {result}"


def test_single_element():
    result = find_all_duplicates([1])
    assert result == [], f"Expected [], got {result}"


def test_empty_array():
    result = find_all_duplicates([])
    assert result == [], f"Expected [], got {result}"


def test_all_appear_twice():
    result = sorted(find_all_duplicates([2, 1, 2, 1]))
    assert result == [1, 2], f"Expected [1, 2], got {result}"


def test_does_not_mutate():
    original = [4, 3, 2, 7, 8, 2, 3, 1]
    snapshot = original[:]
    find_all_duplicates(original)
    assert original == snapshot, "Input should not be mutated"


if __name__ == "__main__":
    test_default_input()
    test_no_duplicates()
    test_single_duplicate()
    test_multiple_duplicates()
    test_single_element()
    test_empty_array()
    test_all_appear_twice()
    test_does_not_mutate()
    print("All tests passed!")
