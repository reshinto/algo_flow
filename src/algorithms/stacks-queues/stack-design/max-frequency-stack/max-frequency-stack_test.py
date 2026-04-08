import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("max-frequency-stack")
max_frequency_stack = mod.max_frequency_stack

pop_order = max_frequency_stack([5, 7, 5, 7, 4, 5])
assert pop_order == [5, 7, 5, 4, 7, 5]

pop_order2 = max_frequency_stack([1, 2, 3])
assert pop_order2 == [3, 2, 1]

pop_order3 = max_frequency_stack([9, 9, 9])
assert pop_order3 == [9, 9, 9]

pop_order4 = max_frequency_stack([1, 2, 1, 2])
assert pop_order4 == [2, 1, 2, 1]

pop_order5 = max_frequency_stack([42])
assert pop_order5 == [42]

pop_order6 = max_frequency_stack([])
assert pop_order6 == []

pop_order7 = max_frequency_stack([7, 1, 7, 2, 7])
assert pop_order7[0] == 7
assert pop_order7[1] == 7
assert pop_order7[2] == 2

input_vals = [3, 1, 3, 2, 3, 1]
pop_order8 = max_frequency_stack(input_vals)
assert len(pop_order8) == len(input_vals)

if __name__ == "__main__":
    print("All tests passed!")
