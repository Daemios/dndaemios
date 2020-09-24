<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $items = (new Query())
        ->select()
        ->from('dnd_characters')
        ->where('player_id', '=', $_POST['player_id'])
        ->execute();

    return new Response('OK', 'Items retrieved', $items);

} catch (Exception $e) {

    return new Response('ERROR', 'Unknown request type');

}