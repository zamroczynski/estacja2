<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShiftRequest;
use App\Http\Requests\UpdateShiftRequest;
use App\Models\Shift;

class ShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'shifts' => Shift::orderBy('updated_at', 'desc')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShiftRequest $request)
    {
        $newShift = new Shift();
        $newShift->name = $request->name;
        $newShift->time_start = $request->timeStart;
        $newShift->time_stop = $request->timeStop;
        $newShift->assignTime();
        $newShift->save();
        return to_route('admin.shift');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShiftRequest $request, Shift $shift)
    {

        $shift->name = $request->name;
        $shift->time_start = $request->timeStart;
        $shift->time_stop = $request->timeStop;
        $shift->assignTime();
        $shift->save();

        return to_route('admin.shift');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shift $shift)
    {
        //TODO add permission check

        $shift->delete();
        return to_route('admin.shift');
    }
}
