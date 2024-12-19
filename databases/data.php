<?php
include 'index.php';

// Check if data is sent via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $EmpName = $_POST['name'];
    $EmpPosition = $_POST['psotion'];
    $EmpEmail = $_POST['email'];
    $EmpPhone = $_POST['phone'];

    // SQL query to insert data
    $sql = "INSERT INTO employee (EmpName, EmpPosition, EmpEmail, EmpPhone) VALUES ('$EmpName', '$EmpPositon', '$EmpEmail', '$EmpPhone')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "User added successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>
