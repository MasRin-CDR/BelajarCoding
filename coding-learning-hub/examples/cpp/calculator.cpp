#include <iostream>
#include <stdexcept>

double calculate(double firstNumber, double secondNumber, char operation) {
    switch (operation) {
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '*':
            return firstNumber * secondNumber;
        case '/':
            if (secondNumber == 0) {
                throw std::runtime_error("Tidak bisa membagi dengan nol.");
            }
            return firstNumber / secondNumber;
        default:
            throw std::runtime_error("Operator tidak didukung.");
    }
}

int main() {
    double firstNumber;
    double secondNumber;
    char operation;

    std::cout << "Masukkan angka pertama: ";
    std::cin >> firstNumber;
    std::cout << "Masukkan operator (+, -, *, /): ";
    std::cin >> operation;
    std::cout << "Masukkan angka kedua: ";
    std::cin >> secondNumber;

    try {
        std::cout << "Hasil: " << calculate(firstNumber, secondNumber, operation) << std::endl;
    } catch (const std::exception& error) {
        std::cerr << "Error: " << error.what() << std::endl;
        return 1;
    }

    return 0;
}
