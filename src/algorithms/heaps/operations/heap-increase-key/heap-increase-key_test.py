import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

heap_increase_key = importlib.import_module("heap-increase-key").heap_increase_key


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


def test_valid_min_heap_after_increase():
    result = heap_increase_key([1, 3, 5, 7, 9, 8, 6], 1, 10)
    assert is_min_heap(result)


def test_new_value_present():
    result = heap_increase_key([1, 3, 5, 7, 9, 8, 6], 1, 10)
    assert 10 in result
    assert 3 not in result


def test_no_sift_needed():
    result = heap_increase_key([1, 3, 5, 7, 9, 8, 6], 1, 5)
    assert is_min_heap(result)
    assert result[1] == 5


def test_increase_root_causes_sift_down():
    result = heap_increase_key([1, 3, 5, 7, 9, 8, 6], 0, 20)
    assert is_min_heap(result)
    assert result[0] != 20


def test_increase_leaf():
    result = heap_increase_key([1, 3, 5, 7, 9, 8, 6], 6, 100)
    assert is_min_heap(result)
    assert 100 in result


def test_single_element():
    result = heap_increase_key([5], 0, 10)
    assert result == [10]


if __name__ == "__main__":
    test_valid_min_heap_after_increase()
    test_new_value_present()
    test_no_sift_needed()
    test_increase_root_causes_sift_down()
    test_increase_leaf()
    test_single_element()
    print("All tests passed!")
