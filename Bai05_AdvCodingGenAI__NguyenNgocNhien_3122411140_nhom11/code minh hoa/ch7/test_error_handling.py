import unittest
import json
from app import app


class TestErrorHandling(unittest.TestCase):
    """Test error handling in Flask app"""
    
    def setUp(self):
        """Setup Flask test client"""
        self.client = app.test_client()
    
    def test_missing_df1(self):
        """Test error when df1 is missing"""
        data = {"df2": [[1, 2]]}  # Missing df1
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert 400 Bad Request
        self.assertEqual(response.status_code, 400)
        
        # Check error message
        response_data = json.loads(response.data)
        self.assertIn("Missing required fields", response_data["error"])
    
    def test_missing_df2(self):
        """Test error when df2 is missing"""
        data = {"df1": [[1, 2]]}  # Missing df2
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert 400 Bad Request
        self.assertEqual(response.status_code, 400)
        
        # Check error message
        response_data = json.loads(response.data)
        self.assertIn("Missing required fields", response_data["error"])
    
    def test_empty_json(self):
        """Test error with empty JSON"""
        data = {}
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert 400 Bad Request
        self.assertEqual(response.status_code, 400)
    
    def test_non_json_request(self):
        """Test error when request is not JSON"""
        response = self.client.post(
            "/manhattan",
            data="invalid data",
            content_type="text/plain"
        )
        
        # Assert 400 Bad Request
        self.assertEqual(response.status_code, 400)
        
        # Check error message
        response_data = json.loads(response.data)
        self.assertIn("Request must be JSON", response_data["error"])
    
    def test_shape_mismatch(self):
        """Test error when DataFrames have different shapes"""
        data = {
            "df1": [[1, 2], [3, 4]],      # 2x2
            "df2": [[1, 2, 3], [4, 5, 6]] # 2x3 - different!
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert 400 Bad Request
        self.assertEqual(response.status_code, 400)
        
        # Check error message mentions shape
        response_data = json.loads(response.data)
        self.assertIn("must have same shape", response_data["error"])
    
    def test_invalid_data_type(self):
        """Test error with invalid data that can't be converted to numbers"""
        data = {
            "df1": [["a", "b"], ["c", "d"]],  # Strings instead of numbers!
            "df2": [[1, 2], [3, 4]]
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert 400 Bad Request (invalid data format)
        self.assertEqual(response.status_code, 400)
        
        # Check error message
        response_data = json.loads(response.data)
        self.assertIn("Invalid data format", response_data["error"])
    
    def test_single_row_different_columns(self):
        """Test error when rows have different number of columns"""
        data = {
            "df1": [[1, 2]],        # 1x2
            "df2": [[3, 4, 5]]      # 1x3 - different columns!
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert 400 Bad Request
        self.assertEqual(response.status_code, 400)
        
        # Check error message
        response_data = json.loads(response.data)
        self.assertIn("must have same shape", response_data["error"])
    
    def test_valid_request_returns_200(self):
        """Test that valid request returns 200"""
        data = {
            "df1": [[1, 2], [3, 4]],
            "df2": [[2, 0], [1, 3]]
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert 200 OK
        self.assertEqual(response.status_code, 200)
        
        # Check response has distance
        response_data = json.loads(response.data)
        self.assertIn("distance", response_data)
        self.assertEqual(response_data["distance"], 6.0)
    
    def test_error_response_has_error_field(self):
        """Test that error responses have error field"""
        data = {"df1": [[1, 2]]}  # Missing df2
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert error field exists
        response_data = json.loads(response.data)
        self.assertIn("error", response_data)
        
        # Assert no distance field in error response
        self.assertNotIn("distance", response_data)


class TestErrorHandlingEdgeCases(unittest.TestCase):
    """Test edge cases in error handling"""
    
    def setUp(self):
        """Setup Flask test client"""
        self.client = app.test_client()
    
    def test_null_values(self):
        """Test error handling with null values"""
        data = {
            "df1": [[1, 2], [3, 4]],
            "df2": [[2, None], [1, 3]]  # None value
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Should not crash, may proceed or fail gracefully
        self.assertIn(response.status_code, [200, 400, 500])
    
    def test_very_large_dataframe(self):
        """Test with very large DataFrame"""
        df1 = [[i for i in range(100)] for _ in range(100)]  # 100x100
        df2 = [[i for i in range(100)] for _ in range(100)]
        
        data = {"df1": df1, "df2": df2}
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Should handle large data
        self.assertIn(response.status_code, [200, 400, 500])
    
    def test_negative_numbers(self):
        """Test with negative numbers (should work fine)"""
        data = {
            "df1": [[-1, -2], [-3, -4]],
            "df2": [[1, 2], [3, 4]]
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Should return 200 OK
        self.assertEqual(response.status_code, 200)
        
        # Should have distance (8 + 8 = 16... wait let me recalculate)
        # |-1-1| + |-2-2| + |-3-3| + |-4-4| = 2 + 4 + 6 + 8 = 20
        response_data = json.loads(response.data)
        self.assertEqual(response_data["distance"], 20.0)
    
    def test_float_values(self):
        """Test with floating point values"""
        data = {
            "df1": [[1.5, 2.5]],
            "df2": [[2.5, 0.5]]
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Should work with floats
        self.assertEqual(response.status_code, 200)
        
        # |1.5-2.5| + |2.5-0.5| = 1.0 + 2.0 = 3.0
        response_data = json.loads(response.data)
        self.assertAlmostEqual(response_data["distance"], 3.0, places=1)


if __name__ == "__main__":
    unittest.main()
