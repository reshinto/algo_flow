import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("decode-ways-tabulation")
decode_ways_tabulation = mod.decode_ways_tabulation

assert decode_ways_tabulation("12321") == 6, "'12321' should return 6"
assert decode_ways_tabulation("226") == 3, "'226' should return 3"
assert decode_ways_tabulation("0") == 0, "'0' should return 0"
assert decode_ways_tabulation("10") == 1, "'10' should return 1"
assert decode_ways_tabulation("12") == 2, "'12' should return 2"
assert decode_ways_tabulation("") == 0, "empty string should return 0"
assert decode_ways_tabulation("7") == 1, "'7' should return 1"
assert decode_ways_tabulation("00") == 0, "'00' should return 0"
assert decode_ways_tabulation("27") == 1, "'27' should return 1"

if __name__ == "__main__":
    print("All tests passed!")
