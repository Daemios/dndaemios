<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $roles_raw = (new Query())
        ->select()
        ->from('archetype_roles')
        ->execute();

    $bonuses = (new Query())
        ->select()
        ->from('archetype_bonuses')
        ->join('effects_unit')
        ->on('archetype_bonuses.effects_unit_id', '=', 'effects_unit.effects_unit_id')
        ->where('archetype_bonuses.archetype_role_id', 'IS NOT', null)
        ->execute();

    $roles = [];

    foreach ($roles_raw as $role) {
        $roles[$role['archetype_role_id']] = $role;
    }

    foreach ($bonuses as $bonus) {
        $roles[$bonus['archetype_role_id']]['bonus'][] = $bonus;
    }

    return new Response('OK', 'Roles retrieved', $roles);

} catch (Exception $e) {

    error_log($e->getMessage());
    return new Response('ERROR', 'Error retrieving archetype roles');

}