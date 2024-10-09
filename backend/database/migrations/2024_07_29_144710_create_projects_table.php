<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type');
            $table->string('imageUrl');
            $table->uuid('client_id');
            $table->string('location');
            $table->string('year');
            $table->longText('description')->nullable();
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Drop foreign key constraint and column
            $table->dropForeign(['client_id']);
            $table->dropColumn('client_id');
        });

        Schema::dropIfExists('projects');
    }
};
