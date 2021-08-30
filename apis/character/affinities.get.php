<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $affinities = (new Query())
        ->select()
        ->from('affinities')
        ->execute();

    return new Response('OK', 'Affinities retrieved', $affinities);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving races');

}