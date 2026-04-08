import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

find_all_anagrams = importlib.import_module("find-all-anagrams").find_all_anagrams


def test_finds_both_anagram_windows_in_default():
    assert find_all_anagrams("cbaebabacd", "abc") == [0, 6]


def test_finds_consecutive_overlapping_windows():
    assert find_all_anagrams("abab", "ab") == [0, 1, 2]


def test_returns_empty_when_no_anagram():
    assert find_all_anagrams("af", "be") == []


def test_finds_match_when_entire_text_is_anagram():
    assert find_all_anagrams("cba", "abc") == [0]


def test_handles_single_character_pattern():
    assert find_all_anagrams("aaab", "a") == [0, 1, 2]


def test_returns_empty_when_pattern_longer_than_text():
    assert find_all_anagrams("ab", "abc") == []


def test_returns_empty_when_no_window_matches():
    assert find_all_anagrams("aabbcc", "bca") == []


def test_finds_all_windows_for_repeated_char_pattern():
    result = find_all_anagrams("aababb", "aab")
    assert 0 in result
    assert 1 in result


if __name__ == "__main__":
    test_finds_both_anagram_windows_in_default()
    test_finds_consecutive_overlapping_windows()
    test_returns_empty_when_no_anagram()
    test_finds_match_when_entire_text_is_anagram()
    test_handles_single_character_pattern()
    test_returns_empty_when_pattern_longer_than_text()
    test_returns_empty_when_no_window_matches()
    test_finds_all_windows_for_repeated_char_pattern()
    print("All tests passed!")
