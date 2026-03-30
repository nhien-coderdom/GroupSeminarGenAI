# Part 1: Open the chat window and ask to explain the geometric mean.

# Part 2: Implement the geometric mean function for two floating-point numbers.
import math

def geometric_mean(a: float, b: float) -> float:
    """Trung bình hình học của hai số thực không âm a và b."""
    if a < 0 or b < 0:
        raise ValueError("Trung bình hình học không được định nghĩa cho số âm.")
    return math.sqrt(a * b)

# Part 3: Call

if __name__ == "__main__":
    x = 4.0
    y = 9.0
    result = geometric_mean(x, y)
    print(f"Geometric mean of {x} and {y} is {result}")






