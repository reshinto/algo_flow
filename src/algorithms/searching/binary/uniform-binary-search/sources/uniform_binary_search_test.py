import importlib

uniform_binary_search_module = importlib.import_module("uniform-binary-search")
uniform_binary_search = uniform_binary_search_module.uniform_binary_search


def test_finds_value_present():
    assert uniform_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23) == 5


def test_returns_minus_one_when_not_found():
    assert uniform_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50) == -1


def test_handles_empty_array():
    assert uniform_binary_search([], 5) == -1


def test_single_element_found():
    assert uniform_binary_search([42], 42) == 0


def test_single_element_not_found():
    assert uniform_binary_search([42], 10) == -1


def test_finds_first_element():
    assert uniform_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2) == 0


def test_finds_last_element():
    assert uniform_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91) == 9


def test_finds_middle_element():
    assert uniform_binary_search([10, 20, 30, 40, 50], 30) == 2


def test_returns_minus_one_for_value_smaller_than_all():
    assert uniform_binary_search([5, 10, 15, 20], 1) == -1


def test_returns_minus_one_for_value_larger_than_all():
    assert uniform_binary_search([5, 10, 15, 20], 100) == -1


def test_handles_two_element_array():
    assert uniform_binary_search([3, 7], 7) == 1


def test_handles_power_of_two_length_array():
    assert uniform_binary_search([1, 3, 5, 7, 9, 11, 13, 15], 9) == 4


def test_finds_value_near_start():
    assert uniform_binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 5) == 1


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
    test_handles_two_element_array()
    test_handles_power_of_two_length_array()
    test_finds_value_near_start()
    print("All tests passed!")
