import importlib

binary_search_module = importlib.import_module("binary-search")
binary_search = binary_search_module.binary_search


def test_finds_value_present():
    assert binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23) == 5


def test_returns_minus_one_when_not_found():
    assert binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50) == -1


def test_handles_empty_array():
    assert binary_search([], 5) == -1


def test_single_element_found():
    assert binary_search([42], 42) == 0


def test_single_element_not_found():
    assert binary_search([42], 10) == -1


def test_finds_first_element():
    assert binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2) == 0


def test_finds_last_element():
    assert binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91) == 9


def test_finds_middle_element():
    assert binary_search([10, 20, 30, 40, 50], 30) == 2


def test_returns_minus_one_for_value_smaller_than_all():
    assert binary_search([5, 10, 15, 20], 1) == -1


def test_returns_minus_one_for_value_larger_than_all():
    assert binary_search([5, 10, 15, 20], 100) == -1


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
    print("All tests passed!")
