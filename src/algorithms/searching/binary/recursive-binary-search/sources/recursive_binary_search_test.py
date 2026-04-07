import importlib

recursive_binary_search_module = importlib.import_module("recursive-binary-search")
recursive_binary_search = recursive_binary_search_module.recursive_binary_search


def test_finds_value_present():
    assert recursive_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23) == 5


def test_returns_minus_one_when_not_found():
    assert recursive_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50) == -1


def test_handles_empty_array():
    assert recursive_binary_search([], 5) == -1


def test_single_element_found():
    assert recursive_binary_search([42], 42) == 0


def test_single_element_not_found():
    assert recursive_binary_search([42], 10) == -1


def test_finds_first_element():
    assert recursive_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2) == 0


def test_finds_last_element():
    assert recursive_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91) == 9


def test_finds_middle_element():
    assert recursive_binary_search([10, 20, 30, 40, 50], 30) == 2


def test_returns_minus_one_for_value_smaller_than_all():
    assert recursive_binary_search([5, 10, 15, 20], 1) == -1


def test_returns_minus_one_for_value_larger_than_all():
    assert recursive_binary_search([5, 10, 15, 20], 100) == -1


def test_finds_value_in_two_element_array():
    assert recursive_binary_search([3, 7], 7) == 1


def test_handles_large_array():
    large_array = list(range(0, 2000, 2))
    assert recursive_binary_search(large_array, 500) == 250


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
    test_finds_value_in_two_element_array()
    test_handles_large_array()
    print("All tests passed!")
