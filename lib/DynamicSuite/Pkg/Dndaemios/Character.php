<?php
namespace DynamicSuite\Pkg\dndaemios;

use DynamicSuite\Database\Query;
use DynamicSuite\Storable\Storable;
use DynamicSuite\Storable\IStorable;

class Character extends Storable implements IStorable
{

    public const COLUMN_LIMITS = [
        'player_id' => 11,
    ];

    public ?int $character_id = null;

    public ?int $player_id = null;

    public ?string $name = null;

    public ?string $race = null;

    public ?string $archetype_distance = null;

    public ?string $archetype_role = null;

    public function __construct(array $item = [])
    {
        parent::__construct($item);
    }

    public function create(): Character
    {
        $this->validate(self::COLUMN_LIMITS);
        $this->item_id = (new Query())
            ->insert([
                'player_id' => $this->player_id,
                'name' => $this->name,
                'race' => $this->race,
                'archetype_distance' => $this->archetype_distance,
                'archetype_role' => $this->archetype_role,
            ])
            ->into('dnd_players_characters')
            ->execute();
        return $this;
    }

    public static function readById(int $id)
    {
        $item = (new Query())
            ->select()
            ->from('dnd_players_characters')
            ->where('character_id', '=', $id)
            ->execute(true);
        return $item ? new Item($item) : false;
    }

    public function update(): Character
    {
        $this->validate(self::COLUMN_LIMITS);
        (new Query())
            ->update('dnd_players_characters')
            ->set([
                'character_id' => $this->character_id,
                'player_id' => $this->player_id,
                'name' => $this->name,
                'race' => $this->race,
                'archetype_distance' => $this->archetype_distance,
                'archetype_role' => $this->archetype_role,
            ])
            ->where('character_id', '=', $this->character_id)
            ->execute();
        return $this;
    }

    public function delete(): Character
    {
        (new Query())
            ->delete()
            ->from('dnd_players_characters')
            ->where('character_id', '=', $this->character_id)
            ->execute();
        return $this;
    }

}