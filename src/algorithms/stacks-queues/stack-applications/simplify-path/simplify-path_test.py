import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("simplify-path")
simplify_path = mod.simplify_path

assert simplify_path("/a/./b/../../c/") == "/c"
assert simplify_path("/home/") == "/home"
assert simplify_path("/../") == "/"
assert simplify_path("/home//foo/") == "/home/foo"
assert simplify_path("/") == "/"
assert simplify_path("/a/b/c/d") == "/a/b/c/d"
assert simplify_path("/a/b/../../c/d/../e") == "/c/e"
assert simplify_path("/..") == "/"
assert simplify_path("/./././.") == "/"

if __name__ == "__main__":
    print("All tests passed!")
