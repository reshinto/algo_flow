# Huffman Coding Tree — build optimal prefix-free encoding from character frequencies
import heapq

class HuffmanNode:
    def __init__(self, freq, char=None, left=None, right=None):
        self.freq = freq
        self.char = char
        self.left = left
        self.right = right

    def __lt__(self, other):
        return self.freq < other.freq

def huffman_coding_tree(frequencies: list) -> dict:
    min_heap = [HuffmanNode(item['freq'], item['char']) for item in frequencies]  # @step:initialize
    heapq.heapify(min_heap)  # @step:select-min-freq

    while len(min_heap) > 1:
        left = heapq.heappop(min_heap)  # @step:select-min-freq
        right = heapq.heappop(min_heap)  # @step:select-min-freq
        merged = HuffmanNode(left.freq + right.freq, None, left, right)  # @step:build-node
        heapq.heappush(min_heap, merged)  # @step:build-node

    root = min_heap[0] if min_heap else None
    encodings = {}

    def generate_codes(node, code):
        if not node:
            return
        if node.char is not None:
            encodings[node.char] = code or "0"  # @step:encode-char
            return
        generate_codes(node.left, code + "0")  # @step:traverse-left
        generate_codes(node.right, code + "1")  # @step:traverse-right

    generate_codes(root, "")
    return encodings  # @step:complete
