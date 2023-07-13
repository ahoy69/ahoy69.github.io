<?php 

$localhost = "localhost";
$user = "root";
$password = "";
$dbName = "iot";

$conn = mysqli_connect($localhost, $user, $password, $dbName);
if(!$conn){
	"Connection:Failed" .mysqli_connect_error();
}

?>
