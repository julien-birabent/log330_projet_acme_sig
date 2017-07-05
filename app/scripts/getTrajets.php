<?php
  require_once("connexion.php");

  $query = "
    SELECT * FROM trajet
    ORDER BY \"dateDerniereEdition\" DESC, \"datePrevue\" DESC;
  ";

  $result = pg_query($connection, $query);
  $rangees = array();

  while($r = pg_fetch_row($result)) {
      $rangees[] = $r;
  }

  echo json_encode($rangees);
?>
