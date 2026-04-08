import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("sliding-window-maximum")
sliding_window_max_monotonic = mod.sliding_window_max_monotonic

assert sliding_window_max_monotonic([1, 3, -1, -3, 5, 3, 6, 7], 3) == [3, 3, 5, 5, 6, 7]
assert sliding_window_max_monotonic([4, 2, 7], 3) == [7]
assert sliding_window_max_monotonic([5, 3, 8, 1], 1) == [5, 3, 8, 1]
assert sliding_window_max_monotonic([1, 2, 3, 4, 5], 3) == [3, 4, 5]
assert sliding_window_max_monotonic([5, 4, 3, 2, 1], 3) == [5, 4, 3]
assert sliding_window_max_monotonic([-4, -2, -7, -1], 2) == [-2, -2, -1]
assert sliding_window_max_monotonic([42], 1) == [42]
assert sliding_window_max_monotonic([3, 3, 3, 3], 2) == [3, 3, 3]

if __name__ == "__main__":
    print("All tests passed!")
