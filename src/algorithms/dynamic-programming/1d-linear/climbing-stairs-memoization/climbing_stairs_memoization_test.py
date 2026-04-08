import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("climbing-stairs-memoization")
climbing_stairs_memoization = mod.climbing_stairs_memoization

assert climbing_stairs_memoization(0) == 1, "0 stairs should return 1"
assert climbing_stairs_memoization(1) == 1, "1 stair should return 1"
assert climbing_stairs_memoization(2) == 2, "2 stairs should return 2"
assert climbing_stairs_memoization(3) == 3, "3 stairs should return 3"
assert climbing_stairs_memoization(4) == 5, "4 stairs should return 5"
assert climbing_stairs_memoization(6) == 13, "6 stairs should return 13"
assert climbing_stairs_memoization(7) == 21, "7 stairs should return 21"

expected = [1, 1, 2, 3, 5, 8, 13, 21]
for stair_count in range(8):
    assert climbing_stairs_memoization(stair_count) == expected[stair_count], \
        f"stairs={stair_count} expected {expected[stair_count]}"

if __name__ == "__main__":
    print("All tests passed!")
