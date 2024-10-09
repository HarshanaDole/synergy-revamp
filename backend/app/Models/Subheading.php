<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subheading extends Model
{
    use HasFactory;

    protected $fillable = ['blog_id', 'subheading', 'content'];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
