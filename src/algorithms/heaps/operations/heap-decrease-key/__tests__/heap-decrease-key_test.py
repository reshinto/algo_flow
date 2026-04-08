import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

heap_decrease_key = importlib.import_module("heap-decrease-key").heap_decrease_key


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


def test_produces_valid_min_heap():
    result = heap_decrease_key([1, 5, 3, 7, 9, 8, 6], 3, 2)
    assert is_min_heap(result)


def test_new_value_present():
    result = heap_decrease_key([1, 5, 3, 7, 9, 8, 6], 3, 2)
    assert 2 in result
    assert 7 not in result


def test_correct_multiset():
    result = heap_decrease_key([1, 5, 3, 7, 9, 8, 6], 3, 2)
    assert sorted(result) == [1, 2, 3, 5, 6, 8, 9]


def test_no_sift_needed():
    result = heap_decrease_key([1, 5, 3, 7, 9, 8, 6], 3, 6)
    assert is_min_heap(result)
    assert result[3] == 6


def test_decrease_at_root():
    result = heap_decrease_key([1, 5, 3, 7, 9, 8, 6], 0, -1)
    assert is_min_heap(result)
    assert result[0] == -1


def test_bubbles_to_root():
    result = heap_decrease_key([1, 3, 5, 7, 9, 8, 6], 6, 0)
    assert is_min_heap(result)
    assert result[0] == 0


def test_single_element():
    result = heap_decrease_key([10], 0, 5)
    assert result == [5]


if __name__ == "__main__":
    test_produces_valid_min_heap()
    test_new_value_present()
    test_correct_multiset()
    test_no_sift_needed()
    test_decrease_at_root()
    test_bubbles_to_root()
    test_single_element()
    print("All tests passed!")
