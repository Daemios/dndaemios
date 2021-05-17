<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $items = (new Query())
        ->select()
        ->from('dnd_inventory')
        ->where('character_id', '=', $_POST['character_id'])
        ->execute();

    $types = (new Query())
        ->select()
        ->from('dnd_inventory_types')
        ->execute();

    foreach ($items as $key => $item) {

        foreach ($types as $type) {

            if ($type['type_id'] === $item['type_id']) {
                $items[$key]['type'] = $type;
                unset($items[$key]['type_id']);
            }

        }

    }

    return new Response('OK', 'Items retrieved', $items);

} catch (Exception $e) {
    return new Response('ERROR', 'Unknown request type', $e);

}

