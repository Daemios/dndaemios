<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $ranges = (new Query())
        ->select()
        ->from('dnd_archetypes_range')
        ->execute();

    return new Response('OK', 'Ranges retrieved', $ranges);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving archetype ranges');

}