<?php
// profile.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";      // XAMPP default user
$pass = "";          // XAMPP default password
$db   = "sih";       // your database name

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB Connection failed"]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'] ?? "";
    $sql = "SELECT * FROM registration WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_assoc());
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $sql = "UPDATE registration 
            SET fullName=?, age=?, education=?, gender=?, collegeName=?, contactNumber=?, secondaryContact=? 
            WHERE email=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "sissssss",
        $data['fullName'],
        $data['age'],
        $data['education'],
        $data['gender'],
        $data['collegeName'],
        $data['contactNumber'],
        $data['secondaryContact'],
        $data['email']
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }
    exit();
}

$conn->close();
?>
