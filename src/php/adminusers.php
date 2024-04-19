<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type: application/json");

$host = "";
$username = "";
$password = "";
$dbase = "";


$connect = mysqli_connect($host, $username, $password, $dbase);

if(!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = "SELECT DISTINCT idNum, fullName, address, contactNum, email FROM users";
$result = mysqli_query($connect, $query);

if (!$result) {
    echo json_encode(array('error' => 'Error executing query: ' . mysqli_error($connect)));
} else {
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
}

mysqli_close($connect);

?>
