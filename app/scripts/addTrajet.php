<?php
  require_once("connexion.php");

  $postData = json_decode(file_get_contents("php://input"));
  $camionId = $postData->camionId;
  $datePrevue = $postData->datePrevue;

  $query = "
    INSERT INTO trajet (\"datePrevue\", \"dateDerniereEdition\", \"camionId\")
    VALUES ('".$datePrevue."', NOW(), '".$camionId."')
    RETURNING id;
  ";

  $result = pg_query($connection, $query);

  if (!$result) {
    echo "false";
  } else {
    $rangees = array();

    while($r = pg_fetch_row($result)) {
        $rangees[] = $r;
    }

    echo json_encode($rangees);
  }
?>
