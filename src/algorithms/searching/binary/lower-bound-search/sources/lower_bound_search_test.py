import importlib

lower_bound_search_module = importlib.import_module("lower-bound-search")
lower_bound_search = lower_bound_search_module.lower_bound_search


def test_finds_first_occurrence_of_repeated_value():
    assert lower_bound_search([1, 3, 3, 5, 5, 5, 8, 12], 5) == 3


def test_finds_exact_position_when_value_exists_once():
    assert lower_bound_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23) == 5


def test_returns_array_length_when_value_larger_than_all():
    assert lower_bound_search([1, 3, 5, 7, 9], 10) == 5


def test_returns_zero_when_value_smaller_than_or_equal_to_first():
    assert lower_bound_search([5, 10, 15, 20], 3) == 0


def test_handles_empty_array():
    assert lower_bound_search([], 5) == 0


def test_single_element_found():
    assert lower_bound_search([42], 42) == 0


def test_single_element_target_larger():
    assert lower_bound_search([42], 100) == 1


def test_returns_zero_for_target_smaller_than_first():
    assert lower_bound_search([5, 10, 15, 20], 1) == 0


def test_finds_first_element():
    assert lower_bound_search([2, 5, 8, 12, 16, 23], 2) == 0


def test_finds_insertion_point_between_elements():
    assert lower_bound_search([2, 5, 8, 12, 16], 6) == 2


def test_handles_all_duplicate_array():
    assert lower_bound_search([5, 5, 5, 5, 5], 5) == 0


def test_returns_array_length_for_target_larger_in_duplicate_array():
    assert lower_bound_search([5, 5, 5, 5, 5], 6) == 5


def test_finds_first_occurrence_at_array_start():
    assert lower_bound_search([3, 3, 3, 5, 7], 3) == 0


if __name__ == "__main__":
    test_finds_first_occurrence_of_repeated_value()
    test_finds_exact_position_when_value_exists_once()
    test_returns_array_length_when_value_larger_than_all()
    test_returns_zero_when_value_smaller_than_or_equal_to_first()
    test_handles_empty_array()
    test_single_element_found()
    test_single_element_target_larger()
    test_returns_zero_for_target_smaller_than_first()
    test_finds_first_element()
    test_finds_insertion_point_between_elements()
    test_handles_all_duplicate_array()
    test_returns_array_length_for_target_larger_in_duplicate_array()
    test_finds_first_occurrence_at_array_start()
    print("All tests passed!")
