// Trie Prefix Count
// Builds a trie from a list of words and counts how many words start with a given prefix.
// Each node stores a prefixCount incremented during insertion.
// Time: O(m) for prefix search, O(n * m) to build trie for n words of average length m
// Space: O(n * m) total node storage

#include <string>
#include <vector>
#include <unordered_map>

struct TrieNodePC {
    std::unordered_map<char, TrieNodePC*> children;
    int prefixCount;
    bool isEnd;
    TrieNodePC() : prefixCount(0), isEnd(false) {} // @step:initialize
};

TrieNodePC* createNodePC() {
    return new TrieNodePC(); // @step:initialize
}

int triePrefixCount(const std::vector<std::string>& words, const std::string& prefix) {
    TrieNodePC* root = createNodePC(); // @step:initialize

    for (const std::string& word : words) {
        // @step:visit
        TrieNodePC* current = root; // @step:visit
        for (char ch : word) {
            // @step:insert-trie
            if (current->children.find(ch) == current->children.end()) {
                current->children[ch] = createNodePC(); // @step:insert-trie
            }
            current = current->children[ch]; // @step:traverse-trie
            current->prefixCount += 1; // @step:insert-trie
        }
        current->isEnd = true; // @step:mark-end-word
    }

    TrieNodePC* current = root; // @step:visit
    for (char ch : prefix) {
        // @step:traverse-trie
        if (current->children.find(ch) == current->children.end()) {
            return 0; // @step:traverse-trie
        }
        current = current->children[ch]; // @step:traverse-trie
    }

    return current->prefixCount; // @step:complete
}
