<?php
  require_once("connexion.php");

  $result = pg_query($connection, "SELECT email, password FROM distributeur;");
  $rangees = array();

  while($r = pg_fetch_row($result)) {
      $rangees[] = $r;
  }

  echo json_encode($rangees);
?>
