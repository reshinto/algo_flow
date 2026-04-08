import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

bogo_sort_module = importlib.import_module("bogo-sort")
bogo_sort = bogo_sort_module.bogo_sort


def test_sorts_small_array_using_seeded_prng():
    result = bogo_sort([3, 1, 2])
    assert result == [1, 2, 3]


def test_handles_already_sorted_array():
    assert bogo_sort([1, 2, 3]) == [1, 2, 3]


def test_handles_single_element_array():
    assert bogo_sort([42]) == [42]


def test_handles_empty_array():
    assert bogo_sort([]) == []


def test_does_not_mutate_original_array():
    original = [3, 1, 2]
    sorted_result = bogo_sort(original)
    assert sorted_result == [1, 2, 3]
    assert original == [3, 1, 2]


def test_produces_sorted_result_within_cap():
    result = bogo_sort([2, 1])
    assert isinstance(result, list)
    assert len(result) == 2
    # With seed 42 and only 2 elements, it should sort quickly
    assert result[0] <= result[1]


if __name__ == "__main__":
    test_sorts_small_array_using_seeded_prng()
    test_handles_already_sorted_array()
    test_handles_single_element_array()
    test_handles_empty_array()
    test_does_not_mutate_original_array()
    test_produces_sorted_result_within_cap()
    print("All tests passed!")
