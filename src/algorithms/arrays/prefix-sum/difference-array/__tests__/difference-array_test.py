import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("difference-array")
difference_array = module.difference_array


def test_single_range_update():
    assert difference_array(5, [[1, 3, 3]]) == [0, 3, 3, 3, 0]


def test_overlapping_updates():
    assert difference_array(5, [[0, 4, 1], [1, 3, 2]]) == [1, 3, 3, 3, 1]


def test_full_range_update():
    assert difference_array(4, [[0, 3, 5]]) == [5, 5, 5, 5]


def test_single_element_update():
    assert difference_array(4, [[2, 2, 7]]) == [0, 0, 7, 0]


def test_no_updates():
    assert difference_array(5, []) == [0, 0, 0, 0, 0]


def test_negative_delta():
    assert difference_array(5, [[1, 3, -4]]) == [0, -4, -4, -4, 0]


def test_default_input():
    result = difference_array(8, [[1, 4, 3], [2, 6, -1], [0, 3, 2]])
    assert result == [2, 5, 4, 4, 2, -1, -1, 0]


if __name__ == "__main__":
    test_single_range_update()
    test_overlapping_updates()
    test_full_range_update()
    test_single_element_update()
    test_no_updates()
    test_negative_delta()
    test_default_input()
    print("All tests passed!")
