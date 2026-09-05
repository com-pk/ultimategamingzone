<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "gamer_hub";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>