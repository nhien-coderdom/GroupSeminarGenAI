# Manhattan Distance API

A microservice that calculates the Manhattan distance between two DataFrames provided as JSON input.


## Running the app
In your terminal, navigate to the `ch7` directory and run the following command:

```bash
python app.py
```

This starts a Flask server on http://localhost:5000

### Sample request
You can test the API using `curl` or any HTTP client. Here's an example using `curl`:

```bash
curl -X POST http://127.0.0.1:5000/manhattan \
  -H "Content-Type: application/json" \
  -d '{"df1": [[1, 2], [3, 4]], "df2": [[2, 0], [1, 3]]}'
```

### Sample response

>{
  "distance": 7.0
}

## Running with Docker

To run the application in a Docker container, follow these steps:
build the Docker image:

```bash
docker build -t manhattan-distance-api .
```

Run the Docker container:

```bash
docker run -p 5000:5000 manhattan-distance-api
```

You can then access the API at http://127.0.0.1:5000

# API Documentation

## Endpoint: POST /manhattan

Calculate Manhattan distance between two DataFrames.

### Request Format

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "df1": [[row1_col1, row1_col2, ...], [row2_col1, row2_col2, ...], ...],
  "df2": [[row1_col1, row1_col2, ...], [row2_col1, row2_col2, ...], ...]
}
```

### Response Format

**Success (200):**
```json
{
  "distance": 7.0
}
```

**Error (400) - Missing fields:**
```json
{
  "error": "Missing required fields: df1 and df2"
}
```

**Error (400) - Shape mismatch:**
```json
{
  "error": "DataFrames must have same shape. Got (2, 3) and (2, 2)"
}
```

**Error (500) - Internal error:**
```json
{
  "error": "Internal server error"
}
```

### Example Usage

```bash
curl.exe -X POST http://127.0.0.1:5000/manhattan \
  -H "Content-Type: application/json" \
  -d '{"df1": [[1, 2], [3, 4]], "df2": [[2, 0], [1, 3]]}'
```

Expected response:
```json
{"distance": 7.0}
```

## Features

- ✅ Test cases included in `test_manhattan.py`
- ✅ Comprehensive logging for debugging
- ✅ Error handling for invalid inputs
- ✅ Complete API documentation with examples

## Testing the Application

### Run Unit Tests for Manhattan Distance Function

Test the core calculation function:
```bash
python test_manhattan.py -v
```

Expected output:
```
test_simple_distance ... ok
test_zero_distance ... ok
test_single_row ... ok

Ran 3 tests in 0.006s
OK
```

---

### Run Logging Tests

Test that logging is working correctly:
```bash
python test_logging.py -v
```

Tests:
- ✅ Logging on valid requests
- ✅ Logging warnings on validation errors
- ✅ Logging correct log levels (INFO, WARNING, ERROR)
- ✅ Logging calculation results

---

### Run Error Handling Tests

Test that errors are handled properly:
```bash
python test_error_handling.py -v
```

Tests:
- ✅ Missing required fields (df1, df2)
- ✅ Invalid JSON format
- ✅ Shape mismatch between DataFrames
- ✅ Invalid data types
- ✅ Edge cases (null values, large DataFrames, negative numbers)

---

### Run All Tests

```bash
python -m unittest discover -v
```

This will run all test files (test_manhattan.py, test_logging.py, test_error_handling.py)

---

## Project Structure

```
ch7/
├── app.py                           # Main Flask application
├── requirements.txt                 # Python dependencies
├── README.md                        # This file
├── Dockerfile                       # Docker configuration
│
├── src/
│   └── manhattan.py                # Core Manhattan distance calculation
│
└── Tests/
    ├── test_manhattan.py            # Unit tests for distance calculation
    ├── test_logging.py              # Unit tests for logging functionality
    └── test_error_handling.py       # Unit tests for error handling
```

---

## Key Components

### 1. Core Function: `get_manhattan_distance(df1, df2)`

**Location:** `src/manhattan.py`

Calculates the Manhattan distance between two DataFrames:
```python
def get_manhattan_distance(df1: pd.DataFrame, df2: pd.DataFrame) -> float:
    """
    Calculate Manhattan distance = Σ |df1[i,j] - df2[i,j]|
    """
    element_wise_dist = (df1 - df2).abs()
    dist = element_wise_dist.sum().sum().astype(float)
    return dist
```

**Parameters:**
- `df1`: First DataFrame (numeric values)
- `df2`: Second DataFrame (numeric values, same shape as df1)

**Returns:** Float - Manhattan distance value

**Example:**
```python
df1 = pd.DataFrame([[1, 2], [3, 4]])
df2 = pd.DataFrame([[2, 0], [1, 3]])
distance = get_manhattan_distance(df1, df2)  # Returns 6.0
```

---

### 2. Flask Application: `app.py`

**Features:**
- Logging: Tracks all requests and errors
- Error Handling: Returns meaningful error messages
- Input Validation: Checks JSON format, required fields, shape matching
- Documentation: Complete docstrings and API docs

**Request Flow:**
1. Receives POST request to `/manhattan`
2. Validates JSON format
3. Checks for required fields (df1, df2)
4. Creates DataFrames from JSON
5. Validates shapes match
6. Calculates Manhattan distance
7. Returns response with distance or error

**Error Handling:**
- 400 Bad Request: Invalid input (missing fields, wrong format, shape mismatch)
- 500 Internal Server Error: Unexpected exceptions

---

## Dependencies

```
pandas==2.2.3      # DataFrame operations
flask==3.1.0       # Web framework
```

Install with:
```bash
pip install -r requirements.txt
```

---

## Logging

The application logs all operations to help with debugging:

**Log Levels:**
- `INFO`: Normal operations (requests received, calculations completed)
- `WARNING`: Validation warnings (missing fields, shape mismatch)
- `ERROR`: Errors that occurred (invalid data format, exceptions)
- `DEBUG`: Detailed information (request data, DataFrame shapes)

**Example Log Output:**
```
2026-03-19 21:15:20,123 - INFO - Starting Flask application
2026-03-19 21:15:35,456 - INFO - Received POST request to /manhattan endpoint
2026-03-19 21:15:35,457 - INFO - DataFrames created - Shape: (2, 2)
2026-03-19 21:15:35,458 - INFO - Manhattan distance calculated: 6.0
```

---

## Error Handling Examples

### Missing Required Field
```bash
curl.exe -X POST http://127.0.0.1:5000/manhattan \
  -H "Content-Type: application/json" \
  -d '{"df1": [[1, 2]]}'
```
**Response (400):**
```json
{"error": "Missing required fields: df1 and df2"}
```

---

### Shape Mismatch
```bash
curl.exe -X POST http://127.0.0.1:5000/manhattan \
  -H "Content-Type: application/json" \
  -d '{"df1": [[1, 2], [3, 4]], "df2": [[1, 2]]}'
```
**Response (400):**
```json
{"error": "DataFrames must have same shape. Got (2, 2) and (1, 2)"}
```

---

### Valid Request
```bash
curl.exe -X POST http://127.0.0.1:5000/manhattan \
  -H "Content-Type: application/json" \
  -d '{"df1": [[1, 2], [3, 4]], "df2": [[2, 0], [1, 3]]}'
```
**Response (200):**
```json
{"distance": 6.0}
```

---

# Todos
- [x] Add test cases
- [x] Add logging
- [x] Add error handling
- [x] Add documentation