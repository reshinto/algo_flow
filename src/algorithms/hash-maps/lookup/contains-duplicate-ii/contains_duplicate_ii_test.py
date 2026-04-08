import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

contains_duplicate_ii = importlib.import_module("contains-duplicate-ii").contains_duplicate_ii


def test_returns_true_for_default_within_max_distance():
    assert contains_duplicate_ii([1, 2, 3, 1], 3) is True


def test_returns_false_when_duplicate_beyond_max_distance():
    assert contains_duplicate_ii([1, 2, 3, 1], 2) is False


def test_returns_true_when_adjacent_equal_and_max_distance_1():
    assert contains_duplicate_ii([1, 1, 3, 4], 1) is True


def test_returns_false_for_all_unique():
    assert contains_duplicate_ii([1, 2, 3, 4], 3) is False


def test_returns_false_for_single_element():
    assert contains_duplicate_ii([42], 1) is False


def test_returns_false_for_empty_array():
    assert contains_duplicate_ii([], 0) is False


def test_returns_true_when_max_distance_equals_full_length():
    assert contains_duplicate_ii([1, 2, 3, 4, 1], 4) is True


def test_returns_false_when_max_distance_is_zero():
    assert contains_duplicate_ii([1, 2, 3, 4], 0) is False


def test_handles_negative_numbers():
    assert contains_duplicate_ii([-1, 0, -1], 2) is True


def test_updates_stored_index_on_reappearance():
    assert contains_duplicate_ii([1, 2, 1, 2], 1) is False


def test_returns_true_when_updated_index_creates_qualifying_pair():
    assert contains_duplicate_ii([1, 0, 1, 1], 1) is True


if __name__ == "__main__":
    test_returns_true_for_default_within_max_distance()
    test_returns_false_when_duplicate_beyond_max_distance()
    test_returns_true_when_adjacent_equal_and_max_distance_1()
    test_returns_false_for_all_unique()
    test_returns_false_for_single_element()
    test_returns_false_for_empty_array()
    test_returns_true_when_max_distance_equals_full_length()
    test_returns_false_when_max_distance_is_zero()
    test_handles_negative_numbers()
    test_updates_stored_index_on_reappearance()
    test_returns_true_when_updated_index_creates_qualifying_pair()
    print("All tests passed!")
