import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("valid-parentheses")
valid_parentheses = mod.valid_parentheses

assert valid_parentheses("({[]})") == True
assert valid_parentheses("()") == True
assert valid_parentheses("((()))") == True
assert valid_parentheses("()[]{}") == True
assert valid_parentheses("(]") == False
assert valid_parentheses("([)]") == False
assert valid_parentheses("(") == False
assert valid_parentheses(")") == False
assert valid_parentheses("") == True
assert valid_parentheses("({[]})(") == False

if __name__ == "__main__":
    print("All tests passed!")
