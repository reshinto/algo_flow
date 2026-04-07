import importlib

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
