<?php
  header("content-type: text/xml");
  echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";

  $buttonState = returnXml("../../data");
  $buttonPrint = isset($buttonState) ? $buttonState : "unchecked";

  echo "<Response>\n<Say>The button is " . $buttonPrint . "</Say>\n</Response>";

  function returnXml($dataLocation) {
    return json_decode(file_get_contents($dataLocation), true)["data"]["button_state"];
  }
 ?>
