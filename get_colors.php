<?php

$db = new SQLite3('colors.db');

$colors = $db->query('SELECT id, hex FROM colors ORDER BY id DESC');

while ($color = $colors->fetchArray()) {

  $array[] = $color;

}

echo json_encode($array);
