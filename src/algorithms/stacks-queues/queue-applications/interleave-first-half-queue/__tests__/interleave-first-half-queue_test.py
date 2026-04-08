import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("interleave-first-half-queue")
interleave_first_half_queue = mod.interleave_first_half_queue

assert interleave_first_half_queue([1, 2, 3, 4, 5, 6]) == [1, 4, 2, 5, 3, 6]
assert interleave_first_half_queue([1, 2, 3, 4]) == [1, 3, 2, 4]
assert interleave_first_half_queue([1, 2]) == [1, 2]
assert interleave_first_half_queue([42]) == [42]
assert interleave_first_half_queue([]) == []
assert interleave_first_half_queue([1, 2, 3, 4, 5, 6, 7, 8]) == [1, 5, 2, 6, 3, 7, 4, 8]
assert len(interleave_first_half_queue([10, 20, 30, 40])) == 4
assert len(interleave_first_half_queue([10, 20, 30, 40, 50])) == 5

# For even input: alternates between first-half and second-half elements
input_vals = [1, 2, 3, 4, 5, 6]
result = interleave_first_half_queue(input_vals)
half = len(input_vals) // 2
for pair_idx in range(half):
    assert result[pair_idx * 2] == input_vals[pair_idx]
    assert result[pair_idx * 2 + 1] == input_vals[half + pair_idx]

if __name__ == "__main__":
    print("All tests passed!")
