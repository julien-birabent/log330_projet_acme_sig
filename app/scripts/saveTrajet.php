<?php
  require_once("connexion.php");

  $postData = json_decode(file_get_contents("php://input"));
  $trajetId = $postData->trajetId;

  $pointsStr = array();
  foreach(json_decode($postData->points) as $pt) {
      $pointsStr[] = $pt[0] . " " . $pt[1];
  }
  $ligne = "LINESTRING(" . implode(",", $pointsStr) . ")";

  $query = "
    UPDATE trajet SET (\"dateDerniereEdition\", \"ligne\") = (NOW(), '". $ligne ."')
    WHERE id = ".$trajetId."
  ";

  $result = pg_query($connection, $query);

  if (!$result) {
    echo "false";
  }
?>
