import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("minimum-jumps")
minimum_jumps = mod.minimum_jumps

assert minimum_jumps([2, 3, 1, 1, 4]) == 2, "[2,3,1,1,4] should return 2"
assert minimum_jumps([1, 1, 1, 1]) == 3, "[1,1,1,1] should return 3"
assert minimum_jumps([2, 1]) == 1, "[2,1] should return 1"
assert minimum_jumps([0]) == 0, "[0] single element should return 0"
assert minimum_jumps([1, 0, 1]) == -1, "[1,0,1] unreachable should return -1"
assert minimum_jumps([]) == 0, "empty array should return 0"
assert minimum_jumps([5, 1, 1, 1, 1]) == 1, "[5,1,1,1,1] single big jump should return 1"

if __name__ == "__main__":
    print("All tests passed!")
