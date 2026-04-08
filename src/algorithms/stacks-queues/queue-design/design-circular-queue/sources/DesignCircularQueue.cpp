// Design Circular Queue — fixed-capacity ring buffer with front/rear pointers (LeetCode 622)
#include <iostream>
#include <optional>
#include <string>
#include <vector>

std::vector<std::string> designCircularQueue(const std::vector<std::string>& operations, int capacity) {
    std::vector<std::optional<int>> buffer(capacity, std::nullopt); // @step:initialize
    int frontIndex = -1; // @step:initialize
    int rearIndex = -1; // @step:initialize
    int queueSize = 0; // @step:initialize
    std::vector<std::string> results; // @step:initialize

    for (const std::string& operation : operations) {
        // @step:visit
        if (operation.rfind("enqueue", 0) == 0) {
            int value = std::stoi(operation.substr(8)); // @step:enqueue
            if (queueSize == capacity) { // @step:enqueue
                results.push_back("full"); // @step:enqueue
            } else {
                if (frontIndex == -1) { // @step:enqueue
                    frontIndex = 0; // @step:enqueue
                }
                rearIndex = (rearIndex + 1) % capacity; // @step:enqueue
                buffer[rearIndex] = value; // @step:enqueue
                queueSize++; // @step:enqueue
                results.push_back("true"); // @step:enqueue
            }
        } else if (operation == "dequeue") {
            if (queueSize == 0) { // @step:dequeue
                results.push_back("empty"); // @step:dequeue
            } else {
                int dequeuedValue = buffer[frontIndex].value_or(0); // @step:dequeue
                buffer[frontIndex] = std::nullopt; // @step:dequeue
                if (frontIndex == rearIndex) { // @step:dequeue
                    frontIndex = -1; // @step:dequeue
                    rearIndex = -1; // @step:dequeue
                } else {
                    frontIndex = (frontIndex + 1) % capacity; // @step:dequeue
                }
                queueSize--; // @step:dequeue
                results.push_back(std::to_string(dequeuedValue)); // @step:dequeue
            }
        } else if (operation == "front") {
            if (frontIndex == -1) { // @step:peek
                results.push_back("empty"); // @step:peek
            } else {
                results.push_back(std::to_string(buffer[frontIndex].value_or(0))); // @step:peek
            }
        } else if (operation == "rear") {
            if (rearIndex == -1) { // @step:peek
                results.push_back("empty"); // @step:peek
            } else {
                results.push_back(std::to_string(buffer[rearIndex].value_or(0))); // @step:peek
            }
        }
    }

    return results; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<std::string> ops = {"enqueue 1", "enqueue 2", "front", "dequeue", "rear"};
    auto result = designCircularQueue(ops, 3);
    for (const auto& res : result) std::cout << res << " ";
    std::cout << std::endl;
    return 0;
}
#endif
