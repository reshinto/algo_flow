import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

find_peak_element_module = importlib.import_module("find-peak-element")
find_peak_element = find_peak_element_module.find_peak_element


def test_finds_peak_in_default_example():
    assert find_peak_element([1, 3, 20, 4, 1, 0]) == 2


def test_finds_peak_at_first_element_when_strictly_decreasing():
    assert find_peak_element([5, 4, 3, 2, 1]) == 0


def test_finds_peak_at_last_element_when_strictly_increasing():
    assert find_peak_element([1, 2, 3, 4, 5]) == 4


def test_handles_single_element():
    assert find_peak_element([42]) == 0


def test_finds_peak_in_two_element_array_larger_first():
    assert find_peak_element([10, 5]) == 0


def test_finds_peak_in_two_element_array_larger_second():
    assert find_peak_element([5, 10]) == 1


def test_finds_valid_peak_when_multiple_peaks_exist():
    array = [1, 5, 2, 7, 3]
    peak_index = find_peak_element(array)
    peak_value = array[peak_index]
    left_neighbor = array[peak_index - 1] if peak_index > 0 else float("-inf")
    right_neighbor = array[peak_index + 1] if peak_index < len(array) - 1 else float("-inf")
    assert peak_value > left_neighbor
    assert peak_value > right_neighbor


def test_finds_peak_in_mountain_shaped_array():
    assert find_peak_element([1, 2, 3, 5, 3, 2, 1]) == 3


def test_finds_peak_for_descent_from_start():
    assert find_peak_element([3, 2, 1]) == 0


def test_returns_valid_peak_for_larger_array():
    array = [10, 20, 15, 25, 5, 30, 8]
    peak_index = find_peak_element(array)
    peak_value = array[peak_index]
    left_neighbor = array[peak_index - 1] if peak_index > 0 else float("-inf")
    right_neighbor = array[peak_index + 1] if peak_index < len(array) - 1 else float("-inf")
    assert peak_value > left_neighbor
    assert peak_value > right_neighbor


if __name__ == "__main__":
    test_finds_peak_in_default_example()
    test_finds_peak_at_first_element_when_strictly_decreasing()
    test_finds_peak_at_last_element_when_strictly_increasing()
    test_handles_single_element()
    test_finds_peak_in_two_element_array_larger_first()
    test_finds_peak_in_two_element_array_larger_second()
    test_finds_valid_peak_when_multiple_peaks_exist()
    test_finds_peak_in_mountain_shaped_array()
    test_finds_peak_for_descent_from_start()
    test_returns_valid_peak_for_larger_array()
    print("All tests passed!")
