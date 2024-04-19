<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");

$data = json_decode(file_get_contents("php://input"));

date_default_timezone_set('Asia/Manila');
$day = date('Y-m-d');
$time = date('H:i:s');

if ($data) 
{
    $idNum = $data->idNum;
    $name = $data->name;
    $address = $data->address;
    $contact = $data->contact;
    $email = $data->email;

    $host = "";
    $username = "";
    $password = "";
    $dbase = "";

    
    $connect = mysqli_connect($host, $username, $password, $dbase);

    if(!$connect) 
    {
        die("Connection failed: " . mysqli_connect_error());
    }

    $checkQuery = "SELECT idNum FROM users WHERE idNum = '$idNum'";
    $result = mysqli_query($connect, $checkQuery);

    if(mysqli_num_rows($result) > 0) 
    {
        echo json_encode("1");
    } 
    else 
    {
        $send = "INSERT INTO users (idNum, fullName, address, contactNum, email, day, timeIN) 
                VALUES ('$idNum', '$name', '$address', '$contact', '$email', '$day', '$time')";

        if(!mysqli_query($connect, $send)) 
        {
            echo mysqli_error($connect);
        } 
        else 
        {
            echo json_encode("2");
        }
    }

    mysqli_close($connect);

} 
else
{
    echo "No data received";
}
?>
