# Trie Prefix Count
# Builds a trie from a list of words and counts how many words start with a given prefix.
# Each node stores a prefix_count incremented during insertion.
# Time: O(m) for prefix search, O(n * m) to build trie for n words of average length m
# Space: O(n * m) total node storage


class TrieNode:
    def __init__(self) -> None:  # @step:initialize
        self.children: dict[str, "TrieNode"] = {}  # @step:initialize
        self.prefix_count: int = 0  # @step:initialize
        self.is_end: bool = False  # @step:initialize


def trie_prefix_count(words: list[str], prefix: str) -> int:
    root = TrieNode()  # @step:initialize

    for word in words:  # @step:visit
        current = root  # @step:visit
        for char in word:  # @step:insert-trie
            if char not in current.children:  # @step:insert-trie
                current.children[char] = TrieNode()  # @step:insert-trie
            current = current.children[char]  # @step:traverse-trie
            current.prefix_count += 1  # @step:insert-trie
        current.is_end = True  # @step:mark-end-word

    current = root  # @step:visit
    for char in prefix:  # @step:traverse-trie
        if char not in current.children:  # @step:traverse-trie
            return 0  # @step:traverse-trie
        current = current.children[char]  # @step:traverse-trie

    return current.prefix_count  # @step:complete
