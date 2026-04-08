import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

pq_enqueue = importlib.import_module("pq-enqueue").pq_enqueue


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


def test_enqueue_into_empty():
    result = pq_enqueue([], 5)
    assert result == [5]


def test_enqueue_larger_value():
    result = pq_enqueue([1, 3, 5, 7, 9, 8, 6], 10)
    assert is_min_heap(result)
    assert len(result) == 8
    assert 10 in result


def test_enqueue_smaller_value_bubbles_to_root():
    result = pq_enqueue([1, 3, 5, 7, 9, 8, 6], 0)
    assert is_min_heap(result)
    assert result[0] == 0


def test_enqueue_new_minimum():
    result = pq_enqueue([2, 5, 3, 10, 15, 8, 7], 1)
    assert is_min_heap(result)
    assert result[0] == 1


def test_enqueue_preserves_length_increment():
    original = [1, 3, 5, 7, 9, 8, 6]
    result = pq_enqueue(original, 4)
    assert len(result) == len(original) + 1


def test_enqueue_all_elements_present():
    original = [1, 3, 5, 7, 9, 8, 6]
    result = pq_enqueue(original, 4)
    assert sorted(result) == sorted(original + [4])


def test_enqueue_duplicate_value():
    result = pq_enqueue([1, 3, 5], 3)
    assert is_min_heap(result)
    assert result.count(3) == 2


def test_enqueue_single_element():
    result = pq_enqueue([5], 2)
    assert result == [2, 5]


if __name__ == "__main__":
    test_enqueue_into_empty()
    test_enqueue_larger_value()
    test_enqueue_smaller_value_bubbles_to_root()
    test_enqueue_new_minimum()
    test_enqueue_preserves_length_increment()
    test_enqueue_all_elements_present()
    test_enqueue_duplicate_value()
    test_enqueue_single_element()
    print("All tests passed!")
