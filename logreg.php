<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$db   = "sih";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['register'])) {
    $fullName = $_POST['fullName'];
    $age = intval($_POST['age']);
    $education = $_POST['education'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $collegeName = $_POST['collegeName'];
    $contactNumber = $_POST['contactNumber'];
    $secondaryContact = $_POST['secondaryContact'] ?? null;
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO registration 
        (fullName, age, education, gender, email, collegeName, contactNumber, secondaryContact, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sisssssss", $fullName, $age, $education, $gender, $email, $collegeName, $contactNumber, $secondaryContact, $password);

    if ($stmt->execute()) {
        $_SESSION['email'] = $email;
        header("Location: login_register.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>