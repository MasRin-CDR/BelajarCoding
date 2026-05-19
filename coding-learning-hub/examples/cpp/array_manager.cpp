#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> values = {12, 48, 22, 33, 19};
    int total = 0;

    for (int value : values) {
        total += value;
    }

    int largest = *std::max_element(values.begin(), values.end());

    std::cout << "Total: " << total << std::endl;
    std::cout << "Nilai terbesar: " << largest << std::endl;
    return 0;
}
