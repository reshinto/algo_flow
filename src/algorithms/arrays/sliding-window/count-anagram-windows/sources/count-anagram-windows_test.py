import importlib

module = importlib.import_module("count-anagram-windows")
count_anagram_windows = module.count_anagram_windows


def test_basic_array():
    result = count_anagram_windows([1, 2, 3, 1, 2, 1, 3, 2, 1], [1, 2, 3])
    assert result["count"] > 0
    assert 0 in result["positions"]


def test_anagram_at_first_position():
    result = count_anagram_windows([3, 1, 2, 4, 5], [1, 2, 3])
    assert 0 in result["positions"]


def test_anagram_at_last_position():
    result = count_anagram_windows([4, 5, 1, 2, 3], [3, 2, 1])
    assert 2 in result["positions"]


def test_no_anagram():
    result = count_anagram_windows([1, 1, 1, 1], [1, 2])
    assert result["count"] == 0
    assert len(result["positions"]) == 0


def test_pattern_equals_text_length():
    result = count_anagram_windows([3, 1, 2], [1, 2, 3])
    assert result["count"] == 1
    assert result["positions"] == [0]


def test_pattern_longer_than_text():
    result = count_anagram_windows([1, 2], [1, 2, 3])
    assert result["count"] == 0


def test_empty_text():
    result = count_anagram_windows([], [1, 2])
    assert result["count"] == 0


def test_empty_pattern():
    result = count_anagram_windows([1, 2, 3], [])
    assert result["count"] == 0


def test_count_matches_positions_length():
    result = count_anagram_windows([1, 2, 3, 1, 2, 1, 3, 2, 1], [1, 2, 3])
    assert result["count"] == len(result["positions"])


if __name__ == "__main__":
    test_basic_array()
    test_anagram_at_first_position()
    test_anagram_at_last_position()
    test_no_anagram()
    test_pattern_equals_text_length()
    test_pattern_longer_than_text()
    test_empty_text()
    test_empty_pattern()
    test_count_matches_positions_length()
    print("All tests passed!")
