import importlib

module = importlib.import_module("max-consecutive-ones")
max_consecutive_ones = module.max_consecutive_ones


def test_default_input():
    result = max_consecutive_ones([1, 1, 0, 0, 1, 1, 1, 0, 1, 1], 2)
    assert result["max_length"] == 7
    assert result["start_index"] == 0


def test_full_array_covered():
    result = max_consecutive_ones([1, 0, 1, 0, 1], 2)
    assert result["max_length"] == 5


def test_all_ones():
    result = max_consecutive_ones([1, 1, 1, 1], 0)
    assert result["max_length"] == 4
    assert result["start_index"] == 0


def test_no_flips_allowed():
    result = max_consecutive_ones([1, 1, 0, 1, 1], 0)
    assert result["max_length"] == 2


def test_empty_array():
    result = max_consecutive_ones([], 2)
    assert result["max_length"] == 0


def test_single_one():
    result = max_consecutive_ones([1], 0)
    assert result["max_length"] == 1
    assert result["start_index"] == 0


def test_single_zero_with_flip():
    result = max_consecutive_ones([0], 1)
    assert result["max_length"] == 1


def test_all_zeros_with_flips():
    result = max_consecutive_ones([0, 0, 0], 2)
    assert result["max_length"] == 2


def test_window_with_three_ones():
    result = max_consecutive_ones([1, 0, 1], 1)
    assert result["max_length"] == 3


if __name__ == "__main__":
    test_default_input()
    test_full_array_covered()
    test_all_ones()
    test_no_flips_allowed()
    test_empty_array()
    test_single_one()
    test_single_zero_with_flip()
    test_all_zeros_with_flips()
    test_window_with_three_ones()
    print("All tests passed!")
