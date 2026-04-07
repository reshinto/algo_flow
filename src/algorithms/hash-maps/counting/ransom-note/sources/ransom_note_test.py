import importlib

ransom_note = importlib.import_module("ransom-note").ransom_note


def test_returns_true_when_magazine_has_exact_chars():
    assert ransom_note("aa", "aab") is True


def test_returns_false_when_magazine_lacks_required_char():
    assert ransom_note("a", "b") is False


def test_returns_false_when_not_enough_copies():
    assert ransom_note("aa", "ab") is False


def test_returns_true_when_ransom_note_is_empty():
    assert ransom_note("", "abc") is True


def test_returns_true_when_both_empty():
    assert ransom_note("", "") is True


def test_returns_false_when_note_nonempty_magazine_empty():
    assert ransom_note("a", "") is False


def test_returns_true_with_extra_magazine_chars():
    assert ransom_note("abc", "aabbcc") is True


def test_returns_false_for_char_not_in_magazine():
    assert ransom_note("z", "abcde") is False


def test_returns_true_for_single_matching_char():
    assert ransom_note("x", "x") is True


def test_handles_repeated_chars_exact_count():
    assert ransom_note("aaa", "aaab") is True
    assert ransom_note("aaaa", "aaab") is False


if __name__ == "__main__":
    test_returns_true_when_magazine_has_exact_chars()
    test_returns_false_when_magazine_lacks_required_char()
    test_returns_false_when_not_enough_copies()
    test_returns_true_when_ransom_note_is_empty()
    test_returns_true_when_both_empty()
    test_returns_false_when_note_nonempty_magazine_empty()
    test_returns_true_with_extra_magazine_chars()
    test_returns_false_for_char_not_in_magazine()
    test_returns_true_for_single_matching_char()
    test_handles_repeated_chars_exact_count()
    print("All tests passed!")
