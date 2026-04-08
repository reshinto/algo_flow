import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

find_all_duplicates = importlib.import_module("find-all-duplicates").find_all_duplicates


def test_returns_2_3_for_default():
    assert find_all_duplicates([4, 3, 2, 7, 8, 2, 3, 1]) == [2, 3]


def test_returns_1_for_1_1_2():
    assert find_all_duplicates([1, 1, 2]) == [1]


def test_returns_empty_for_no_duplicates():
    assert find_all_duplicates([1, 2, 3]) == []


def test_returns_empty_for_empty_array():
    assert find_all_duplicates([]) == []


def test_returns_5_for_5_5():
    assert find_all_duplicates([5, 5]) == [5]


def test_returns_1_2_for_1_2_1_2():
    assert find_all_duplicates([1, 2, 1, 2]) == [1, 2]


def test_returns_empty_for_single_element():
    assert find_all_duplicates([7]) == []


def test_handles_all_same_elements():
    assert find_all_duplicates([3, 3, 3]) == [3, 3]


if __name__ == "__main__":
    test_returns_2_3_for_default()
    test_returns_1_for_1_1_2()
    test_returns_empty_for_no_duplicates()
    test_returns_empty_for_empty_array()
    test_returns_5_for_5_5()
    test_returns_1_2_for_1_2_1_2()
    test_returns_empty_for_single_element()
    test_handles_all_same_elements()
    print("All tests passed!")
