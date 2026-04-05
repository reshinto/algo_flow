# Trie Insert and Search
# Inserts a list of words into a trie then checks if a target word exists as a full word.
# Time: O(m) per operation where m = word length
# Space: O(n * m) total for n words of average length m

from typing import Optional


class TrieNode:
    def __init__(self) -> None:  # @step:initialize
        self.children: dict[str, "TrieNode"] = {}  # @step:initialize
        self.is_end: bool = False  # @step:initialize


def trie_insert_search(words: list[str], search: str) -> bool:
    root = TrieNode()  # @step:initialize

    for word in words:  # @step:visit
        current = root  # @step:visit
        for char in word:  # @step:insert-trie
            if char not in current.children:  # @step:insert-trie
                current.children[char] = TrieNode()  # @step:insert-trie
            current = current.children[char]  # @step:traverse-trie
        current.is_end = True  # @step:mark-end-word

    current = root  # @step:visit
    for char in search:  # @step:traverse-trie
        if char not in current.children:  # @step:traverse-trie
            return False  # @step:traverse-trie
        current = current.children[char]  # @step:traverse-trie

    return current.is_end  # @step:complete
