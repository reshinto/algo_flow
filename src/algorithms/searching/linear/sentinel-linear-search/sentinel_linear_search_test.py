import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

sentinel_linear_search_module = importlib.import_module("sentinel-linear-search")
sentinel_linear_search = sentinel_linear_search_module.sentinel_linear_search


def test_finds_value_present():
    assert sentinel_linear_search([4, 2, 7, 1, 9, 3, 8, 5], 9) == 4


def test_returns_minus_one_when_not_found():
    assert sentinel_linear_search([4, 2, 7, 1, 9, 3, 8, 5], 6) == -1


def test_handles_empty_array():
    assert sentinel_linear_search([], 5) == -1


def test_single_element_found():
    assert sentinel_linear_search([42], 42) == 0


def test_single_element_not_found():
    assert sentinel_linear_search([42], 10) == -1


def test_finds_first_element():
    assert sentinel_linear_search([4, 2, 7, 1, 9, 3, 8, 5], 4) == 0


def test_finds_last_element():
    assert sentinel_linear_search([4, 2, 7, 1, 9, 3, 8, 5], 5) == 7


def test_returns_first_occurrence_for_duplicates():
    assert sentinel_linear_search([3, 1, 3, 5, 3], 3) == 0


def test_all_identical_elements_found():
    assert sentinel_linear_search([7, 7, 7, 7], 7) == 0


def test_all_identical_elements_not_found():
    assert sentinel_linear_search([7, 7, 7, 7], 5) == -1


def test_finds_negative_number():
    assert sentinel_linear_search([-5, -3, 0, 2, 4], -3) == 1


def test_returns_minus_one_for_absent_negative_target():
    assert sentinel_linear_search([-5, -3, 0, 2, 4], -1) == -1


if __name__ == "__main__":
    test_finds_value_present()
    test_returns_minus_one_when_not_found()
    test_handles_empty_array()
    test_single_element_found()
    test_single_element_not_found()
    test_finds_first_element()
    test_finds_last_element()
    test_returns_first_occurrence_for_duplicates()
    test_all_identical_elements_found()
    test_all_identical_elements_not_found()
    test_finds_negative_number()
    test_returns_minus_one_for_absent_negative_target()
    print("All tests passed!")
