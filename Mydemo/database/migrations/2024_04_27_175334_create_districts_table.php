<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->string('district_type');
            $table->string('district_name'); // Define the column without primary key constraint
            $table->integer('seats_to_win');
            $table->timestamps();
        });

        // Alter the table to add 'district_name' as the primary key
        Schema::table('districts', function (Blueprint $table) {
            $table->primary('district_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('districts');
    }
};
