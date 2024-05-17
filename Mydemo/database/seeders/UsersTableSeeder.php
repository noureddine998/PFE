<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\DistrictController;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $numberOfUsers = 100; // Change this to the desired number of users

        for ($i = 0; $i < $numberOfUsers; $i++) {
            $user = [
                'firstName' => Str::random(10),
                'lastName' => Str::random(10),
                'email' => Str::random(10) . '@example.com',
                'phone' => '1234567890',
                'password' => Hash::make('password'),
                'birthDate' => now()->subYears(rand(18, 60))->toDateString(),
                'gender' => rand(0, 1) ? 'Male' : 'Female',
                'cin' => Str::random(8),
                'region' => 'Souss-Massa',
                'localDistrict' => 'Agadir-Ida-Ou-Tanane',
            ];

            DB::table('users')->insert($user);

            // Manually call the incrementVoters method
            DistrictController::incrementVoters($user['region']);
            DistrictController::incrementVoters($user['localDistrict']);
        }
    }
}
