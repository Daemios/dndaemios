<?php
namespace DynamicSuite\Pkg\Dndaemios;

use DynamicSuite\API\Response;
use Exception;

try {

    error_log('--------------------------------------');

    $item = new Item($_POST);
    error_log('Item ID = ' . $_POST['item_id']);
    $item->delete();

    return new Response('OK', 'Items deleted', true);

} catch (Exception $e) {

    error_log($e);

    return new Response('ERROR', 'Error deleting item', false);

}