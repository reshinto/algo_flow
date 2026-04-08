import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("count-bits")
count_bits = mod.count_bits

assert count_bits(0) == [0], "count_bits(0) should return [0]"
assert count_bits(2) == [0, 1, 1], "count_bits(2) should return [0, 1, 1]"
assert count_bits(5) == [0, 1, 1, 2, 1, 2], "count_bits(5) should return [0, 1, 1, 2, 1, 2]"

result15 = count_bits(15)
assert result15[-1] == 4, "last element of count_bits(15) should be 4"

result10 = count_bits(10)
assert len(result10) == 11, "count_bits(10) should have length 11"

result8 = count_bits(8)
assert result8[0] == 0, "first element is always 0"

result16 = count_bits(16)
for power in [1, 2, 4, 8, 16]:
    assert result16[power] == 1, f"count_bits(16)[{power}] should be 1 (power of two)"

assert result16[7] == 3, "count_bits(16)[7] should be 3"
assert result16[15] == 4, "count_bits(16)[15] should be 4"

if __name__ == "__main__":
    print("All tests passed!")
