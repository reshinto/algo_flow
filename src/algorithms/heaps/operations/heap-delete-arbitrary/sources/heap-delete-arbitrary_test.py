import importlib

heap_delete_arbitrary = importlib.import_module("heap-delete-arbitrary").heap_delete_arbitrary


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


def test_removes_node_and_maintains_heap():
    result = heap_delete_arbitrary([1, 3, 5, 7, 9, 8, 6], 2)
    assert is_min_heap(result)
    assert len(result) == 6


def test_deleted_value_not_in_result():
    result = heap_delete_arbitrary([1, 3, 5, 7, 9, 8, 6], 2)
    assert sorted(result) == sorted([1, 3, 6, 7, 8, 9])


def test_delete_root():
    result = heap_delete_arbitrary([1, 3, 5, 7, 9, 8, 6], 0)
    assert is_min_heap(result)
    assert len(result) == 6
    assert result[0] != 1


def test_delete_last():
    result = heap_delete_arbitrary([1, 3, 5, 7, 9, 8, 6], 6)
    assert len(result) == 6
    assert is_min_heap(result)


def test_two_element_delete_index0():
    result = heap_delete_arbitrary([1, 5], 0)
    assert result == [5]


def test_two_element_delete_index1():
    result = heap_delete_arbitrary([1, 5], 1)
    assert result == [1]


def test_single_element():
    result = heap_delete_arbitrary([42], 0)
    assert result == []


def test_sift_up_triggered():
    result = heap_delete_arbitrary([1, 10, 5, 15, 20, 8, 6], 3)
    assert is_min_heap(result)


if __name__ == "__main__":
    test_removes_node_and_maintains_heap()
    test_deleted_value_not_in_result()
    test_delete_root()
    test_delete_last()
    test_two_element_delete_index0()
    test_two_element_delete_index1()
    test_single_element()
    test_sift_up_triggered()
    print("All tests passed!")
