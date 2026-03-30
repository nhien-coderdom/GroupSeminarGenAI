import unittest
import json
import logging
from unittest.mock import patch, MagicMock
from app import app, logger


class TestFlaskLogging(unittest.TestCase):
    """Test logging functionality in Flask app"""
    
    def setUp(self):
        """Setup Flask test client"""
        self.client = app.test_client()
    
    @patch('app.logger')
    def test_logging_on_valid_request(self, mock_logger):
        """Test that logger.info is called on valid request"""
        data = {
            "df1": [[1, 2], [3, 4]],
            "df2": [[2, 0], [1, 3]]
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert response is successful (200)
        self.assertEqual(response.status_code, 200)
        
        # Assert logger.info was called
        self.assertTrue(mock_logger.info.called)
        
        # Check that specific log messages were made
        call_args = [str(call) for call in mock_logger.info.call_args_list]
        self.assertTrue(any("Received POST request" in str(call) for call in call_args))
    
    @patch('app.logger')
    def test_logging_on_missing_json_field(self, mock_logger):
        """Test that logger.warning is called when df1 or df2 is missing"""
        data = {"df1": [[1, 2]]}  # Missing df2
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert response is bad request (400)
        self.assertEqual(response.status_code, 400)
        
        # Assert logger.warning was called
        self.assertTrue(mock_logger.warning.called)
        
        # Check error message in response
        response_data = json.loads(response.data)
        self.assertIn("Missing required fields", response_data["error"])
    
    @patch('app.logger')
    def test_logging_on_shape_mismatch(self, mock_logger):
        """Test that logger.warning is called on shape mismatch"""
        data = {
            "df1": [[1, 2], [3, 4]],  # 2x2 shape
            "df2": [[1, 2]]  # 1x2 shape - different!
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert response is bad request (400)
        self.assertEqual(response.status_code, 400)
        
        # Assert logger.warning was called
        self.assertTrue(mock_logger.warning.called)
        
        # Check error message
        response_data = json.loads(response.data)
        self.assertIn("must have same shape", response_data["error"])
    
    @patch('app.logger')
    def test_logging_on_non_json_request(self, mock_logger):
        """Test that logger.warning is called on non-JSON request"""
        response = self.client.post(
            "/manhattan",
            data="invalid data",
            content_type="text/plain"  # Not JSON!
        )
        
        # Assert response is bad request (400)
        self.assertEqual(response.status_code, 400)
        
        # Assert logger.warning was called
        self.assertTrue(mock_logger.warning.called)
    
    @patch('app.logger')
    def test_logging_calculation_success(self, mock_logger):
        """Test that calculation success is logged with distance value"""
        data = {
            "df1": [[1, 2]],
            "df2": [[2, 0]]
        }
        
        response = self.client.post(
            "/manhattan",
            data=json.dumps(data),
            content_type="application/json"
        )
        
        # Assert response is successful
        self.assertEqual(response.status_code, 200)
        
        # Check that logger.info was called with distance info
        call_args = [str(call) for call in mock_logger.info.call_args_list]
        self.assertTrue(any("Manhattan distance calculated" in str(call) for call in call_args))
        
        # Check response contains distance
        response_data = json.loads(response.data)
        self.assertIn("distance", response_data)


class TestLoggingLevels(unittest.TestCase):
    """Test that correct logging levels are used"""
    
    def setUp(self):
        """Setup Flask test client"""
        self.client = app.test_client()
    
    def test_info_level_on_success(self):
        """Test that INFO level is used for successful requests"""
        # Capture logs
        with self.assertLogs('app', level='INFO') as cm:
            data = {
                "df1": [[1, 2]],
                "df2": [[2, 0]]
            }
            
            response = self.client.post(
                "/manhattan",
                data=json.dumps(data),
                content_type="application/json"
            )
        
        # Assert response successful
        self.assertEqual(response.status_code, 200)
        
        # Check that INFO logs were created
        info_logs = [log for log in cm.output if 'INFO' in log]
        self.assertGreater(len(info_logs), 0)
    
    def test_warning_level_on_error(self):
        """Test that WARNING level is used for validation errors"""
        # Capture logs
        with self.assertLogs('app', level='WARNING') as cm:
            data = {"df1": [[1, 2]]}  # Missing df2
            
            response = self.client.post(
                "/manhattan",
                data=json.dumps(data),
                content_type="application/json"
            )
        
        # Assert response failed
        self.assertEqual(response.status_code, 400)
        
        # Check that WARNING logs were created
        warning_logs = [log for log in cm.output if 'WARNING' in log]
        self.assertGreater(len(warning_logs), 0)


if __name__ == "__main__":
    unittest.main()
