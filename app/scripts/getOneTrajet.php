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

  if ($rangees[0][3] != "") {
    $debutPos = strpos($rangees[0][3], "(") + 1;
    $finPos   = strpos($rangees[0][3], ")");
    $ligneStr = substr($rangees[0][3], $debutPos, $finPos - $debutPos);

    $points = explode(",", $ligneStr);
    for ($i = 0; $i < count($points); $i++) {
      $points[$i] = explode(" ", $points[$i]);
    }

    $rangees[0][3] = $points;
  } else {
    $rangees[0][3] = array();
  }

  $query = "
      SELECT \"adresse\", \"temps_estime\", \"article\"
      FROM livraison
      WHERE trajet_id = '".$trajetId."'
    ";

  $result = pg_query($connection, $query);
  $rangees[0][4] = array();

  while($r = pg_fetch_row($result)) {
        $rangees[0][4][] = $r;
  }

  echo json_encode($rangees);
?>
