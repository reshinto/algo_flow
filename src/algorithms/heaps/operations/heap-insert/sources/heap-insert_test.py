import importlib

heap_insert = importlib.import_module("heap-insert").heap_insert


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


def test_insert_valid_min_heap():
    result = heap_insert([1, 3, 5, 7, 9, 8, 6], 2)
    assert is_min_heap(result)


def test_root_remains_minimum():
    result = heap_insert([1, 3, 5, 7, 9, 8, 6], 2)
    assert result[0] == 1


def test_insert_new_minimum():
    result = heap_insert([3, 5, 7, 9], 1)
    assert result[0] == 1
    assert is_min_heap(result)


def test_insert_larger_than_all():
    result = heap_insert([1, 3, 5, 7], 100)
    assert result[0] == 1
    assert is_min_heap(result)


def test_length_increased():
    original = [1, 3, 5, 7, 9, 8, 6]
    result = heap_insert(original, 2)
    assert len(result) == len(original) + 1


def test_insert_into_single():
    result = heap_insert([5], 3)
    assert result[0] == 3
    assert is_min_heap(result)


def test_insert_into_empty():
    result = heap_insert([], 42)
    assert result == [42]


def test_duplicate_values():
    result = heap_insert([1, 3, 5], 3)
    assert is_min_heap(result)
    assert result.count(3) == 2


if __name__ == "__main__":
    test_insert_valid_min_heap()
    test_root_remains_minimum()
    test_insert_new_minimum()
    test_insert_larger_than_all()
    test_length_increased()
    test_insert_into_single()
    test_insert_into_empty()
    test_duplicate_values()
    print("All tests passed!")
