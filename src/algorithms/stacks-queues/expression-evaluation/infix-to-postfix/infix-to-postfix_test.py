import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("infix-to-postfix")
infix_to_postfix = mod.infix_to_postfix

assert infix_to_postfix("a+b*(c-d)") == "a b c d - * +"
assert infix_to_postfix("a+b") == "a b +"
assert infix_to_postfix("(a+b)*c") == "a b + c *"
assert infix_to_postfix("a+b+c") == "a b + c +"
assert infix_to_postfix("a") == "a"
assert infix_to_postfix("a*b+c") == "a b * c +"
assert infix_to_postfix("a+b*c") == "a b c * +"
assert infix_to_postfix("(a+b)*(c+d)") == "a b + c d + *"
assert infix_to_postfix("a+(b+(c+d))") == "a b c d + + +"
assert infix_to_postfix("a+b*c-d/e") == "a b c * + d e / -"

if __name__ == "__main__":
    print("All tests passed!")
