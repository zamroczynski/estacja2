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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->dateTime('deadline');
            $table->dateTime('completion')->nullable();
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('prority_id');
            $table->unsignedBigInteger('created_by');
            $table->unsignedBigInteger('updated_by');
            $table->timestamps();
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');
            $table->foreign('type_id')->references('id')->on('task_types');
            $table->foreign('prority_id')->references('id')->on('prorities');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign('created_by');
            $table->dropForeign('updated_by');
            $table->dropForeign('type_id');
            $table->dropForeign('prority_id');
            $table->dropSoftDeletes();
        });
        Schema::dropIfExists('tasks');
    }
};
