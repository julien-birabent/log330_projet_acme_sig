<?php
  require_once("connexion.php");

  $postData = json_decode(file_get_contents("php://input"));
  $email = $postData->email;
  $password = $postData->password;

  $result = @pg_query($connection, "INSERT INTO distributeur VALUES ('".$email."', '".$password."');");

  if (!$result) {
    echo "false";
  } else {
    echo "true";
  }
?>
