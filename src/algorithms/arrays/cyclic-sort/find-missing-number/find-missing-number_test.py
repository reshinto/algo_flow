import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

find_missing_number_module = importlib.import_module("find-missing-number")
find_missing_number = find_missing_number_module.find_missing_number


def test_basic_case():
    result = find_missing_number([3, 0, 1])
    assert result["missing_number"] == 2, f"Expected 2, got {result['missing_number']}"


def test_missing_zero():
    result = find_missing_number([1, 2, 3])
    assert result["missing_number"] == 0, f"Expected 0, got {result['missing_number']}"


def test_missing_n():
    result = find_missing_number([0, 1, 2])
    assert result["missing_number"] == 3, f"Expected 3, got {result['missing_number']}"


def test_single_element_zero():
    result = find_missing_number([0])
    assert result["missing_number"] == 1, f"Expected 1, got {result['missing_number']}"


def test_single_element_one():
    result = find_missing_number([1])
    assert result["missing_number"] == 0, f"Expected 0, got {result['missing_number']}"


def test_empty_array():
    result = find_missing_number([])
    assert result["missing_number"] == 0, f"Expected 0, got {result['missing_number']}"


def test_missing_four_in_larger():
    result = find_missing_number([0, 1, 2, 3, 5, 6, 7, 8, 9])
    assert result["missing_number"] == 4, f"Expected 4, got {result['missing_number']}"


def test_unsorted_missing_two():
    result = find_missing_number([0, 1, 3, 4, 5, 6, 7])
    assert result["missing_number"] == 2, f"Expected 2, got {result['missing_number']}"


if __name__ == "__main__":
    test_basic_case()
    test_missing_zero()
    test_missing_n()
    test_single_element_zero()
    test_single_element_one()
    test_empty_array()
    test_missing_four_in_larger()
    test_unsorted_missing_two()
    print("All tests passed!")
