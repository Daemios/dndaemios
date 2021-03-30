<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $races = (new Query())
        ->select()
        ->from('dnd_races')
        ->execute();

    return new Response('OK', 'Races retrieved', $races);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving races');

}