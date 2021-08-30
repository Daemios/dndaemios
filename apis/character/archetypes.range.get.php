<?php

use DynamicSuite\API\Response;
use DynamicSuite\Database\Query;

try {

    $ranges_raw = (new Query())
        ->select()
        ->from('archetype_ranges')
        ->execute();

    $bonuses = (new Query())
        ->select()
        ->from('archetype_bonuses')
        ->join('effects_unit')
        ->on('archetype_bonuses.effects_unit_id', '=', 'effects_unit.effects_unit_id')
        ->where('archetype_bonuses.archetype_range_id', 'IS NOT', null)
        ->execute();

    $ranges = [];

    foreach ($ranges_raw as $range) {
        $ranges[$range['archetype_range_id']] = $range;
    }

    foreach ($bonuses as $bonus) {
        $ranges[$bonus['archetype_range_id']]['bonus'][] = $bonus;
    }

    return new Response('OK', 'Ranges retrieved', $ranges);

} catch (Exception $e) {

    return new Response('ERROR', 'Error retrieving archetype ranges');

}