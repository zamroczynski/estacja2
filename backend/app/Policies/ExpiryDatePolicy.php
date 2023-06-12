<?php

namespace App\Policies;

use App\Models\ExpiryDate;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use App\Enums\UserRole;

class ExpiryDatePolicy
{
    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): bool|null
    {
        if (in_array($user->role, [UserRole::ADMIN, UserRole::NEW_ADMIN])) return true;
        return null;
    }
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ExpiryDate $expiryDate): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ExpiryDate $expiryDate): bool
    {
        if ($user->role == UserRole::OLD_USER || $expiryDate->created_by == $user->id) return true;
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ExpiryDate $expiryDate): bool
    {
        if ($user->role == UserRole::OLD_USER || $expiryDate->created_by == $user->id) return true;
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ExpiryDate $expiryDate): bool
    {
        if ($user->role == UserRole::OLD_USER || $expiryDate->created_by == $user->id) return true;
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ExpiryDate $expiryDate): bool
    {
        return false;
    }
}
