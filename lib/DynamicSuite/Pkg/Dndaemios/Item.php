<?php
namespace DynamicSuite\Pkg\Dndaemios;

use DynamicSuite\Database\Query;
use DynamicSuite\Storable\Storable;
use DynamicSuite\Storable\IStorable;

class Item extends Storable implements IStorable
{

    public const COLUMN_LIMITS = [
        'description' => 2048
    ];

    public ?int $item_id = null;

    public ?int $character_id = null;

    public ?int $type_id = null;

    public ?string $name = null;

    public ?string $description = null;

    public ?int $quantity = 0;

    public function __construct(array $item = [])
    {
        parent::__construct($item);
    }

    public function create(): Item
    {
        $this->validate(self::COLUMN_LIMITS);
        $this->item_id = (new Query())
            ->insert([
                'character_id' => $this->character_id,
                'type_id' => $this->type_id,
                'name' => $this->name,
                'description' => $this->description,
                'quantity' => $this->quantity
            ])
            ->into('inventory')
            ->execute();
        return $this;
    }

    public static function readById(int $id = null)
    {
        $item = (new Query())
            ->select()
            ->from('inventory')
            ->where('item_id', '=', $id)
            ->execute(true);
        return $item ? new Item($item) : false;
    }

    public function update(): Item
    {
        $this->validate(self::COLUMN_LIMITS);

        (new Query())
            ->update('inventory')
            ->set([
                'name' => $this->name,
                'type_id' => $this->type_id,
                'description' => $this->description,
                'quantity' => $this->quantity
            ])
            ->where('item_id', '=', $this->item_id)
            ->where('character_id', '=', $this->character_id)
            ->execute();
        return $this;
    }

    public function delete(): Item
    {
        (new Query())
            ->delete()
            ->from('inventory')
            ->where('item_id', '=', $this->item_id)
            ->execute();
        return $this;
    }

}