import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

heap_sort_visualization = importlib.import_module("heap-sort-visualization").heap_sort_visualization


def test_default_input():
    result = heap_sort_visualization([9, 5, 7, 1, 3, 8, 2, 6, 4])
    assert result == [1, 2, 3, 4, 5, 6, 7, 8, 9], f"Expected sorted order, got {result}"


def test_already_sorted():
    result = heap_sort_visualization([1, 2, 3, 4, 5])
    assert result == [1, 2, 3, 4, 5], f"Expected [1,2,3,4,5], got {result}"


def test_reverse_sorted():
    result = heap_sort_visualization([5, 4, 3, 2, 1])
    assert result == [1, 2, 3, 4, 5], f"Expected [1,2,3,4,5], got {result}"


def test_duplicates():
    result = heap_sort_visualization([3, 1, 4, 1, 5, 9, 2, 6, 5])
    assert result == [1, 1, 2, 3, 4, 5, 5, 6, 9], f"Expected sorted with duplicates, got {result}"


def test_single_element():
    result = heap_sort_visualization([42])
    assert result == [42], f"Expected [42], got {result}"


def test_empty_array():
    result = heap_sort_visualization([])
    assert result == [], f"Expected [], got {result}"


def test_two_elements():
    result = heap_sort_visualization([2, 1])
    assert result == [1, 2], f"Expected [1, 2], got {result}"


def test_negative_values():
    result = heap_sort_visualization([-3, 1, -5, 4, 0])
    assert result == [-5, -3, 0, 1, 4], f"Expected [-5,-3,0,1,4], got {result}"


def test_contains_all_original_elements():
    original = [9, 5, 7, 1, 3, 8, 2, 6, 4]
    result = heap_sort_visualization(original)
    assert sorted(result) == sorted(original), f"Result missing elements from original"


if __name__ == "__main__":
    test_default_input()
    test_already_sorted()
    test_reverse_sorted()
    test_duplicates()
    test_single_element()
    test_empty_array()
    test_two_elements()
    test_negative_values()
    test_contains_all_original_elements()
    print("All tests passed!")
