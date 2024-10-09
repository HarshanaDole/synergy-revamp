<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'imageUrl',
        'client_id',
        'location',
        'year',
        'description',
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
     * Get the client that owns the project.
     */
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
