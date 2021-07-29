<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $ranges = (new Query())
        ->select()
        ->from('dnd_ability_ranges')
        ->execute();

    return new Response('OK', 'Ability ranges retrieved', $ranges);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving ability ranges');

}