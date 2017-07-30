<?php
  require_once("connexion.php");

  $postData = json_decode(file_get_contents("php://input"));
  $trajetId = $postData->trajetId;

  $query = "
    SELECT \"datePrevue\", \"dateDerniereEdition\", \"camionId\", ST_AsText(ligne)
    FROM trajet
    WHERE id = '".$trajetId."'
  ";

  $result = pg_query($connection, $query);
  $rangees = array();

  while($r = pg_fetch_row($result)) {
      $rangees[] = $r;
  }

  $points;
  $debutPos = strpos($rangees[0][3], "(") + 1;
  $finPos   = strpos($rangees[0][3], ")");
  $ligneStr = substr($rangees[0][3], $debutPos, $finPos - $debutPos);
  $points = explode(",", $ligneStr);

  $query = "
      SELECT \"adresse\", \"temps_estime\", \"article\"
      FROM livraison
      WHERE trajet_id = '".$trajetId."'
    ";

  $result = pg_query($connection, $query);
  $rangees[0][4] = array();

  $i = 0;
  while($r = pg_fetch_row($result)) {
        $r[3] = $points[$i];
        $rangees[0][4][] = $r;
        $i++;
  }

  echo json_encode($rangees);
?>
