import importlib

first_unique_character = importlib.import_module("first-unique-character").first_unique_character


def test_returns_0_for_leetcode():
    assert first_unique_character("leetcode") == 0


def test_returns_2_for_loveleetcode():
    assert first_unique_character("loveleetcode") == 2


def test_returns_minus1_for_aabb():
    assert first_unique_character("aabb") == -1


def test_returns_0_for_single_char():
    assert first_unique_character("z") == 0


def test_returns_minus1_when_all_repeat():
    assert first_unique_character("aabbcc") == -1


def test_returns_last_index_when_only_last_is_unique():
    assert first_unique_character("aabc") == 2


def test_handles_all_distinct_characters():
    assert first_unique_character("abcde") == 0


def test_returns_minus1_for_abab():
    assert first_unique_character("abab") == -1


def test_handles_aadadaad():
    assert first_unique_character("aadadaad") == -1


def test_finds_uniqueness_considering_full_frequency():
    assert first_unique_character("aba") == 1


if __name__ == "__main__":
    test_returns_0_for_leetcode()
    test_returns_2_for_loveleetcode()
    test_returns_minus1_for_aabb()
    test_returns_0_for_single_char()
    test_returns_minus1_when_all_repeat()
    test_returns_last_index_when_only_last_is_unique()
    test_handles_all_distinct_characters()
    test_returns_minus1_for_abab()
    test_handles_aadadaad()
    test_finds_uniqueness_considering_full_frequency()
    print("All tests passed!")
