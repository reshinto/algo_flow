import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

multiset_intersection_module = importlib.import_module("multiset-intersection")
multiset_intersection = multiset_intersection_module.multiset_intersection


def test_sorted_bag_intersection_default():
    result = multiset_intersection([1, 1, 2, 3, 3, 3], [1, 1, 1, 2, 2, 3])
    assert result == [1, 1, 2, 3]


def test_both_empty():
    result = multiset_intersection([], [])
    assert result == []


def test_array_a_empty():
    result = multiset_intersection([], [1, 2, 3])
    assert result == []


def test_array_b_empty():
    result = multiset_intersection([1, 2, 3], [])
    assert result == []


def test_disjoint_arrays():
    result = multiset_intersection([1, 3, 5], [2, 4, 6])
    assert result == []


def test_min_count_from_smaller_side():
    result = multiset_intersection([5, 5, 5], [5])
    assert result == [5]


def test_identical_arrays():
    result = multiset_intersection([1, 2, 2, 3], [1, 2, 2, 3])
    assert result == [1, 2, 2, 3]


def test_single_element_match():
    result = multiset_intersection([7], [7])
    assert result == [7]


def test_single_element_no_match():
    result = multiset_intersection([7], [8])
    assert result == []


def test_output_is_sorted():
    result = multiset_intersection([3, 1, 2, 2], [4, 2, 1, 3])
    assert result == sorted(result)


if __name__ == "__main__":
    test_sorted_bag_intersection_default()
    test_both_empty()
    test_array_a_empty()
    test_array_b_empty()
    test_disjoint_arrays()
    test_min_count_from_smaller_side()
    test_identical_arrays()
    test_single_element_match()
    test_single_element_no_match()
    test_output_is_sorted()
    print("All tests passed!")
