// Generate Binary Numbers — use a BFS-style queue to produce binary representations of 1 through N
#include <iostream>
#include <queue>
#include <string>
#include <vector>

std::vector<std::string> generateBinaryNumbers(int count) {
    std::queue<std::string> bfsQueue; // @step:initialize
    bfsQueue.push("1");
    std::vector<std::string> result; // @step:initialize
    for (int generationIdx = 0; generationIdx < count; generationIdx++) {
        std::string current = bfsQueue.front(); bfsQueue.pop(); // @step:dequeue
        result.push_back(current); // @step:dequeue
        bfsQueue.push(current + "0"); // @step:enqueue
        bfsQueue.push(current + "1"); // @step:enqueue
    }
    return result; // @step:complete
}

int main() {
    auto result = generateBinaryNumbers(5);
    for (const auto& val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
