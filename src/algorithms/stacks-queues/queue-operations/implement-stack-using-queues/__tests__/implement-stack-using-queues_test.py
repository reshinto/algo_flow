import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("implement-stack-using-queues")
implement_stack_using_queues = mod.implement_stack_using_queues

assert implement_stack_using_queues([1, 2, 3, 4, 5]) == [5, 4, 3, 2, 1]
assert implement_stack_using_queues([10, 20]) == [20, 10]
assert implement_stack_using_queues([42]) == [42]
assert implement_stack_using_queues([]) == []
assert implement_stack_using_queues([7, 7, 7]) == [7, 7, 7]
assert implement_stack_using_queues([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]
assert implement_stack_using_queues([1, 2, 3]) == [3, 2, 1]
assert implement_stack_using_queues([-3, -1, 0, 2]) == [2, 0, -1, -3]
assert implement_stack_using_queues([10, 20, 30, 40, 50]) == [50, 40, 30, 20, 10]

if __name__ == "__main__":
    print("All tests passed!")
