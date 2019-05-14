<?php
require_once("./config/functions.php");

$config = json_decode(file_get_contents("./config/config"), true);
$api_location = $config["api_location"];
$authResult = validateAuthToken($api_location);

if ($authResult != 1) {
  echo json_encode($authResult);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Read contents from the file and return them
  $data = json_decode(file_get_contents("./data"), true);
  echo json_encode($data);
}
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Read button state from file
  $data = json_decode(file_get_contents("./data"), true);

  // If the button state isn't set, or if it is set to unchecked, check it
  // Otherwise, uncheck it
  if (!isset($data["data"]["button_state"]) || $data["data"]["button_state"] === "unchecked") {
    $data["data"]["button_state"] = "checked";
  }
  else {
    $data["data"]["button_state"] = "unchecked";
  }

  // Write the result to the file, and return the sender's payload
  file_put_contents("./data", json_encode($data));
  echo json_encode($_POST);
}
else {
  // Not a GET or POST, isn't supported
  http_response_code(405);
}
 ?>
