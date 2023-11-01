<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskHistoryRequest;
use App\Http\Requests\UpdateTaskHistoryRequest;
use App\Models\TaskHistory;

class TaskHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreTaskHistoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskHistory $taskHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TaskHistory $taskHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskHistoryRequest $request, TaskHistory $taskHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskHistory $taskHistory)
    {
        //
    }
}
