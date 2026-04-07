// Trie Insert and Search
// Inserts a list of words into a trie then checks if a target word exists as a full word.
// Time: O(m) per operation where m = word length
// Space: O(n * m) total for n words of average length m

#include <string>
#include <vector>
#include <unordered_map>

struct TrieNodeIS {
    std::unordered_map<char, TrieNodeIS*> children;
    bool isEnd;
    TrieNodeIS() : isEnd(false) {} // @step:initialize
};

TrieNodeIS* createNodeIS() {
    return new TrieNodeIS(); // @step:initialize
}

bool trieInsertSearch(const std::vector<std::string>& words, const std::string& search) {
    TrieNodeIS* root = createNodeIS(); // @step:initialize

    for (const std::string& word : words) {
        // @step:visit
        TrieNodeIS* current = root; // @step:visit
        for (char ch : word) {
            // @step:insert-trie
            if (current->children.find(ch) == current->children.end()) {
                current->children[ch] = createNodeIS(); // @step:insert-trie
            }
            current = current->children[ch]; // @step:traverse-trie
        }
        current->isEnd = true; // @step:mark-end-word
    }

    TrieNodeIS* current = root; // @step:visit
    for (char ch : search) {
        // @step:traverse-trie
        if (current->children.find(ch) == current->children.end()) {
            return false; // @step:traverse-trie
        }
        current = current->children[ch]; // @step:traverse-trie
    }

    return current->isEnd; // @step:complete
}
