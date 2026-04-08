import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("four-sum")
four_sum = module.four_sum


def test_default_input():
    result = four_sum([1, 0, -1, 0, -2, 2], 0)
    assert len(result) == 3
    assert [-2, -1, 1, 2] in result
    assert [-2, 0, 0, 2] in result
    assert [-1, 0, 0, 1] in result


def test_no_quadruplets():
    result = four_sum([1, 2, 3, 4], 100)
    assert result == []


def test_all_zero_quadruplet():
    result = four_sum([0, 0, 0, 0], 0)
    assert len(result) == 1
    assert [0, 0, 0, 0] in result


def test_fewer_than_four_elements():
    result = four_sum([1, 2, 3], 6)
    assert result == []


def test_empty_input():
    result = four_sum([], 0)
    assert result == []


def test_no_duplicates_with_repeated_input():
    result = four_sum([0, 0, 0, 0, 0], 0)
    assert len(result) == 1


def test_all_sums_equal_target():
    result = four_sum([1, 0, -1, 0, -2, 2], 0)
    for quad in result:
        assert sum(quad) == 0


if __name__ == "__main__":
    test_default_input()
    test_no_quadruplets()
    test_all_zero_quadruplet()
    test_fewer_than_four_elements()
    test_empty_input()
    test_no_duplicates_with_repeated_input()
    test_all_sums_equal_target()
    print("All tests passed!")
