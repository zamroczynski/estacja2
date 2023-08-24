<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProrityRequest;
use App\Http\Requests\UpdateProrityRequest;
use App\Models\Prority;

class ProrityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'prorites' => Prority::orderBy('updated_at', 'desc')->get()
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
    public function store(StoreProrityRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Prority $prority)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prority $prority)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProrityRequest $request, Prority $prority)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prority $prority)
    {
        //
    }
}
