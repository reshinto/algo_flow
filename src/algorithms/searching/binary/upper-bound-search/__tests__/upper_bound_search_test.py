import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

upper_bound_search_module = importlib.import_module("upper-bound-search")
upper_bound_search = upper_bound_search_module.upper_bound_search


def test_returns_index_of_first_element_strictly_greater():
    assert upper_bound_search([1, 3, 3, 5, 5, 5, 8, 12], 5) == 6


def test_returns_zero_when_target_smaller_than_all():
    assert upper_bound_search([2, 4, 6, 8], 0) == 0


def test_returns_array_length_when_target_equals_last():
    assert upper_bound_search([1, 2, 3, 4], 4) == 4


def test_returns_array_length_when_target_exceeds_all():
    assert upper_bound_search([1, 2, 3, 4], 99) == 4


def test_handles_empty_array():
    assert upper_bound_search([], 5) == 0


def test_single_element_target_smaller():
    assert upper_bound_search([10], 5) == 0


def test_single_element_target_equals():
    assert upper_bound_search([10], 10) == 1


def test_single_element_target_larger():
    assert upper_bound_search([10], 20) == 1


def test_all_elements_duplicates():
    assert upper_bound_search([5, 5, 5, 5, 5], 5) == 5


def test_upper_bound_for_first_element_value():
    assert upper_bound_search([1, 3, 5, 7, 9], 1) == 1


def test_upper_bound_for_last_element_value():
    assert upper_bound_search([1, 3, 5, 7, 9], 9) == 5


def test_upper_bound_within_range_of_duplicates():
    assert upper_bound_search([1, 3, 3, 3, 7], 3) == 4


if __name__ == "__main__":
    test_returns_index_of_first_element_strictly_greater()
    test_returns_zero_when_target_smaller_than_all()
    test_returns_array_length_when_target_equals_last()
    test_returns_array_length_when_target_exceeds_all()
    test_handles_empty_array()
    test_single_element_target_smaller()
    test_single_element_target_equals()
    test_single_element_target_larger()
    test_all_elements_duplicates()
    test_upper_bound_for_first_element_value()
    test_upper_bound_for_last_element_value()
    test_upper_bound_within_range_of_duplicates()
    print("All tests passed!")
