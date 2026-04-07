import importlib

heap_replace_root = importlib.import_module("heap-replace-root").heap_replace_root


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


def test_returns_replaced_value():
    result = heap_replace_root([1, 3, 5, 7, 9, 8, 6], 10)
    assert result["replaced_value"] == 1


def test_valid_min_heap_after_replace():
    result = heap_replace_root([1, 3, 5, 7, 9, 8, 6], 10)
    assert is_min_heap(result["new_heap"])


def test_new_value_in_heap():
    result = heap_replace_root([1, 3, 5, 7, 9, 8, 6], 10)
    assert 10 in result["new_heap"]
    assert 1 not in result["new_heap"]


def test_small_new_value_stays_at_root():
    result = heap_replace_root([1, 3, 5, 7, 9, 8, 6], 2)
    assert result["replaced_value"] == 1
    assert result["new_heap"][0] == 2


def test_large_value_sinks_to_leaf():
    result = heap_replace_root([1, 3, 5, 7, 9, 8, 6], 100)
    assert is_min_heap(result["new_heap"])
    assert result["new_heap"][0] != 100


def test_single_element():
    result = heap_replace_root([42], 7)
    assert result["replaced_value"] == 42
    assert result["new_heap"] == [7]


def test_two_element():
    result = heap_replace_root([1, 5], 10)
    assert result["replaced_value"] == 1
    assert is_min_heap(result["new_heap"])


if __name__ == "__main__":
    test_returns_replaced_value()
    test_valid_min_heap_after_replace()
    test_new_value_in_heap()
    test_small_new_value_stays_at_root()
    test_large_value_sinks_to_leaf()
    test_single_element()
    test_two_element()
    print("All tests passed!")
