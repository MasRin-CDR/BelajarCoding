from __future__ import annotations


def calculate(first_number: float, second_number: float, operator: str) -> float:
    if operator == "+":
        return first_number + second_number
    if operator == "-":
        return first_number - second_number
    if operator == "*":
        return first_number * second_number
    if operator == "/":
        if second_number == 0:
            raise ValueError("Tidak bisa membagi dengan nol.")
        return first_number / second_number
    raise ValueError(f"Operator `{operator}` tidak didukung.")


def main() -> None:
    print("CLI Calculator")
    first_number = float(input("Masukkan angka pertama: "))
    operator = input("Masukkan operator (+, -, *, /): ").strip()
    second_number = float(input("Masukkan angka kedua: "))

    result = calculate(first_number, second_number, operator)
    print(f"Hasil: {result}")


if __name__ == "__main__":
    try:
        main()
    except ValueError as error:
        print(f"Error: {error}")
