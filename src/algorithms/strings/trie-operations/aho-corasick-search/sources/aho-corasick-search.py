# Aho-Corasick Search
# Multi-pattern string search using a trie augmented with failure links.
# Phase 1: Insert all patterns into a trie.
# Phase 2: Build failure links via BFS (similar to KMP failure function but for a trie).
# Phase 3: Scan text once, following failure links on mismatch, collecting all pattern matches.
# Time: O(n + m + z) where n = text length, m = total pattern chars, z = match count
# Space: O(m * k) where k = alphabet size

from collections import deque
from dataclasses import dataclass, field


@dataclass
class AhoCorasickNode:  # @step:initialize
    children: dict[str, "AhoCorasickNode"] = field(default_factory=dict)  # @step:initialize
    failure_link: "AhoCorasickNode | None" = None  # @step:initialize
    output_patterns: list[str] = field(default_factory=list)  # @step:initialize
    is_end: bool = False  # @step:initialize


def aho_corasick_search(text: str, patterns: list[str]) -> list[str]:
    root = AhoCorasickNode()  # @step:initialize

    # Phase 1: Insert all patterns into the trie
    for pattern in patterns:  # @step:visit
        current = root  # @step:visit
        for char in pattern:  # @step:insert-trie
            if char not in current.children:  # @step:insert-trie
                current.children[char] = AhoCorasickNode()  # @step:insert-trie
            current = current.children[char]  # @step:traverse-trie
        current.is_end = True  # @step:mark-end-word
        current.output_patterns.append(pattern)  # @step:mark-end-word

    # Phase 2: Build failure links via BFS
    bfs_queue: deque[AhoCorasickNode] = deque()  # @step:buildFailureLinks

    for child in root.children.values():  # @step:buildFailureLinks
        child.failure_link = root  # @step:buildFailureLinks
        bfs_queue.append(child)  # @step:buildFailureLinks

    while bfs_queue:  # @step:buildFailureLinks
        current = bfs_queue.popleft()  # @step:buildFailureLinks

        for char, child_node in current.children.items():  # @step:buildFailureLinks
            failure_state = current.failure_link  # @step:buildFailureLinks

            while failure_state is not None and char not in failure_state.children:  # @step:buildFailureLinks
                failure_state = failure_state.failure_link  # @step:buildFailureLinks

            if failure_state:  # @step:buildFailureLinks
                child_node.failure_link = failure_state.children.get(char, root)  # @step:buildFailureLinks
            else:  # @step:buildFailureLinks
                child_node.failure_link = root  # @step:buildFailureLinks

            if child_node.failure_link is child_node:  # @step:buildFailureLinks
                child_node.failure_link = root  # @step:buildFailureLinks

            # Propagate output patterns from failure link
            for output_pattern in child_node.failure_link.output_patterns:  # @step:buildFailureLinks
                if output_pattern not in child_node.output_patterns:  # @step:buildFailureLinks
                    child_node.output_patterns.append(output_pattern)  # @step:buildFailureLinks

            bfs_queue.append(child_node)  # @step:buildFailureLinks

    # Phase 3: Search text using the automaton
    found_patterns: set[str] = set()  # @step:traverse-trie
    current = root  # @step:traverse-trie

    for char in text:  # @step:traverse-trie
        while current is not root and char not in current.children:  # @step:traverse-trie
            current = current.failure_link  # @step:traverse-trie

        if char in current.children:  # @step:traverse-trie
            current = current.children[char]  # @step:traverse-trie

        for matched_pattern in current.output_patterns:  # @step:found
            found_patterns.add(matched_pattern)  # @step:found

    return list(found_patterns)  # @step:complete
