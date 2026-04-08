import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

heap_extract_min = importlib.import_module("heap-extract-min").heap_extract_min


def is_min_heap(array):
    size = len(array)
    for parent_idx in range(size // 2):
        left_idx = 2 * parent_idx + 1
        right_idx = 2 * parent_idx + 2
        if left_idx < size and array[parent_idx] > array[left_idx]:
            return False
        if right_idx < size and array[parent_idx] > array[right_idx]:
            return False
    return True


def test_extracts_minimum():
    result = heap_extract_min([1, 3, 5, 7, 9, 8, 6])
    assert result["extracted_value"] == 1


def test_remaining_is_valid_min_heap():
    result = heap_extract_min([1, 3, 5, 7, 9, 8, 6])
    assert is_min_heap(result["remaining_heap"])


def test_remaining_length():
    result = heap_extract_min([1, 3, 5, 7, 9, 8, 6])
    assert len(result["remaining_heap"]) == 6


def test_all_elements_accounted():
    original = [1, 3, 5, 7, 9, 8, 6]
    result = heap_extract_min(original)
    all_values = sorted([result["extracted_value"]] + result["remaining_heap"])
    assert all_values == sorted(original)


def test_two_element():
    result = heap_extract_min([2, 5])
    assert result["extracted_value"] == 2
    assert result["remaining_heap"] == [5]


def test_single_element():
    result = heap_extract_min([42])
    assert result["extracted_value"] == 42
    assert result["remaining_heap"] == []


def test_new_root_is_second_smallest():
    result = heap_extract_min([1, 3, 5, 7, 9, 8, 6])
    assert result["remaining_heap"][0] == 3


if __name__ == "__main__":
    test_extracts_minimum()
    test_remaining_is_valid_min_heap()
    test_remaining_length()
    test_all_elements_accounted()
    test_two_element()
    test_single_element()
    test_new_root_is_second_smallest()
    print("All tests passed!")
