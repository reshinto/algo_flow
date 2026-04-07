import importlib

linear_search_module = importlib.import_module("linear-search")
linear_search = linear_search_module.linear_search


def test_finds_value_present():
    assert linear_search([4, 2, 7, 1, 9, 3, 8, 5], 9) == 4


def test_returns_minus_one_when_not_found():
    assert linear_search([4, 2, 7, 1, 9, 3, 8, 5], 6) == -1


def test_handles_empty_array():
    assert linear_search([], 5) == -1


def test_single_element_found():
    assert linear_search([42], 42) == 0


def test_single_element_not_found():
    assert linear_search([42], 10) == -1


def test_finds_first_element():
    assert linear_search([4, 2, 7, 1, 9, 3, 8, 5], 4) == 0


def test_finds_last_element():
    assert linear_search([4, 2, 7, 1, 9, 3, 8, 5], 5) == 7


def test_returns_first_occurrence_for_duplicates():
    assert linear_search([3, 1, 3, 5, 3], 3) == 0


def test_handles_negative_numbers():
    assert linear_search([-5, -3, 0, 2, 4], -3) == 1


def test_works_on_unsorted_array():
    assert linear_search([9, 3, 1, 7, 2, 5], 7) == 3


if __name__ == "__main__":
    test_finds_value_present()
    test_returns_minus_one_when_not_found()
    test_handles_empty_array()
    test_single_element_found()
    test_single_element_not_found()
    test_finds_first_element()
    test_finds_last_element()
    test_returns_first_occurrence_for_duplicates()
    test_handles_negative_numbers()
    test_works_on_unsorted_array()
    print("All tests passed!")
