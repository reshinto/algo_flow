"""Correctness tests for the longest_common_subsequence function."""

import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

module = importlib.import_module("longest-common-subsequence")
longest_common_subsequence = module.longest_common_subsequence


def test_abcbdab_bdcab():
    assert longest_common_subsequence("ABCBDAB", "BDCAB") == 4


def test_source_empty():
    assert longest_common_subsequence("", "abc") == 0


def test_target_empty():
    assert longest_common_subsequence("abc", "") == 0


def test_two_empty_strings():
    assert longest_common_subsequence("", "") == 0


def test_identical_strings():
    assert longest_common_subsequence("abc", "abc") == 3


def test_no_shared_characters():
    assert longest_common_subsequence("abc", "xyz") == 0


def test_single_shared_character():
    assert longest_common_subsequence("a", "a") == 1


def test_single_chars_differ():
    assert longest_common_subsequence("a", "b") == 0


def test_aggtab_gxtxayb():
    assert longest_common_subsequence("AGGTAB", "GXTXAYB") == 4


def test_abc_ac():
    assert longest_common_subsequence("ABC", "AC") == 2


def test_repeated_characters():
    assert longest_common_subsequence("aaa", "aa") == 2


def test_ab_b():
    assert longest_common_subsequence("AB", "B") == 1


def test_abcde_ace():
    assert longest_common_subsequence("ABCDE", "ACE") == 3


def test_xmjyauz_mzjawxu():
    assert longest_common_subsequence("XMJYAUZ", "MZJAWXU") == 4


if __name__ == "__main__":
    test_abcbdab_bdcab()
    test_source_empty()
    test_target_empty()
    test_two_empty_strings()
    test_identical_strings()
    test_no_shared_characters()
    test_single_shared_character()
    test_single_chars_differ()
    test_aggtab_gxtxayb()
    test_abc_ac()
    test_repeated_characters()
    test_ab_b()
    test_abcde_ace()
    test_xmjyauz_mzjawxu()
    print("All tests passed!")
