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
        Schema::create('prorities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedSmallInteger('value');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->timestamps();
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prorities', function (Blueprint $table) {
            $table->dropForeign('created_by');
            $table->dropForeign('updated_by');
            $table->dropSoftDeletes();
        });
        Schema::dropIfExists('prorities');
    }
};
