<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlanogramRequest;
use App\Http\Requests\UpdatePlanogramRequest;
use App\Models\Planogram;

class PlanogramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'planogram' => Planogram::orderBy('created_at', 'desc')->paginate(10),
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
    public function store(StorePlanogramRequest $request)
    {
        $planogram = new Planogram();
        $planogram->name = $request->name;
        $planogram->comments = $request->comments;
        $planogram->valid_from = $request->valid_from;
        $planogram->save();
        $planogram->addMediaFromRequest('file')->toMediaCollection('planogram');
        return to_route('admin.planogram');
    }

    /**
     * Display the specified resource.
     */
    public function show(Planogram $planogram)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Planogram $planogram)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlanogramRequest $request, Planogram $planogram)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Planogram $planogram)
    {
        //
    }
}
