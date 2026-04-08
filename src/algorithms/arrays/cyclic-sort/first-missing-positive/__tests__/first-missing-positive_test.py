import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

first_missing_positive_module = importlib.import_module("first-missing-positive")
first_missing_positive = first_missing_positive_module.first_missing_positive


def test_default_input():
    result = first_missing_positive([3, 4, -1, 1, 7, 5, 2])
    assert result["missing_positive"] == 6, f"Expected 6, got {result['missing_positive']}"


def test_one_two_zero():
    result = first_missing_positive([1, 2, 0])
    assert result["missing_positive"] == 3, f"Expected 3, got {result['missing_positive']}"


def test_three_four_neg_one():
    result = first_missing_positive([3, 4, -1, 1])
    assert result["missing_positive"] == 2, f"Expected 2, got {result['missing_positive']}"


def test_large_values():
    result = first_missing_positive([7, 8, 9, 11, 12])
    assert result["missing_positive"] == 1, f"Expected 1, got {result['missing_positive']}"


def test_empty_array():
    result = first_missing_positive([])
    assert result["missing_positive"] == 1, f"Expected 1, got {result['missing_positive']}"


def test_complete_sequence():
    result = first_missing_positive([1, 2, 3, 4, 5])
    assert result["missing_positive"] == 6, f"Expected 6, got {result['missing_positive']}"


def test_all_negative():
    result = first_missing_positive([-1, -2, -3])
    assert result["missing_positive"] == 1, f"Expected 1, got {result['missing_positive']}"


def test_single_one():
    result = first_missing_positive([1])
    assert result["missing_positive"] == 2, f"Expected 2, got {result['missing_positive']}"


def test_single_two():
    result = first_missing_positive([2])
    assert result["missing_positive"] == 1, f"Expected 1, got {result['missing_positive']}"


def test_duplicates():
    result = first_missing_positive([1, 1, 2, 2])
    assert result["missing_positive"] == 3, f"Expected 3, got {result['missing_positive']}"


def test_does_not_mutate():
    original = [3, 4, -1, 1, 7, 5, 2]
    snapshot = original[:]
    first_missing_positive(original)
    assert original == snapshot, "Input should not be mutated"


if __name__ == "__main__":
    test_default_input()
    test_one_two_zero()
    test_three_four_neg_one()
    test_large_values()
    test_empty_array()
    test_complete_sequence()
    test_all_negative()
    test_single_one()
    test_single_two()
    test_duplicates()
    test_does_not_mutate()
    print("All tests passed!")
