<?php
  require_once("connexion.php");

  $postData = json_decode(file_get_contents("php://input"));
  $trajetId = $postData->trajetId;
  $livraisons = $postData->livraisons;
  $points = $postData->points;
  $ligne = "LINESTRING(" . $points . ")";

  $query = "
      DELETE FROM livraison
      WHERE \"trajet_id\" = ". $trajetId ."
  ";

  $result = pg_query($connection, $query);

  foreach ($livraisons as $li) {
      $temps_estime = $li->temps_estime;
      $adresse = $li->location;
      $article = $li->article;
      $query = "
          INSERT INTO livraison (\"temps_estime\", \"adresse\", \"article\", \"trajet_id\")
          VALUES ('". $temps_estime ."', '". $adresse ."', '". $article ."', '". $trajetId ."')
      ";

      $result = pg_query($connection, $query);
  }

  // $ligne = "LINESTRING(" . implode(",", $points) . ")";

  //$livraisons = array();
  //$livraisons["points"] =

  /*
  $pointsStr = array();
  foreach(json_decode($livraisons->points) as $pt) {
      $pointsStr[] = $pt[0] . " " . $pt[1];
  }
  $ligne = "LINESTRING(" . implode(",", $pointsStr) . ")";

  $query = "
      UPDATE trajet SET (\"dateDerniereEdition\", \"ligne\") = (NOW(), '". $ligne ."')
      WHERE id = ".$trajetId."
    ";
  */

  $query = "
    UPDATE trajet SET (\"dateDerniereEdition\", \"ligne\") = (NOW(), '". $ligne ."')
    WHERE id = ".$trajetId."
  ";

  $result = pg_query($connection, $query);

  if (!$result) {
    echo "false";
  }
?>
