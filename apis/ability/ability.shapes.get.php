<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $shapes = (new Query())
        ->select()
        ->from('ability_shapes')
        ->execute();

    return new Response('OK', 'Ability shapes retrieved', $shapes);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving ability shapes');

}