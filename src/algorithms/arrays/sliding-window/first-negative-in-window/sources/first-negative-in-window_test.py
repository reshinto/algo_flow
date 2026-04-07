import importlib

module = importlib.import_module("first-negative-in-window")
first_negative_in_window = module.first_negative_in_window


def test_default_input():
    result = first_negative_in_window([12, -1, -7, 8, -15, 30, 16, 28], 3)
    assert result == [-1, -1, -7, -15, -15, 0]


def test_no_negatives():
    result = first_negative_in_window([1, 2, 3, 4, 5], 3)
    assert result == [0, 0, 0]


def test_all_negatives():
    result = first_negative_in_window([-3, -5, -2, -8], 2)
    assert result == [-3, -5, -2]


def test_window_size_one():
    result = first_negative_in_window([4, -2, 3, -1], 1)
    assert result == [0, -2, 0, -1]


def test_window_full_array():
    result = first_negative_in_window([1, 2, -3, 4], 4)
    assert result == [-3]


def test_empty_input():
    assert first_negative_in_window([], 3) == []


def test_window_exceeds_length():
    assert first_negative_in_window([1, 2], 5) == []


def test_window_size_zero():
    assert first_negative_in_window([1, -2, 3], 0) == []


def test_correct_output_length():
    input_array = [12, -1, -7, 8, -15, 30, 16, 28]
    window_size = 3
    result = first_negative_in_window(input_array, window_size)
    assert len(result) == len(input_array) - window_size + 1


if __name__ == "__main__":
    test_default_input()
    test_no_negatives()
    test_all_negatives()
    test_window_size_one()
    test_window_full_array()
    test_empty_input()
    test_window_exceeds_length()
    test_window_size_zero()
    test_correct_output_length()
    print("All tests passed!")
