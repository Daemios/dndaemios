<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $roles = (new Query())
        ->select()
        ->from('dnd_archetypes_role')
        ->execute();

    return new Response('OK', 'Roles retrieved', $roles);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving archetype roles');

}