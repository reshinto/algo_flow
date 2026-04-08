import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("max-subarray-kadane")
max_subarray_kadane = mod.max_subarray_kadane

assert max_subarray_kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6, "classic kadane input should return 6"
assert max_subarray_kadane([1]) == 1, "single positive element should return 1"
assert max_subarray_kadane([-1]) == -1, "single negative element should return -1"
assert max_subarray_kadane([5, 4, -1, 7, 8]) == 23, "all mostly positive should return 23"
assert max_subarray_kadane([-3, -2, -1]) == -1, "all negative should return least negative"

if __name__ == "__main__":
    print("All tests passed!")
