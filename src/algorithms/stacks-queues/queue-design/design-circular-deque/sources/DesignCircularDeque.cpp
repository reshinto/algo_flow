// Design Circular Deque — fixed-capacity ring buffer with front/rear insertion and removal (LeetCode 641)
#include <iostream>
#include <optional>
#include <string>
#include <vector>

std::vector<std::string> designCircularDeque(const std::vector<std::string>& operations, int capacity) {
    std::vector<std::optional<int>> buffer(capacity, std::nullopt); // @step:initialize
    int frontIndex = -1; // @step:initialize
    int rearIndex = -1; // @step:initialize
    int dequeSize = 0; // @step:initialize
    std::vector<std::string> results; // @step:initialize

    for (const std::string& operation : operations) {
        // @step:visit
        if (operation.rfind("pushBack", 0) == 0) {
            int value = std::stoi(operation.substr(9)); // @step:enqueue
            if (dequeSize == capacity) { // @step:enqueue
                results.push_back("full"); // @step:enqueue
            } else {
                if (frontIndex == -1) { // @step:enqueue
                    frontIndex = 0; // @step:enqueue
                }
                rearIndex = (rearIndex + 1) % capacity; // @step:enqueue
                buffer[rearIndex] = value; // @step:enqueue
                dequeSize++; // @step:enqueue
                results.push_back("true"); // @step:enqueue
            }
        } else if (operation.rfind("pushFront", 0) == 0) {
            int value = std::stoi(operation.substr(10)); // @step:enqueue-front
            if (dequeSize == capacity) { // @step:enqueue-front
                results.push_back("full"); // @step:enqueue-front
            } else {
                if (frontIndex == -1) { // @step:enqueue-front
                    frontIndex = 0; // @step:enqueue-front
                    rearIndex = 0; // @step:enqueue-front
                } else {
                    frontIndex = (frontIndex - 1 + capacity) % capacity; // @step:enqueue-front
                }
                buffer[frontIndex] = value; // @step:enqueue-front
                dequeSize++; // @step:enqueue-front
                results.push_back("true"); // @step:enqueue-front
            }
        } else if (operation == "popFront") {
            if (dequeSize == 0) { // @step:dequeue
                results.push_back("empty"); // @step:dequeue
            } else {
                int poppedValue = buffer[frontIndex].value_or(0); // @step:dequeue
                buffer[frontIndex] = std::nullopt; // @step:dequeue
                if (frontIndex == rearIndex) { // @step:dequeue
                    frontIndex = -1; // @step:dequeue
                    rearIndex = -1; // @step:dequeue
                } else {
                    frontIndex = (frontIndex + 1) % capacity; // @step:dequeue
                }
                dequeSize--; // @step:dequeue
                results.push_back(std::to_string(poppedValue)); // @step:dequeue
            }
        } else if (operation == "popBack") {
            if (dequeSize == 0) { // @step:dequeue-rear
                results.push_back("empty"); // @step:dequeue-rear
            } else {
                int poppedValue = buffer[rearIndex].value_or(0); // @step:dequeue-rear
                buffer[rearIndex] = std::nullopt; // @step:dequeue-rear
                if (frontIndex == rearIndex) { // @step:dequeue-rear
                    frontIndex = -1; // @step:dequeue-rear
                    rearIndex = -1; // @step:dequeue-rear
                } else {
                    rearIndex = (rearIndex - 1 + capacity) % capacity; // @step:dequeue-rear
                }
                dequeSize--; // @step:dequeue-rear
                results.push_back(std::to_string(poppedValue)); // @step:dequeue-rear
            }
        } else if (operation == "peekFront") {
            if (frontIndex == -1) { // @step:peek
                results.push_back("empty"); // @step:peek
            } else {
                results.push_back(std::to_string(buffer[frontIndex].value_or(0))); // @step:peek
            }
        } else if (operation == "peekRear") {
            if (rearIndex == -1) { // @step:peek
                results.push_back("empty"); // @step:peek
            } else {
                results.push_back(std::to_string(buffer[rearIndex].value_or(0))); // @step:peek
            }
        }
    }

    return results; // @step:complete
}

int main() {
    std::vector<std::string> ops = {"pushBack 1", "pushBack 2", "peekFront", "popFront", "peekRear"};
    auto result = designCircularDeque(ops, 3);
    for (const auto& res : result) std::cout << res << " ";
    std::cout << std::endl;
    return 0;
}
