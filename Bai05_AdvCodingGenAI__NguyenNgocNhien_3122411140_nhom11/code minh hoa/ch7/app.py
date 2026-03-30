from flask import Flask, request, jsonify
import pandas as pd
import logging
from src.manhattan import get_manhattan_distance

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)


@app.route("/manhattan", methods=["POST"])
def calculate_distance():
    """
    Calculate Manhattan distance between two DataFrames.
    
    Expected JSON request body:
    {
        "df1": [[row1_col1, row1_col2, ...], ...],
        "df2": [[row1_col1, row1_col2, ...], ...]
    }
    
    Returns:
    {
        "distance": <float>
    }
    """
    logger.info("Received POST request to /manhattan endpoint")
    
    try:
        # Check if request is JSON
        if not request.is_json:
            logger.warning("Request is not JSON format")
            return jsonify({"error": "Request must be JSON"}), 400
        
        data = request.get_json()
        logger.debug(f"Request data: {data}")
        
        # Check required fields
        if not data or "df1" not in data or "df2" not in data:
            logger.warning("Missing df1 or df2 in request")
            return jsonify({"error": "Missing required fields: df1 and df2"}), 400
        
        # Create DataFrames
        try:
            df1 = pd.DataFrame(data["df1"])
            df2 = pd.DataFrame(data["df2"])
            logger.info(f"DataFrames created - Shape: {df1.shape}")
        except Exception as e:
            logger.error(f"Failed to create DataFrames: {str(e)}")
            return jsonify({"error": f"Invalid data format: {str(e)}"}), 400
        
        # Check shapes match
        if df1.shape != df2.shape:
            logger.warning(f"Shape mismatch: {df1.shape} vs {df2.shape}")
            return jsonify({
                "error": f"DataFrames must have same shape. Got {df1.shape} and {df2.shape}"
            }), 400
        
        # Calculate distance
        dist = get_manhattan_distance(df1, df2)
        logger.info(f"Manhattan distance calculated: {dist}")
        
        return jsonify({"distance": dist}), 200
    
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    logger.info("Starting Flask application on http://127.0.0.1:5000")
    app.run(debug=True)
