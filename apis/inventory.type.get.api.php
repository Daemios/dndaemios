<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $types = (new Query())
        ->select()
        ->from('dnd_inventory_types')
        ->execute();

    return new Response('OK', 'Items retrieved', $types);

} catch (Exception $e) {

    return new Response('ERROR', 'Unknown request type');

}

