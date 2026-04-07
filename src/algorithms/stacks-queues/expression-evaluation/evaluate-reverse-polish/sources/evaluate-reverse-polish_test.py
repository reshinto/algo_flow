import importlib
import sys

mod = importlib.import_module("evaluate-reverse-polish")
evaluate_reverse_polish = mod.evaluate_reverse_polish

assert evaluate_reverse_polish(["2", "1", "+", "3", "*"]) == 9
assert evaluate_reverse_polish(["4", "13", "5", "/", "+"]) == 6
assert evaluate_reverse_polish(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]) == 22
assert evaluate_reverse_polish(["42"]) == 42
assert evaluate_reverse_polish(["3", "4", "+"]) == 7
assert evaluate_reverse_polish(["10", "3", "-"]) == 7
assert evaluate_reverse_polish(["5", "6", "*"]) == 30
assert evaluate_reverse_polish(["7", "2", "/"]) == 3
assert evaluate_reverse_polish(["7", "-3", "/"]) == -2
assert evaluate_reverse_polish(["-3", "4", "*"]) == -12
assert evaluate_reverse_polish(["2", "3", "+", "4", "1", "-", "*"]) == 15

if __name__ == "__main__":
    print("All tests passed!")
