import importlib

module = importlib.import_module("boyer-moore-voting")
boyer_moore_voting = module.boyer_moore_voting


def test_basic_majority():
    result = boyer_moore_voting([2, 2, 1, 1, 1, 2, 2])
    assert result["majority_element"] == 2


def test_all_same():
    result = boyer_moore_voting([5, 5, 5])
    assert result["majority_element"] == 5


def test_single_element():
    result = boyer_moore_voting([42])
    assert result["majority_element"] == 42


def test_empty_array():
    result = boyer_moore_voting([])
    assert result["majority_element"] == -1
    assert result["count"] == 0


def test_majority_at_start():
    result = boyer_moore_voting([3, 3, 3, 1, 2])
    assert result["majority_element"] == 3


def test_majority_at_end():
    result = boyer_moore_voting([1, 2, 7, 7, 7])
    assert result["majority_element"] == 7


def test_alternating_with_majority():
    result = boyer_moore_voting([1, 9, 1, 9, 1, 9, 1])
    assert result["majority_element"] == 1


def test_two_equal_elements():
    result = boyer_moore_voting([4, 4])
    assert result["majority_element"] == 4


def test_large_majority():
    result = boyer_moore_voting([6, 6, 6, 1, 6, 2, 6, 3, 6])
    assert result["majority_element"] == 6


def test_negative_numbers():
    result = boyer_moore_voting([-3, -3, 1, -3, 2])
    assert result["majority_element"] == -3


if __name__ == "__main__":
    test_basic_majority()
    test_all_same()
    test_single_element()
    test_empty_array()
    test_majority_at_start()
    test_majority_at_end()
    test_alternating_with_majority()
    test_two_equal_elements()
    test_large_majority()
    test_negative_numbers()
    print("All tests passed!")
