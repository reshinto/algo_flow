import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

ternary_search_module = importlib.import_module("ternary-search")
ternary_search = ternary_search_module.ternary_search


def test_finds_value_present():
    assert ternary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 72) == 8


def test_returns_minus_one_when_not_found():
    assert ternary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50) == -1


def test_handles_empty_array():
    assert ternary_search([], 5) == -1


def test_single_element_found():
    assert ternary_search([42], 42) == 0


def test_single_element_not_found():
    assert ternary_search([42], 10) == -1


def test_finds_first_element():
    assert ternary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2) == 0


def test_finds_last_element():
    assert ternary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91) == 9


def test_finds_middle_element():
    assert ternary_search([10, 20, 30, 40, 50], 30) == 2


def test_returns_minus_one_for_value_smaller_than_all():
    assert ternary_search([5, 10, 15, 20], 1) == -1


def test_returns_minus_one_for_value_larger_than_all():
    assert ternary_search([5, 10, 15, 20], 100) == -1


def test_handles_negative_numbers():
    assert ternary_search([-10, -5, 0, 3, 7], -5) == 1


def test_finds_element_in_two_element_array():
    assert ternary_search([1, 2], 2) == 1


def test_finds_element_at_mid1_position():
    assert ternary_search([1, 2, 3, 4, 5, 6, 7, 8, 9], 4) == 3


def test_finds_element_at_mid2_position():
    assert ternary_search([1, 2, 3, 4, 5, 6, 7, 8, 9], 7) == 6


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
    test_handles_negative_numbers()
    test_finds_element_in_two_element_array()
    test_finds_element_at_mid1_position()
    test_finds_element_at_mid2_position()
    print("All tests passed!")
