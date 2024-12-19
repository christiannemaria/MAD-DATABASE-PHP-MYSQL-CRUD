<?php 
header("Access-Control-Allow-Origin: http://localhost:8081"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    $conn = mysqli_connect("localhost", "root", "nemaria2111", "employeedata", "3307");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Get raw POST data and decode JSON
    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    // Check for JSON decoding errors
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["Message" => "Invalid JSON format."]);
        exit();
    }

    // Check if the expected keys exist in the decoded data
    if (!isset($DecodedData['EmpName'], $DecodedData['EmpPosition'], $DecodedData['EmpEmail'], $DecodedData['EmpPhone'])) {
        echo json_encode(["Message" => "Please provide all required fields."]);
        exit();
    }

    $EmpName = $DecodedData['EmpName'];
    $EmpPosition = $DecodedData['EmpPosition'];
    $EmpImage = $DecodedData['EmpImage'] ?? ''; // Allow null for EmpImage
    $EmpEmail = $DecodedData['EmpEmail'];
    $EmpPhone = $DecodedData['EmpPhone'];

    if (empty($EmpName) || empty($EmpPosition) || empty($EmpEmail) || empty($EmpPhone)) {
        echo json_encode(["Message" => "Please provide all required fields."]);
        exit();
    }

    // Prepare the SQL query
    $insertQuery = "INSERT INTO employee (EmpName, EmpPosition, EmpImage, EmpEmail, EmpPhone) 
                    VALUES ('$EmpName', '$EmpPosition', '$EmpImage', '$EmpEmail', '$EmpPhone')";

    if (mysqli_query($conn, $insertQuery)) {
        echo json_encode(["Message" => "Employee saved successfully"]);
    } else {
        echo json_encode(["Message" => "Saving unsuccessful. Please try again"]);
    }

} catch (Exception $e) {
    echo json_encode(["Message" => "Something went wrong: " . $e->getMessage()]);
} finally {
    mysqli_close($conn);
}
?>
