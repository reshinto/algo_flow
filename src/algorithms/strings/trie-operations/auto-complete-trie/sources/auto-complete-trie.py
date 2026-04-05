# Auto-Complete with Trie
# Builds a trie from a word list, then returns all words that start with the given prefix.
# Time: O(m + k) where m = prefix length, k = total characters in all result words
# Space: O(n * m) for n words of average length m


class TrieNode:
    def __init__(self) -> None:  # @step:initialize
        self.children: dict[str, "TrieNode"] = {}  # @step:initialize
        self.is_end: bool = False  # @step:initialize


def _collect_words(
    node: TrieNode,
    current_prefix: str,
    results: list[str],
) -> None:
    if node.is_end:  # @step:add-to-result
        results.append(current_prefix)  # @step:add-to-result
    for char, child in node.children.items():  # @step:traverse-trie
        _collect_words(child, current_prefix + char, results)  # @step:traverse-trie


def auto_complete_trie(words: list[str], prefix: str) -> list[str]:
    root = TrieNode()  # @step:initialize

    for word in words:  # @step:visit
        current = root  # @step:visit
        for char in word:  # @step:insert-trie
            if char not in current.children:  # @step:insert-trie
                current.children[char] = TrieNode()  # @step:insert-trie
            current = current.children[char]  # @step:traverse-trie
        current.is_end = True  # @step:mark-end-word

    prefix_node = root  # @step:visit
    for char in prefix:  # @step:traverse-trie
        if char not in prefix_node.children:  # @step:traverse-trie
            return []  # @step:traverse-trie
        prefix_node = prefix_node.children[char]  # @step:traverse-trie

    results: list[str] = []
    _collect_words(prefix_node, prefix, results)  # @step:add-to-result
    return results  # @step:complete
