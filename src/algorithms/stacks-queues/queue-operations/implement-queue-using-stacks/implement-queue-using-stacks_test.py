import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("implement-queue-using-stacks")
implement_queue_using_stacks = mod.implement_queue_using_stacks

assert implement_queue_using_stacks([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
assert implement_queue_using_stacks([10, 20]) == [10, 20]
assert implement_queue_using_stacks([42]) == [42]
assert implement_queue_using_stacks([]) == []
assert implement_queue_using_stacks([7, 7, 7]) == [7, 7, 7]
assert implement_queue_using_stacks([5, 4, 3, 2, 1]) == [5, 4, 3, 2, 1]
assert implement_queue_using_stacks([1, 2, 3]) == [1, 2, 3]
assert implement_queue_using_stacks([-3, -1, 0, 2]) == [-3, -1, 0, 2]
vals = [10, 20, 30, 40, 50, 60, 70, 80]
assert implement_queue_using_stacks(vals) == vals

if __name__ == "__main__":
    print("All tests passed!")
