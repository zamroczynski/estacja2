<?php

namespace App\Enums;

class TaskOperation
{
    const ADD = ' dodał zadanie.';
    const UPDATE = ' zaktualizował zadanie. Zmianie uległy: ';
    const DELETE = ' usunął zadanie.';
    const DONE = ' oznaczył zadanie jako wykonane.';

    const OPERATIONS = [
        self::ADD,
        self::UPDATE,
        self::DELETE,
        self::DONE
    ];
}
