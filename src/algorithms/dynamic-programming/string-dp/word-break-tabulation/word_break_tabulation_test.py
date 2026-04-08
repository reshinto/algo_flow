import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("word-break-tabulation")
word_break_tabulation = mod.word_break_tabulation

assert word_break_tabulation("leetcode", ["leet", "code"]) == True, "leetcode should return True"
assert word_break_tabulation("applepenapple", ["apple", "pen"]) == True, "applepenapple should return True"
assert word_break_tabulation("catsandog", ["cats", "dog", "sand", "and", "cat"]) == False, "catsandog should return False"
assert word_break_tabulation("", ["a"]) == True, "empty string should return True"
assert word_break_tabulation("catsanddog", ["cats", "dog", "sand", "and", "cat"]) == True, "catsanddog should return True"
assert word_break_tabulation("hello", ["world", "foo"]) == False, "no match should return False"
assert word_break_tabulation("apple", ["apple", "pen"]) == True, "exact match should return True"
assert word_break_tabulation("leetcoderr", ["leet", "code"]) == False, "partial leftover should return False"
assert word_break_tabulation("aaaa", ["a", "aa"]) == True, "repeated word usage should return True"
assert word_break_tabulation("abcd", ["ab", "cd", "abc"]) == True, "abcd should return True"

if __name__ == "__main__":
    print("All tests passed!")
