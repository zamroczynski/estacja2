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
        Schema::create('expiry_dates', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('amount')->nullable();
            $table->unsignedBigInteger('create_by');
            $table->unsignedBigInteger('update_by');
            $table->timestamps();
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('create_by')->references('id')->on('users');
            $table->foreign('update_by')->references('id')->on('users');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('expiry_dates', function (Blueprint $table) {
            $table->dropForeign('product_id');
            $table->dropForeign('create_by');
            $table->dropForeign('update_by');
        });
        Schema::dropIfExists('expiry_dates');
    }
};
