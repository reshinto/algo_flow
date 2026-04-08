// Longest Word in Trie
// Builds a trie from a list of words, then finds the longest word where every prefix is also a word.
// Uses DFS traversal, only following nodes marked as isEnd.
// Time: O(n*m) where n = number of words, m = average word length
// Space: O(n*m) for storing all nodes in the trie

#include <string>
#include <vector>
#include <unordered_map>
#include <stack>

struct TrieNodeLW {
    std::unordered_map<char, TrieNodeLW*> children;
    bool isEnd;
    TrieNodeLW() : isEnd(false) {} // @step:initialize
};

TrieNodeLW* createTrieNode() {
    return new TrieNodeLW(); // @step:initialize
}

std::string longestWordInTrie(const std::vector<std::string>& words) {
    TrieNodeLW* root = createTrieNode(); // @step:initialize

    for (const std::string& word : words) {
        // @step:visit
        TrieNodeLW* current = root; // @step:visit
        for (char ch : word) {
            // @step:insert-trie
            if (current->children.find(ch) == current->children.end()) {
                current->children[ch] = createTrieNode(); // @step:insert-trie
            }
            current = current->children[ch]; // @step:traverse-trie
        }
        current->isEnd = true; // @step:mark-end-word
    }

    std::string longestWord; // @step:visit

    // DFS stack holds [node, currentWordBuilt] pairs
    std::stack<std::pair<TrieNodeLW*, std::string>> dfsStack; // @step:visit
    dfsStack.push({root, ""}); // @step:visit

    while (!dfsStack.empty()) {
        // @step:traverse-trie
        auto entry = dfsStack.top();
        dfsStack.pop(); // @step:traverse-trie
        TrieNodeLW* currentNode = entry.first;
        std::string currentWord = entry.second;

        for (auto& childEntry : currentNode->children) {
            // @step:traverse-trie
            if (childEntry.second->isEnd) {
                // @step:traverse-trie
                std::string nextWord = currentWord + childEntry.first; // @step:traverse-trie
                if (nextWord.length() > longestWord.length()
                    || (nextWord.length() == longestWord.length() && nextWord < longestWord)) {
                    longestWord = nextWord; // @step:found
                }
                dfsStack.push({childEntry.second, nextWord}); // @step:traverse-trie
            }
        }
    }

    return longestWord; // @step:complete
}
