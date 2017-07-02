<?php
  require_once("connexion.php");

  $postData = json_decode(file_get_contents("php://input"));
  $email = $postData->email;
  $password = $postData->password;

  $query = "
    SELECT id
    FROM distributeur
    WHERE email = '".$email."'
    AND password = '".$password."'
  ";

  $result = pg_query($connection, $query);
  $rangees = array();

  while($r = pg_fetch_row($result)) {
      $rangees[] = $r;
  }

  echo json_encode($rangees);
?>
