import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("generate-binary-numbers")
generate_binary_numbers = mod.generate_binary_numbers

assert generate_binary_numbers(5) == ["1", "10", "11", "100", "101"]
assert generate_binary_numbers(1) == ["1"]
assert generate_binary_numbers(3) == ["1", "10", "11"]
assert generate_binary_numbers(10) == ["1", "10", "11", "100", "101", "110", "111", "1000", "1001", "1010"]
assert generate_binary_numbers(0) == []

result7 = generate_binary_numbers(7)
for idx in range(len(result7)):
    assert int(result7[idx], 2) == idx + 1

result15 = generate_binary_numbers(15)
assert len(result15) == 15

result8 = generate_binary_numbers(8)
for binary_str in result8:
    assert all(ch in "01" for ch in binary_str)

result4 = generate_binary_numbers(4)
assert result4[-1] == "100"

if __name__ == "__main__":
    print("All tests passed!")
