<?php
namespace DynamicSuite\Pkg\Dndaemios;

use DynamicSuite\API\Response;
use Exception;

try {

    $item = new Item($_POST);

    $item->character_id = 1; // TODO change this when login is done to logged user
    $item->type_id = 2;

    $item->create();

    return new Response('OK', 'Item added', true);

} catch (Exception $e) {

    error_log($e);

    return new Response('ERROR', 'Error adding item', false);

}