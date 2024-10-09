<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogsTable extends Migration
{
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('headline');
            $table->string('author');
            $table->string('imageUrl');
            $table->timestamps();
        });

        Schema::create('subheadings', function (Blueprint $table) {
            $table->id();
            $table->uuid('blog_id');
            $table->string('subheading');
            $table->text('content');
            $table->timestamps();

            $table->foreign('blog_id')->references('id')->on('blogs')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('subheadings');
        Schema::dropIfExists('blogs');
    }
}
