import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
mod = importlib.import_module("tribonacci-memoization")
tribonacci_memoization = mod.tribonacci_memoization

assert tribonacci_memoization(0) == 0, "T(0) should be 0"
assert tribonacci_memoization(1) == 1, "T(1) should be 1"
assert tribonacci_memoization(2) == 1, "T(2) should be 1"
assert tribonacci_memoization(4) == 4, "T(4) should be 4"
assert tribonacci_memoization(7) == 24, "T(7) should be 24"
assert tribonacci_memoization(10) == 149, "T(10) should be 149"

expected = [0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149]
for target_index in range(11):
    assert tribonacci_memoization(target_index) == expected[target_index], \
        f"T({target_index}) expected {expected[target_index]}"

if __name__ == "__main__":
    print("All tests passed!")
