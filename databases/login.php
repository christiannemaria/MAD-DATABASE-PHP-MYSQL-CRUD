<?php
include ("index.php");

header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Establish a connection
    $conn = mysqli_connect("localhost", "root", "nemaria2111", "employeedata", "3307");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Get raw POST data
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

    // Check if the required fields are set
    if (!isset($decodedData['EmpUsername'], $decodedData['EmpPassword'])) {
        echo json_encode(["success" => false, "message" => "Please provide both username and password."]);
        exit();
    }

    $EmpUsername = $decodedData['EmpUsername'];
    $EmpPassword = $decodedData['EmpPassword'];

    // Validate if the fields are not empty
    if (empty($EmpUsername) || empty($EmpPassword)) {
        echo json_encode(["success" => false, "message" => "Please provide both username and password."]);
        exit();
    }

    // Prepare the SQL query using prepared statements to prevent SQL injection
    $query = "SELECT * FROM logindata WHERE EmpUsername = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $EmpUsername);  // "s" for string parameter
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);

        // Verify the hashed password
        if (password_verify($EmpPassword, $row['EmpPassword'])) {
            echo json_encode(["success" => true, "message" => "Login successful."]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid username or password."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid username or password."]);
    }

    // Close the prepared statement and the connection
    mysqli_stmt_close($stmt);

} catch (mysqli_sql_exception $e) {
    echo json_encode(["success" => false, "message" => "Something went wrong: " . $e->getMessage()]);
}

mysqli_close($conn);
?>
