# Longest Word in Trie
# Builds a trie from a list of words, then finds the longest word where every prefix is also a word.
# Uses DFS traversal, only following nodes marked as is_end.
# Time: O(n*m) where n = number of words, m = average word length
# Space: O(n*m) for storing all nodes in the trie


class TrieNode:
    def __init__(self) -> None:  # @step:initialize
        self.children: dict[str, "TrieNode"] = {}  # @step:initialize
        self.is_end: bool = False  # @step:initialize


def longest_word_in_trie(words: list[str]) -> str:
    root = TrieNode()  # @step:initialize

    for word in words:  # @step:visit
        current = root  # @step:visit
        for char in word:  # @step:insert-trie
            if char not in current.children:  # @step:insert-trie
                current.children[char] = TrieNode()  # @step:insert-trie
            current = current.children[char]  # @step:traverse-trie
        current.is_end = True  # @step:mark-end-word

    longest_word = ""  # @step:visit

    # DFS stack holds (node, current_word_built) pairs
    dfs_stack: list[tuple[TrieNode, str]] = [(root, "")]  # @step:visit

    while dfs_stack:  # @step:traverse-trie
        current_node, current_word = dfs_stack.pop()  # @step:traverse-trie

        for char, child_node in current_node.children.items():  # @step:traverse-trie
            if child_node.is_end:  # @step:traverse-trie
                next_word = current_word + char  # @step:traverse-trie
                if len(next_word) > len(longest_word) or (
                    len(next_word) == len(longest_word) and next_word < longest_word
                ):
                    longest_word = next_word  # @step:found
                dfs_stack.append((child_node, next_word))  # @step:traverse-trie

    return longest_word  # @step:complete
