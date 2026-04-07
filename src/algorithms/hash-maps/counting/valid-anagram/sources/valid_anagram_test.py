import importlib

valid_anagram = importlib.import_module("valid-anagram").valid_anagram


def test_returns_true_for_anagram_nagaram():
    assert valid_anagram("anagram", "nagaram") is True


def test_returns_false_for_rat_car():
    assert valid_anagram("rat", "car") is False


def test_returns_false_for_different_lengths():
    assert valid_anagram("ab", "abc") is False


def test_returns_true_for_identical_single_chars():
    assert valid_anagram("a", "a") is True


def test_returns_false_for_different_single_chars():
    assert valid_anagram("a", "b") is False


def test_returns_true_for_empty_strings():
    assert valid_anagram("", "") is True


def test_returns_true_for_identical_strings():
    assert valid_anagram("listen", "listen") is True


def test_returns_true_for_listen_silent():
    assert valid_anagram("listen", "silent") is True


def test_returns_false_when_extra_repeated_char():
    assert valid_anagram("aab", "aaa") is False


def test_is_case_sensitive():
    assert valid_anagram("Aa", "aa") is False


if __name__ == "__main__":
    test_returns_true_for_anagram_nagaram()
    test_returns_false_for_rat_car()
    test_returns_false_for_different_lengths()
    test_returns_true_for_identical_single_chars()
    test_returns_false_for_different_single_chars()
    test_returns_true_for_empty_strings()
    test_returns_true_for_identical_strings()
    test_returns_true_for_listen_silent()
    test_returns_false_when_extra_repeated_char()
    test_is_case_sensitive()
    print("All tests passed!")
