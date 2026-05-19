#include <iostream>
#include <string>
#include <utility>
#include <vector>

class StudentProgress {
   public:
    explicit StudentProgress(std::string studentName) : name(std::move(studentName)) {}

    void addModule(const std::string& moduleName) {
        completedModules.push_back(moduleName);
    }

    void printSummary() const {
        std::cout << "Siswa: " << name << std::endl;
        std::cout << "Modul selesai: " << completedModules.size() << std::endl;
        for (const auto& moduleName : completedModules) {
            std::cout << "- " << moduleName << std::endl;
        }
    }

   private:
    std::string name;
    std::vector<std::string> completedModules;
};

int main() {
    StudentProgress student("Alya");
    student.addModule("HTML");
    student.addModule("CSS");
    student.addModule("C++");
    student.printSummary();
    return 0;
}
