import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("three-sum")
three_sum = module.three_sum


def test_default_input():
    result = three_sum([-1, 0, 1, 2, -1, -4])
    assert len(result) == 2
    assert [-1, -1, 2] in result
    assert [-1, 0, 1] in result


def test_no_triplets():
    result = three_sum([1, 2, 3])
    assert result == []


def test_single_zero_triplet():
    result = three_sum([0, 0, 0])
    assert result == [[0, 0, 0]]


def test_single_element():
    result = three_sum([1])
    assert result == []


def test_two_elements():
    result = three_sum([1, -1])
    assert result == []


def test_empty_input():
    result = three_sum([])
    assert result == []


def test_no_duplicates_with_many_zeros():
    result = three_sum([0, 0, 0, 0])
    assert len(result) == 1
    assert [0, 0, 0] in result


def test_all_sums_are_zero():
    result = three_sum([-1, 0, 1, 2, -1, -4])
    for triplet in result:
        assert sum(triplet) == 0


if __name__ == "__main__":
    test_default_input()
    test_no_triplets()
    test_single_zero_triplet()
    test_single_element()
    test_two_elements()
    test_empty_input()
    test_no_duplicates_with_many_zeros()
    test_all_sums_are_zero()
    print("All tests passed!")
