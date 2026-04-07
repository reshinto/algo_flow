import importlib

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
