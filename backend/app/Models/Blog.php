<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = ['headline', 'author', 'imageUrl'];

    protected $keyType = 'string'; // UUIDs are strings
    public $incrementing = false; // UUIDs are not auto-incrementing

    protected static function boot()
    {
        parent::boot();

        // Automatically generate UUID when creating a new model
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function subheadings()
    {
        return $this->hasMany(Subheading::class);
    }
}
