import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
_mod = importlib.import_module("min-size-subarray-sum")
min_size_subarray_sum = _mod.min_size_subarray_sum

if __name__ == "__main__":
    result = min_size_subarray_sum([2, 3, 1, 2, 4, 3], 7)
    assert result["min_length"] == 2 and result["start_index"] == 4, f"Got {result}"

    result = min_size_subarray_sum([1, 4, 4], 4)
    assert result["min_length"] == 1, f"Got {result}"

    result = min_size_subarray_sum([1, 1, 1, 1], 10)
    assert result["min_length"] == 0, f"Got {result}"

    result = min_size_subarray_sum([1, 2, 3], 6)
    assert result["min_length"] == 3 and result["start_index"] == 0, f"Got {result}"

    result = min_size_subarray_sum([], 7)
    assert result["min_length"] == 0, f"Got {result}"

    result = min_size_subarray_sum([1, 2, 3], 0)
    assert result["min_length"] == 0, f"Got {result}"

    result = min_size_subarray_sum([7], 7)
    assert result["min_length"] == 1 and result["start_index"] == 0, f"Got {result}"

    result = min_size_subarray_sum([3, 3, 3, 3], 6)
    assert result["min_length"] == 2, f"Got {result}"

    result = min_size_subarray_sum([100, 1, 1, 1, 1], 100)
    assert result["min_length"] == 1 and result["start_index"] == 0, f"Got {result}"

    print("All tests passed!")
