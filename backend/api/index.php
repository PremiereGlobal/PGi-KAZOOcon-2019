<?php
require_once("./functions.php");

authenticate();

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
