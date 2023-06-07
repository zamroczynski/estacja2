<?php

namespace App\Enums;

class UserRole
{
    const ADMIN = 'Kierownik';
    const NEW_ADMIN = 'Zastępca Kierownika';
    const OLD_USER = 'Zaufany Pracownik';
    const USER = 'Pracownik';
    const NEW_USER = 'Nowy pracownik';

    const TYPES = [
        self::ADMIN,
        self::NEW_ADMIN,
        self::OLD_USER,
        self::USER,
        self::NEW_USER
    ];
}
