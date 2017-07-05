<?php
  require_once("connexion.php");

  $result = pg_query($connection, "SELECT * FROM trajet;");
  $rangees = array();

  while($r = pg_fetch_row($result)) {
      $rangees[] = $r;
  }

  echo json_encode($rangees);
?>
