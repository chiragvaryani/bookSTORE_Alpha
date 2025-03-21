<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$host = "localhost";
$dbname = "sample"; // Replace with your database name
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password

try {
    // Create a new PDO connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Check if form data is received
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $pwd = $_POST['password'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }

    // Hash the password before storing it
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    // Insert data into the database using prepared statements
    $sql = "INSERT INTO sample_tb(name, email, password) VALUES(?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if ($stmt->execute([$name, $email, $hashedPwd])) {
        echo "Data inserted successfully!";
    } else {
        echo "Error inserting data.";
    }
} else {
    echo "Error: Missing form fields";
}
?>
