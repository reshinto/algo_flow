import importlib

pq_dequeue = importlib.import_module("pq-dequeue").pq_dequeue


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


def test_dequeues_minimum():
    result = pq_dequeue([1, 3, 5, 7, 9, 8, 6])
    assert result["dequeued_value"] == 1


def test_remaining_is_valid_min_heap():
    result = pq_dequeue([1, 3, 5, 7, 9, 8, 6])
    assert is_min_heap(result["remaining_queue"])


def test_remaining_length():
    result = pq_dequeue([1, 3, 5, 7, 9, 8, 6])
    assert len(result["remaining_queue"]) == 6


def test_all_elements_accounted():
    original = [1, 3, 5, 7, 9, 8, 6]
    result = pq_dequeue(original)
    all_values = sorted([result["dequeued_value"]] + result["remaining_queue"])
    assert all_values == sorted(original)


def test_two_element():
    result = pq_dequeue([2, 5])
    assert result["dequeued_value"] == 2
    assert result["remaining_queue"] == [5]


def test_single_element():
    result = pq_dequeue([42])
    assert result["dequeued_value"] == 42
    assert result["remaining_queue"] == []


def test_new_root_is_second_smallest():
    result = pq_dequeue([1, 3, 5, 7, 9, 8, 6])
    assert result["remaining_queue"][0] == 3


def test_larger_heap():
    result = pq_dequeue([2, 5, 3, 10, 15, 8, 7])
    assert result["dequeued_value"] == 2
    assert is_min_heap(result["remaining_queue"])


if __name__ == "__main__":
    test_dequeues_minimum()
    test_remaining_is_valid_min_heap()
    test_remaining_length()
    test_all_elements_accounted()
    test_two_element()
    test_single_element()
    test_new_root_is_second_smallest()
    test_larger_heap()
    print("All tests passed!")
