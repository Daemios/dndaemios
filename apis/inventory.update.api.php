<?php
namespace DynamicSuite\Pkg\Dndaemios;

use DynamicSuite\API\Response;
use Exception;

try {

    $item = new Item($_POST);

    $item->character_id = $_POST['character_id']; // TODO change this when login is done to logged user
    $item->type_id = $_POST['type']['type_id'];

    $item->update();

    return new Response('OK', 'Items updated', true);

} catch (Exception $e) {

    error_log($e);

    return new Response('ERROR', 'Error updating item', false);

}