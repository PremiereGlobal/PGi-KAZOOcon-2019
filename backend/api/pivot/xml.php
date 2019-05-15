<?php
  header("content-type: text/xml");
  echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";

  echo "<Response>\n<Say>The button is " . returnXml("../data") . "</Say>\n</Response>";

  function returnXml($dataLocation) {
    return json_decode(file_get_contents($dataLocation), true)["data"]["button_state"];
  }
 ?>
