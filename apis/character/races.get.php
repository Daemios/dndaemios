<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $races_raw = (new Query())
        ->select()
        ->from('races')
        ->execute();

    $bonuses = (new Query())
        ->select()
        ->from('race_bonuses')
        ->join('skills')
        ->on('race_bonuses.skill_id', '=', 'skills.skill_id')
        ->execute();

    $races = [];

    foreach ($races_raw as $race) {
        $races[$race['race_id']] = $race;
    }

    foreach ($bonuses as $bonus) {
        $races[$bonus['race_id']]['bonus'][] = $bonus;
    }

    return new Response('OK', 'Races retrieved', $races);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving races');

}