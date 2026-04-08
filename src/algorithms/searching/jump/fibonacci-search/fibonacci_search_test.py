import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

fibonacci_search_module = importlib.import_module("fibonacci-search")
fibonacci_search = fibonacci_search_module.fibonacci_search


def test_finds_value_present():
    assert fibonacci_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 38) == 6


def test_returns_minus_one_when_not_found():
    assert fibonacci_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50) == -1


def test_handles_empty_array():
    assert fibonacci_search([], 5) == -1


def test_single_element_found():
    assert fibonacci_search([42], 42) == 0


def test_single_element_not_found():
    assert fibonacci_search([42], 10) == -1


def test_finds_first_element():
    assert fibonacci_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2) == 0


def test_finds_last_element():
    assert fibonacci_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91) == 9


def test_finds_middle_element():
    assert fibonacci_search([10, 20, 30, 40, 50], 30) == 2


def test_returns_minus_one_for_value_smaller_than_all():
    assert fibonacci_search([5, 10, 15, 20], 1) == -1


def test_returns_minus_one_for_value_larger_than_all():
    assert fibonacci_search([5, 10, 15, 20], 100) == -1


def test_handles_negative_numbers():
    assert fibonacci_search([-10, -5, 0, 3, 7], -5) == 1


def test_finds_second_element_in_two_element_array():
    assert fibonacci_search([1, 2], 2) == 1


def test_finds_first_element_in_two_element_array():
    assert fibonacci_search([1, 2], 1) == 0


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
    test_finds_second_element_in_two_element_array()
    test_finds_first_element_in_two_element_array()
    print("All tests passed!")
