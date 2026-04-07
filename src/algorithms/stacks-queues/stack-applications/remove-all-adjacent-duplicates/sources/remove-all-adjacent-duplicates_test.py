import importlib

mod = importlib.import_module("remove-all-adjacent-duplicates")
remove_all_adjacent_duplicates = mod.remove_all_adjacent_duplicates

assert remove_all_adjacent_duplicates("abbaca") == "ca"
assert remove_all_adjacent_duplicates("azxxzy") == "ay"
assert remove_all_adjacent_duplicates("") == ""
assert remove_all_adjacent_duplicates("abc") == "abc"
assert remove_all_adjacent_duplicates("aaaaaa") == ""
assert remove_all_adjacent_duplicates("aabb") == ""
assert remove_all_adjacent_duplicates("a") == "a"
assert remove_all_adjacent_duplicates("abba") == ""

if __name__ == "__main__":
    print("All tests passed!")
