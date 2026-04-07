import importlib

mod = importlib.import_module("longest-valid-parentheses")
longest_valid_parentheses = mod.longest_valid_parentheses

assert longest_valid_parentheses("(()") == 2
assert longest_valid_parentheses(")()())") == 4
assert longest_valid_parentheses("") == 0
assert longest_valid_parentheses("(()())") == 6
assert longest_valid_parentheses("()()") == 4
assert longest_valid_parentheses("(((") == 0

if __name__ == "__main__":
    print("All tests passed!")
