<?php

header('Access-Control-Allow-Origin: *');
$conn = new mysqli('localhost', 'root', '', 'electionsmarocaines');

// Check connection
if(mysqli_connect_error()){
    echo mysqli_connect_error();
    exit();
}
else{

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$emailOrPhone = $_POST['emailOrPhone'];
$cin = $_POST['cin'];
$region = $_POST['region'];
$localDistrict = $_POST['localDistrict'];
$birthDate = $_POST['birthDate'];
$gender = $_POST['gender'];


$sql = "INSERT INTO voters(firstName, lastName, Email, CIN, Region, LocalDistrict, birthDate, Gender) VALUES ('$firstName', '$lastName', '$emailOrPhone', '$cin', '$region', '$localDistrict', '$birthDate', '$gender')";
$res = mysqli_query($conn, $sql);
         
if($res){
    echo "Success!";
}
else{
    echo "Error!";
}
$conn->close();

}
?>