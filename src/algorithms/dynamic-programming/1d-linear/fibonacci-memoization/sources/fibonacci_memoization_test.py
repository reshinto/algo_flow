import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
mod = importlib.import_module("fibonacci-memoization")
fibonacci_memoization = mod.fibonacci_memoization

assert fibonacci_memoization(0) == 0, "F(0) should be 0"
assert fibonacci_memoization(1) == 1, "F(1) should be 1"
assert fibonacci_memoization(2) == 1, "F(2) should be 1"
assert fibonacci_memoization(8) == 21, "F(8) should be 21"
assert fibonacci_memoization(10) == 55, "F(10) should be 55"
assert fibonacci_memoization(15) == 610, "F(15) should be 610"

expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
for target_index in range(11):
    assert fibonacci_memoization(target_index) == expected[target_index], \
        f"F({target_index}) expected {expected[target_index]}"

if __name__ == "__main__":
    print("All tests passed!")
