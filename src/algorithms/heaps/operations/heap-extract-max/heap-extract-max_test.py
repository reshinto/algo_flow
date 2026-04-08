import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

heap_extract_max = importlib.import_module("heap-extract-max").heap_extract_max


def is_max_heap(array):
    size = len(array)
    for parent_idx in range(size // 2):
        left_idx = 2 * parent_idx + 1
        right_idx = 2 * parent_idx + 2
        if left_idx < size and array[parent_idx] < array[left_idx]:
            return False
        if right_idx < size and array[parent_idx] < array[right_idx]:
            return False
    return True


def test_extracts_maximum():
    result = heap_extract_max([9, 7, 8, 3, 5, 6, 1])
    assert result["extracted_value"] == 9


def test_remaining_is_valid_max_heap():
    result = heap_extract_max([9, 7, 8, 3, 5, 6, 1])
    assert is_max_heap(result["remaining_heap"])


def test_remaining_length():
    result = heap_extract_max([9, 7, 8, 3, 5, 6, 1])
    assert len(result["remaining_heap"]) == 6


def test_all_elements_accounted():
    original = [9, 7, 8, 3, 5, 6, 1]
    result = heap_extract_max(original)
    all_values = sorted([result["extracted_value"]] + result["remaining_heap"])
    assert all_values == sorted(original)


def test_two_element():
    result = heap_extract_max([8, 3])
    assert result["extracted_value"] == 8
    assert result["remaining_heap"] == [3]


def test_single_element():
    result = heap_extract_max([99])
    assert result["extracted_value"] == 99
    assert result["remaining_heap"] == []


def test_new_root_is_second_largest():
    result = heap_extract_max([9, 7, 8, 3, 5, 6, 1])
    assert result["remaining_heap"][0] == 8


if __name__ == "__main__":
    test_extracts_maximum()
    test_remaining_is_valid_max_heap()
    test_remaining_length()
    test_all_elements_accounted()
    test_two_element()
    test_single_element()
    test_new_root_is_second_largest()
    print("All tests passed!")
