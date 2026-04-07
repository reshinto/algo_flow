import importlib

longest_substring_without_repeating = importlib.import_module(
    "longest-substring-without-repeating"
).longest_substring_without_repeating


def test_returns_3_for_abcabcbb():
    assert longest_substring_without_repeating("abcabcbb") == 3


def test_returns_1_for_bbbbb():
    assert longest_substring_without_repeating("bbbbb") == 1


def test_returns_3_for_pwwkew():
    assert longest_substring_without_repeating("pwwkew") == 3


def test_returns_0_for_empty_string():
    assert longest_substring_without_repeating("") == 0


def test_returns_1_for_single_char():
    assert longest_substring_without_repeating("a") == 1


def test_returns_5_for_abcde():
    assert longest_substring_without_repeating("abcde") == 5


def test_returns_2_for_abba():
    assert longest_substring_without_repeating("abba") == 2


def test_returns_3_for_dvdf():
    assert longest_substring_without_repeating("dvdf") == 3


if __name__ == "__main__":
    test_returns_3_for_abcabcbb()
    test_returns_1_for_bbbbb()
    test_returns_3_for_pwwkew()
    test_returns_0_for_empty_string()
    test_returns_1_for_single_char()
    test_returns_5_for_abcde()
    test_returns_2_for_abba()
    test_returns_3_for_dvdf()
    print("All tests passed!")
