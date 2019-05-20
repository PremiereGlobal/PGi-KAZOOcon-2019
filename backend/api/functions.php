<?php
/*
This function contains instructions for handling a GET request
*/
function getRequest() {
  // Read contents from the file and return them
  $data = json_decode(file_get_contents("./data"), true);
  echo json_encode($data);
}

function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
  }

/*
This function contains instructions on handling a POST request
*/
function postRequest() {
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
  echo json_encode($data);
}

/*
This function authenticates the token in the X-Auth-Token header against the
server specified in the config file
*/
function authenticate() {

}

/*
This function takes the auth token and configures curl in order to receive
whether or not the auth token was valid
*/
function validateAuthToken($authApi) {
  $header = getallheaders();
  $header['X-Auth-Token'] = !isset($header["X-Auth-Token"]) ? "" : $header['X-Auth-Token'];
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $authApi . "/v2/token_auth/");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    "X-Auth-Token: ".$header['X-Auth-Token']
  ));
  $output = json_decode(curl_exec($curl), true);
  curl_close($curl);
  if ($output["status"] === "error") {
    return $output;
  }
  return 1;
}
 ?>
