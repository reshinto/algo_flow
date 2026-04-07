import importlib

hash_search_module = importlib.import_module("hash-search")
hash_search = hash_search_module.hash_search


def test_finds_value_present():
    assert hash_search([4, 2, 7, 1, 9, 3, 8, 5], 9) == 4


def test_returns_minus_one_when_not_found():
    assert hash_search([4, 2, 7, 1, 9, 3, 8, 5], 6) == -1


def test_handles_empty_array():
    assert hash_search([], 5) == -1


def test_single_element_found():
    assert hash_search([42], 42) == 0


def test_single_element_not_found():
    assert hash_search([42], 10) == -1


def test_finds_first_element():
    assert hash_search([4, 2, 7, 1, 9, 3, 8, 5], 4) == 0


def test_finds_last_element():
    assert hash_search([4, 2, 7, 1, 9, 3, 8, 5], 5) == 7


def test_finds_middle_element():
    assert hash_search([10, 20, 30, 40, 50], 30) == 2


def test_returns_minus_one_for_value_not_in_array():
    assert hash_search([5, 10, 15, 20], 1) == -1


def test_handles_negative_numbers():
    assert hash_search([-10, -5, 0, 3, 7], -5) == 1


def test_works_on_unsorted_array():
    assert hash_search([9, 3, 1, 7, 2, 5], 7) == 3


if __name__ == "__main__":
    test_finds_value_present()
    test_returns_minus_one_when_not_found()
    test_handles_empty_array()
    test_single_element_found()
    test_single_element_not_found()
    test_finds_first_element()
    test_finds_last_element()
    test_finds_middle_element()
    test_returns_minus_one_for_value_not_in_array()
    test_handles_negative_numbers()
    test_works_on_unsorted_array()
    print("All tests passed!")
