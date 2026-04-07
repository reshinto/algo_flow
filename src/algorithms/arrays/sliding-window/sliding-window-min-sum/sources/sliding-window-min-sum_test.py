import importlib

module = importlib.import_module("sliding-window-min-sum")
min_sum_subarray = module.min_sum_subarray


def test_default_input():
    result = min_sum_subarray([4, 2, 1, 7, 8, 1, 2, 8, 1, 0], 3)
    assert result["min_sum"] == 7
    assert result["window_start_index"] == 0


def test_window_at_start():
    result = min_sum_subarray([1, 2, 3, 8, 9, 10], 3)
    assert result["min_sum"] == 6
    assert result["window_start_index"] == 0


def test_window_at_end():
    result = min_sum_subarray([10, 9, 8, 1, 2, 3], 3)
    assert result["min_sum"] == 6
    assert result["window_start_index"] == 3


def test_array_equals_window_size():
    result = min_sum_subarray([3, 5, 7], 3)
    assert result["min_sum"] == 15
    assert result["window_start_index"] == 0


def test_window_size_one():
    result = min_sum_subarray([4, 1, 7, 2, 9], 1)
    assert result["min_sum"] == 1
    assert result["window_start_index"] == 1


def test_empty_array():
    result = min_sum_subarray([], 3)
    assert result["min_sum"] == 0


def test_window_size_exceeds_length():
    result = min_sum_subarray([1, 2], 5)
    assert result["min_sum"] == 0


def test_all_same_elements():
    result = min_sum_subarray([5, 5, 5, 5, 5], 2)
    assert result["min_sum"] == 10
    assert result["window_start_index"] == 0


def test_negative_numbers():
    result = min_sum_subarray([-1, -3, -5, -2, -1, -4], 2)
    assert result["min_sum"] == -8
    assert result["window_start_index"] == 1


if __name__ == "__main__":
    test_default_input()
    test_window_at_start()
    test_window_at_end()
    test_array_equals_window_size()
    test_window_size_one()
    test_empty_array()
    test_window_size_exceeds_length()
    test_all_same_elements()
    test_negative_numbers()
    print("All tests passed!")
