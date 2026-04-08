import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("first-non-repeating-char-stream")
first_non_repeating_char_stream = mod.first_non_repeating_char_stream

assert first_non_repeating_char_stream("aabcbcd") == ["a", "#", "b", "b", "c", "#", "d"]
assert first_non_repeating_char_stream("z") == ["z"]
assert first_non_repeating_char_stream("aabb") == ["a", "#", "b", "#"]
assert first_non_repeating_char_stream("abcd") == ["a", "a", "a", "a"]
assert first_non_repeating_char_stream("aa") == ["a", "#"]
result = first_non_repeating_char_stream("aab")
assert result[0] == "a" and result[1] == "#" and result[2] == "b"
assert first_non_repeating_char_stream("aba") == ["a", "a", "b"]
assert first_non_repeating_char_stream("") == []
result2 = first_non_repeating_char_stream("aaaabc")
assert result2[0] == "a" and result2[1] == "#" and result2[2] == "#" and result2[3] == "#" and result2[4] == "b" and result2[5] == "b"

if __name__ == "__main__":
    print("All tests passed!")
