<?php
  header("content-type: application/json");

  echo json_encode(getJson("../data"));

  function getJson($dataLocation) {
    $buttonState = json_decode(file_get_contents($dataLocation), true)["data"]["button_state"];
    return array(
      "module" => "tts",
      "data" => array(
        "text" => "The button is $buttonState"
      )
    );
  }
 ?>
