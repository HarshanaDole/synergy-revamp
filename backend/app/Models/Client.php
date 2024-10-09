<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'imageUrl',
    ];

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

    /**
     * Get the projects for the client.
     */
    public function projects()
    {
        return $this->hasMany(Project::class, 'client_id');
    }
}
