import unittest
import pandas as pd
from src.manhattan import get_manhattan_distance


class TestManhattanDistance(unittest.TestCase):
    
    def test_simple_distance(self):
        """Test with simple 2x2 dataframes"""
        df1 = pd.DataFrame([[1, 2], [3, 4]])
        df2 = pd.DataFrame([[2, 0], [1, 3]])
        result = get_manhattan_distance(df1, df2)
        self.assertEqual(result, 6.0)  # |1-2|+|2-0|+|3-1|+|4-3| = 1+2+2+1 = 6
    
    def test_zero_distance(self):
        """Test when dataframes are identical"""
        df1 = pd.DataFrame([[1, 2], [3, 4]])
        df2 = pd.DataFrame([[1, 2], [3, 4]])
        result = get_manhattan_distance(df1, df2)
        self.assertEqual(result, 0.0)
    
    def test_single_row(self):
        """Test with single row"""
        df1 = pd.DataFrame([[1, 2, 3]])
        df2 = pd.DataFrame([[4, 5, 6]])
        result = get_manhattan_distance(df1, df2)
        self.assertEqual(result, 9.0)


if __name__ == "__main__":
    unittest.main()
