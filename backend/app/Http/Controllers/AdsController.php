<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdsRequest;
use App\Http\Requests\UpdateAdsRequest;
use App\Models\Ads;
use App\Enums\Prority;

class AdsController extends Controller
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
    public function store(StoreAdsRequest $request)
    {
        $newAds = new Ads();
        $newAds->title = $request->title;
        $newAds->description = $request->description;
        $newAds->prority = $request->prority;
        $newAds->valid_until = $request->validUntil;
        $newAds->save();
        return to_route('admin.ads');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ads $ads)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ads $ads)
    {
        //
    }
}
