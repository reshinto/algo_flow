import importlib

heapify_single_node = importlib.import_module("heapify-single-node").heapify_single_node


def is_path_valid(array, start_idx):
    size = len(array)
    parent_idx = start_idx
    while True:
        left_idx = 2 * parent_idx + 1
        right_idx = 2 * parent_idx + 2
        if left_idx >= size:
            break
        if array[parent_idx] > array[left_idx]:
            return False
        if right_idx < size and array[parent_idx] > array[right_idx]:
            return False
        smallest_child = right_idx if (right_idx < size and array[right_idx] < array[left_idx]) else left_idx
        parent_idx = smallest_child
    return True


def test_sifts_down_root():
    result = heapify_single_node([9, 1, 7, 2, 3, 8, 5, 6, 4], 0)
    assert is_path_valid(result, 0)


def test_root_becomes_minimum():
    result = heapify_single_node([9, 1, 7, 2, 3, 8, 5, 6, 4], 0)
    assert result[0] == 1


def test_preserves_all_elements():
    input_arr = [9, 1, 7, 2, 3, 8, 5, 6, 4]
    result = heapify_single_node(input_arr, 0)
    assert sorted(result) == sorted(input_arr)


def test_non_root_subtree():
    result = heapify_single_node([1, 9, 2, 3, 4, 5, 6], 1)
    assert is_path_valid(result, 1)


def test_no_op_when_valid():
    input_arr = [1, 2, 3, 4, 5, 6, 7]
    result = heapify_single_node(input_arr, 0)
    assert result == input_arr


def test_single_element():
    result = heapify_single_node([42], 0)
    assert result == [42]


def test_leaf_node_no_sift():
    input_arr = [1, 2, 3, 4, 5]
    result = heapify_single_node(input_arr, 4)
    assert result == input_arr


if __name__ == "__main__":
    test_sifts_down_root()
    test_root_becomes_minimum()
    test_preserves_all_elements()
    test_non_root_subtree()
    test_no_op_when_valid()
    test_single_element()
    test_leaf_node_no_sift()
    print("All tests passed!")
