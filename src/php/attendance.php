<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type: application/json");

$retdata = json_decode(file_get_contents("php://input"));
$idNumret = $retdata->idNum;

$host = "";
$username = "";
$password = "";
$dbase = "";


$connect = mysqli_connect($host, $username, $password, $dbase);

if(!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

$checkQuery = "SELECT * FROM users WHERE idNum = '$idNumret' ORDER BY day DESC LIMIT 1";
$result = mysqli_query($connect, $checkQuery);

if (!$result) {
    echo json_encode(array('error' => 'Error executing query: ' . mysqli_error($connect)));
} else {
    $datasend = mysqli_fetch_row($result);
    echo json_encode($datasend);
}

mysqli_close($connect);
?>