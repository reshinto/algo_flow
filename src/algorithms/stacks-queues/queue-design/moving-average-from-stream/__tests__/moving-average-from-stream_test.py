import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("moving-average-from-stream")
moving_average_from_stream = mod.moving_average_from_stream

def approx_equal(value, expected, tolerance=0.0001):
    return abs(value - expected) < tolerance

result = moving_average_from_stream([1, 10, 3, 5], 3)
assert approx_equal(result[0], 1.0)
assert approx_equal(result[1], 5.5)
assert approx_equal(result[2], 4.6666, 0.001)
assert approx_equal(result[3], 6.0)

result_k1 = moving_average_from_stream([4, 7, 2], 1)
assert result_k1 == [4, 7, 2]

result_single = moving_average_from_stream([42], 3)
assert result_single == [42]

result_shorter = moving_average_from_stream([2, 4], 5)
assert approx_equal(result_shorter[0], 2.0)
assert approx_equal(result_shorter[1], 3.0)

result_k2 = moving_average_from_stream([10, 20, 30, 40], 2)
assert approx_equal(result_k2[0], 10.0)
assert approx_equal(result_k2[1], 15.0)
assert approx_equal(result_k2[2], 25.0)
assert approx_equal(result_k2[3], 35.0)

result_identical = moving_average_from_stream([5, 5, 5, 5], 3)
for avg in result_identical:
    assert approx_equal(avg, 5.0)

if __name__ == "__main__":
    print("All tests passed!")
