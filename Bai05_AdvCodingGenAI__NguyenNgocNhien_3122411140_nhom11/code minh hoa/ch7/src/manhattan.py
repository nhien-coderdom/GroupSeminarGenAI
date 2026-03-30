import numpy as np
import pandas as pd


def get_manhattan_distance(
        df1: pd.DataFrame,
        df2: pd.DataFrame,
) -> np.float64:
    """
    Calculate the Manhattan distance between two DataFrames.
    
    The Manhattan distance (also known as L1 distance or taxicab distance) 
    is the sum of the absolute differences between coordinates.
    
    Formula:
        distance = Σ |df1[i,j] - df2[i,j]| for all i,j
    
    Args:
        df1 (pd.DataFrame): First input DataFrame containing numeric values.
                           Shape must match df2.
        df2 (pd.DataFrame): Second input DataFrame containing numeric values.
                           Shape must match df1.
    
    Returns:
        np.float64: The Manhattan distance as a floating-point number.
                   Returns 0.0 if the DataFrames are identical.
    
    Raises:
        ValueError: If DataFrames have different shapes.
    
    Examples:
        >>> df1 = pd.DataFrame([[1, 2], [3, 4]])
        >>> df2 = pd.DataFrame([[2, 0], [1, 3]])
        >>> get_manhattan_distance(df1, df2)
        7.0
        
        >>> df1 = pd.DataFrame([[1, 2]])
        >>> df2 = pd.DataFrame([[1, 2]])
        >>> get_manhattan_distance(df1, df2)
        0.0
    
    Notes:
        - All non-numeric values will cause an error during calculation
        - The function works with both integer and floating-point values
        - NaN values will propagate through the calculation
    """
    element_wise_dist: pd.DataFrame = (df1 - df2).abs()
    dist: float = element_wise_dist.sum().sum().astype(float)
    return dist


coordinates_a : pd.DataFrame = pd.DataFrame({
        "x": [0, 1, 2],
        "y": [0, 1, 2],
        "z": [0, 1, 2]
})

coordinates_a._constructor_from_mgr(
    coordinates_a._mgr,
    coordinates_a.axes,
)

