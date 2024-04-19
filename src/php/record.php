<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type: application/json");

$retdata = json_decode(file_get_contents("php://input"));
$idNumret = $retdata->idNum;

date_default_timezone_set('Asia/Manila');
$day = date('Y-m-d');
$time = date('H:i:s');

$checkFlag = 0;     

$host = "";
$username = "";
$password = "";
$dbase = "";


$connect = mysqli_connect($host, $username, $password, $dbase);

if(!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

$checkQuery = "SELECT * FROM users WHERE idNum = '$idNumret' ORDER BY day DESC, timeIn DESC LIMIT 1";
$result = mysqli_query($connect, $checkQuery);

if (!$result) {
    echo json_encode(array('error' => 'Error executing query: ' . mysqli_error($connect)));
} else {
    $row = mysqli_fetch_assoc($result);

    if($row['day'] === $day)
    {
        if ($row['timeIN'] === null) {
            $updateQuery = "UPDATE users SET timeIN = '$time' WHERE idNum = '$idNumret' AND day = '$day'";
            mysqli_query($connect, $updateQuery);
            echo json_encode("1");
        } else if ($row['timeIN'] && $row['timeOUT'] == null) {
            $updateQuery = "UPDATE users SET timeOUT = '$time' WHERE idNum = '$idNumret' AND day = '$day'";
            mysqli_query($connect, $updateQuery);
            echo json_encode("2");
        } else {
            echo mysqli_error($connect);
            echo json_encode("3");
        }
    }
    else
    {
        $checkQuery2 = "SELECT * FROM users WHERE idNum = '$idNumret'";
        $result2 = mysqli_query($connect, $checkQuery2);
        $row2 = mysqli_fetch_assoc($result2);

        $idNum2 = $row2['idNum'];
        $name2 = $row2['fullName'];
        $address = $row2['address'];
        $contact = $row2['contactNum'];
        $email = $row2['email'];

        $send = "INSERT INTO users (idNum, fullName, address, contactNum, email, day, timeIN) 
                VALUES ('$idNum2', '$name2', '$address', '$contact', '$email', '$day', '$time')";

        if(!mysqli_query($connect, $send)) 
        {
            echo mysqli_error($connect);
        } 
        else 
        {
            echo json_encode("1");
        }
    }
      
}

mysqli_close($connect);
?>