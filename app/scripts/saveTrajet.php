<?php
  require_once("connexion.php");

  $postData = json_decode(file_get_contents("php://input"));
  $trajetId = $postData->trajetId;
  $livraisons = $postData->livraisons;

  $query = "
      DELETE FROM livraison
      WHERE \"trajet_id\" = ". $trajetId ."
  ";

  $result = pg_query($connection, $query);

  $points = array();
  foreach ($livraisons as $li) {
      array_push($points, $li->point);
      $temps_estime = $li->temps_estime;
      $adresse = $li->location;
      $article = $li->article;
      $query = "
          INSERT INTO livraison (\"temps_estime\", \"adresse\", \"article\", \"trajet_id\")
          VALUES ('". $temps_estime ."', '". $adresse ."', '". $article ."', '". $trajetId ."')
      ";

      $result = pg_query($connection, $query);
  }

  $ligne = "LINESTRING(" . implode(",", $points) . ")";

  $query = "
    UPDATE trajet SET (\"dateDerniereEdition\", \"ligne\") = (NOW(), '". $ligne ."')
    WHERE id = ".$trajetId."
  ";

  $result = pg_query($connection, $query);

  if (!$result) {
    echo "false";
  }
?>
