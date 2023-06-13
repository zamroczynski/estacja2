<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Product;
use App\Models\ExpiryDate;
use App\Policies\ProductPolicy;
use App\Policies\ExpiryDatePolicy;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Enums\UserRole;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Product::class => ProductPolicy::class,
        ExpiryDate::class => ExpiryDatePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->defineUserRoleGate('isAdmin', UserRole::ADMIN);
        // $this->defineUserRoleGate('isAdmin', UserRole::NEW_ADMIN);
        $this->defineUserRoleGate('isUser', UserRole::USER);
        // $this->defineUserRoleGate('isUser', UserRole::OLD_USER);
    }

    /**
     * Auxiliary class for defining a role in the system
     */
    private function defineUserRoleGate(string $name, string $role): void
    {
        Gate::define($name, function (User $user) use ($role) {
            return $user->role == $role;
        });
    }
}
