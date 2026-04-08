import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("sum-of-subarray-minimums")
sum_of_subarray_minimums = mod.sum_of_subarray_minimums

assert sum_of_subarray_minimums([3, 1, 2, 4]) == 17
assert sum_of_subarray_minimums([11, 81, 94, 43, 3]) == 444
assert sum_of_subarray_minimums([5]) == 5
assert sum_of_subarray_minimums([2, 2, 2]) == 12
assert sum_of_subarray_minimums([1, 2, 3]) == 10
assert sum_of_subarray_minimums([3, 2, 1]) == 10
assert sum_of_subarray_minimums([1, 1]) == 3

MOD = 1_000_000_007
large_result = sum_of_subarray_minimums([30000] * 100)
assert 0 <= large_result < MOD

if __name__ == "__main__":
    print("All tests passed!")
