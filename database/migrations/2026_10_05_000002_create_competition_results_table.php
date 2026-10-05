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
        Schema::create('competition_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('competition_id')->constrained('competitions')->onDelete('cascade');
            $table->string('couple')->index();
            $table->string('dancer')->nullable()->index();
            $table->boolean('is_solo')->default(false);
            $table->string('placement')->index();
            $table->string('age_group')->nullable()->index(); // Bērni I, Bērni II, Juniori I, Juniori II, Jaunieši
            $table->string('discipline')->nullable(); // E4, E6, D ST, D LA, etc.
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competition_results');
    }
};
