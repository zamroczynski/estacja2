<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdsRequest;
use App\Http\Requests\UpdateAdsRequest;
use App\Models\Ads;
use App\Enums\Prority;
use Carbon\Carbon;

class AdsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'ads' => Ads::orderBy('created_at', 'desc')->with('prority')->paginate(10),
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
    public function store(StoreAdsRequest $request)
    {
        $newAds = new Ads();
        $newAds->title = $request->title;
        $newAds->description = $request->description;
        $newAds->prority_id = $request->prority;
        $newAds->valid_until = $request->validUntil;
        $newAds->save();
        return to_route('admin.ads');
    }

    /**
     * Display the specified resource.
     */
    public function showActive()
    {
        $today = Carbon::now();
        $ads = Ads::with('prority')->whereDate('valid_until', '>=', $today)->with('prority')->orderBy('prority_id', 'asc')->get();
        return response()->json([
            'ads' => $ads,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function showInactive()
    {
        $today = Carbon::now();
        $ads = Ads::with('prority')->whereDate('valid_until', '<', $today)->with('prority')->orderBy('created_at', 'asc')->get();
        return response()->json([
            'ads' => $ads,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ads $ads)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdsRequest $request, Ads $ads)
    {
        $ads->title = $request->title;
        $ads->description = $request->description;
        $ads->prority_id = $request->prority;
        $ads->valid_until = $request->validUntil;
        $ads->save();
        return to_route('admin.ads');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ads $ads)
    {
        $ads->delete();
        return to_route('admin.ads');
    }
}
