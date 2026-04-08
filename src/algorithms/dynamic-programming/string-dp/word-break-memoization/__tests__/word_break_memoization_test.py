import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("word-break-memoization")
word_break_memoization = mod.word_break_memoization

assert word_break_memoization("leetcode", ["leet", "code"]) == True, "leetcode should return True"
assert word_break_memoization("catsandog", ["cats", "dog", "sand", "and", "cat"]) == False, "catsandog should return False"
assert word_break_memoization("", ["leet", "code"]) == True, "empty string should return True"
assert word_break_memoization("leet", ["leet", "code"]) == True, "exact match should return True"
assert word_break_memoization("abcd", ["leet", "code"]) == False, "no match should return False"
assert word_break_memoization("applepenapple", ["apple", "pen"]) == True, "applepenapple should return True"
assert word_break_memoization("catsanddog", ["cat", "cats", "and", "sand", "dog"]) == True, "catsanddog should return True"
assert word_break_memoization("aaaaab", ["a", "aa", "aaa", "aaaa"]) == False, "aaaaab should return False"
assert word_break_memoization("pineapple", ["pine", "apple", "pineapple"]) == True, "pineapple should return True"
assert word_break_memoization("abc", ["a", "b", "c"]) == True, "single chars should return True"

if __name__ == "__main__":
    print("All tests passed!")
