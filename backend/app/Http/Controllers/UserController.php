<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Enums\UserRole;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'users' => User::orderBy('created_at', 'desc')->paginate(10),
        ]);
    }

    /**
     * Display a listing of the roles.
     */
    public function roles()
    {
        return response()->json([
            'roles' => UserRole::TYPES,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'userName' => ['required', 'string', 'max:255'],
            'userEmail' => ['required', 'string', 'max:255'],
            'userPassword' => ['required', 'string', 'max:255'],
        ]);
        $checkEmailIsUnique = User::where('email', '=', $request->userEmail)->first();
        if ($checkEmailIsUnique != null) {
            $errors = ['status' => '500', 'message' => 'Istnieje konto na ten email!'];
            return to_route('eds', ['errors' => $errors]);
        }
        $user = User::create([
            'name' => $request->userName,
            'email' => $request->userEmail,
            'password' => Hash::make($request->userPassword),
        ]);
        return to_route('admin.user');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user->name = $request->userName;
        $user->email = $request->userEmail;
        $user->role = $request->userRole;
        if ($request->userPassword != "") {
            $user->password = Hash::make($request->userPassword);
        }
        $user->save();
        return to_route('admin.user');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route('admin.user');
    }
}
