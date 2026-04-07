// Auto-Complete with Trie
// Builds a trie from a word list, then returns all words that start with the given prefix.
// Time: O(m + k) where m = prefix length, k = total characters in all result words
// Space: O(n * m) for n words of average length m

#include <string>
#include <vector>
#include <unordered_map>

struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool isEnd;
    TrieNode() : isEnd(false) {} // @step:initialize
};

TrieNode* createNode() {
    return new TrieNode(); // @step:initialize
}

void collectWords(TrieNode* node, const std::string& currentPrefix, std::vector<std::string>& results) {
    if (node->isEnd) {
        // @step:add-to-result
        results.push_back(currentPrefix); // @step:add-to-result
    }
    for (auto& childEntry : node->children) {
        // @step:traverse-trie
        collectWords(childEntry.second, currentPrefix + childEntry.first, results); // @step:traverse-trie
    }
}

std::vector<std::string> autoCompleteTrie(const std::vector<std::string>& words, const std::string& prefix) {
    TrieNode* root = createNode(); // @step:initialize

    for (const std::string& word : words) {
        // @step:visit
        TrieNode* current = root; // @step:visit
        for (char ch : word) {
            // @step:insert-trie
            if (current->children.find(ch) == current->children.end()) {
                current->children[ch] = createNode(); // @step:insert-trie
            }
            current = current->children[ch]; // @step:traverse-trie
        }
        current->isEnd = true; // @step:mark-end-word
    }

    TrieNode* prefixNode = root; // @step:visit
    for (char ch : prefix) {
        // @step:traverse-trie
        if (prefixNode->children.find(ch) == prefixNode->children.end()) {
            return {}; // @step:traverse-trie
        }
        prefixNode = prefixNode->children[ch]; // @step:traverse-trie
    }

    std::vector<std::string> results;
    collectWords(prefixNode, prefix, results); // @step:add-to-result
    return results; // @step:complete
}
