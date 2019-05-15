<?php
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
