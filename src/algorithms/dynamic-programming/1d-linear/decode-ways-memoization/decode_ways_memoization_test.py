import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("decode-ways-memoization")
decode_ways_memoization = mod.decode_ways_memoization

assert decode_ways_memoization("") == 0, "empty string should return 0"
assert decode_ways_memoization("1") == 1, "'1' should return 1"
assert decode_ways_memoization("0") == 0, "'0' should return 0"
assert decode_ways_memoization("12") == 2, "'12' should return 2"
assert decode_ways_memoization("27") == 1, "'27' should return 1"
assert decode_ways_memoization("30") == 0, "'30' should return 0"
assert decode_ways_memoization("123") == 3, "'123' should return 3"
assert decode_ways_memoization("12321") == 6, "'12321' should return 6"
assert decode_ways_memoization("226") == 3, "'226' should return 3"
assert decode_ways_memoization("00") == 0, "'00' should return 0"
assert decode_ways_memoization("1201234") == 3, "'1201234' should return 3"

cases = [("1", 1), ("11", 2), ("12", 2), ("21", 2), ("111", 3), ("226", 3)]
for digits, expected in cases:
    assert decode_ways_memoization(digits) == expected, f"'{digits}' should return {expected}"

if __name__ == "__main__":
    print("All tests passed!")
