import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

interpolation_search_module = importlib.import_module("interpolation-search")
interpolation_search = interpolation_search_module.interpolation_search


def test_finds_value_present():
    assert interpolation_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23) == 5


def test_returns_minus_one_when_not_found():
    assert interpolation_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50) == -1


def test_handles_empty_array():
    assert interpolation_search([], 5) == -1


def test_single_element_found():
    assert interpolation_search([42], 42) == 0


def test_single_element_not_found():
    assert interpolation_search([42], 10) == -1


def test_finds_first_element():
    assert interpolation_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2) == 0


def test_finds_last_element():
    assert interpolation_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91) == 9


def test_finds_middle_element():
    assert interpolation_search([10, 20, 30, 40, 50], 30) == 2


def test_returns_minus_one_for_value_smaller_than_all():
    assert interpolation_search([5, 10, 15, 20], 1) == -1


def test_returns_minus_one_for_value_larger_than_all():
    assert interpolation_search([5, 10, 15, 20], 100) == -1


def test_handles_uniformly_distributed_data():
    uniform_array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    assert interpolation_search(uniform_array, 70) == 6


def test_handles_duplicate_values_via_division_by_zero_guard():
    assert interpolation_search([5, 5, 5, 5, 5], 5) == 0


def test_returns_minus_one_for_target_not_in_uniform_value_array():
    assert interpolation_search([5, 5, 5, 5, 5], 7) == -1


if __name__ == "__main__":
    test_finds_value_present()
    test_returns_minus_one_when_not_found()
    test_handles_empty_array()
    test_single_element_found()
    test_single_element_not_found()
    test_finds_first_element()
    test_finds_last_element()
    test_finds_middle_element()
    test_returns_minus_one_for_value_smaller_than_all()
    test_returns_minus_one_for_value_larger_than_all()
    test_handles_uniformly_distributed_data()
    test_handles_duplicate_values_via_division_by_zero_guard()
    test_returns_minus_one_for_target_not_in_uniform_value_array()
    print("All tests passed!")
