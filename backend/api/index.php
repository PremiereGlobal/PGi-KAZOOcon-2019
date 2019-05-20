<?php
require_once("./functions.php");
cors();

// Authenticate token
$config = json_decode(file_get_contents("./config"), true);
$api_location = $config["api_location"];
$authResult = isset($config) ? validateAuthToken($api_location) : 0;

if ($authResult != 1) {
  echo json_encode($authResult);
  exit();
}

// Check if GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  getRequest();
}
// Check if POST request
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  postRequest();
}
// Otherwise the request is unsupported
else {
  http_response_code(405);
}

 ?>
