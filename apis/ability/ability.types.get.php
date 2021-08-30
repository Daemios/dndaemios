<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $types = (new Query())
        ->select()
        ->from('ability_types')
        ->execute();

    return new Response('OK', 'Ability types retrieved', $types);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving ability types');

}