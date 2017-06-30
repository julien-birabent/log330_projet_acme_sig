<?php
  $server = "localhost";
  $port = "5432";
  $user = "admin";
  $pwd = "admin";
  $database = "postgres";
  $connection = pg_connect("host=".$server." 
							port=".$port." 
							user=".$user." 
							password=".$pwd." 
							dbname=".$database."");
?>
