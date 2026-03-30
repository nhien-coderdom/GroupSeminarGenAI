# your prompt here
# viết một hàm để tính tổng của tất cả các số nguyên từ 1 đến n, trong đó n được nhập từ bàn phím.
def sum_of_integers(n: int) -> int:
    """Tính tổng của tất cả các số nguyên từ 1 đến n."""
    if n < 1:
        raise ValueError("n phải là một số nguyên dương.")
    return n * (n + 1) // 2

if __name__ == "__main__":
    n = int(input("Nhập một số nguyên dương n: "))
    result = sum_of_integers(n)
    print(f"Tổng của tất cả các số nguyên từ 1 đến {n} là {result}")