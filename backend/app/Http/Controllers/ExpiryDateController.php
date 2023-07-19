<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpiryDateRequest;
use App\Http\Requests\UpdateExpiryDateRequest;
use App\Http\Requests\ReportExpiryDateRequest;
use App\Models\ExpiryDate;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Enums\UserRole;

class ExpiryDateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->query('newDate');
        $expiryDates = ExpiryDate::with('product')->where('date', '=', $date)->get();
        return response()->json([
            'expiryDates' => $expiryDates,
            'errors' => $request->errors,
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
    public function store(StoreExpiryDateRequest $request)
    {
        $requestDate = $request->date;
        $requestProductId = $request->input('product.id');
        $requestAmount = $request->amount;
        $checkExpiryDateExist = ExpiryDate::where('date', '=', $requestDate)->where('product_id', '=', $requestProductId)->first();
        if ($checkExpiryDateExist != null) {
            $errors = ['status' => '500', 'message' => 'Taki termin już istnieje!'];
            return to_route('eds', ['errors' => $errors]);
        }
        $expiryDate = new ExpiryDate();
        $expiryDate->date = $requestDate;
        $expiryDate->product_id = $requestProductId;
        $expiryDate->amount = $requestAmount;
        $expiryDate->save();
        return to_route('eds');
    }

    /**
     * Display the specified resource.
     */
    public function showMy(Request $request)
    {
        if (in_array($request->user()->role, [UserRole::ADMIN, UserRole::NEW_ADMIN, UserRole::OLD_USER])) {
            $expiryDates = ExpiryDate::with('product')->orderBy('updated_at', 'desc')->paginate(10);
        } else {
            $expiryDates = ExpiryDate::with('product')->where('created_by', '=', $request->user()->id)->orderBy('updated_at', 'desc')->paginate(10);
        }
        return response()->json([
            'expiryDates' => $expiryDates,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExpiryDate $expiryDate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpiryDateRequest $request, ExpiryDate $expiryDate)
    {
        if ($request->user()->cannot('update', $expiryDate)) {
            $errors = ['status' => '500', 'message' => 'Brak uprawnień!'];
            return to_route('eds', ['errors' => $errors]);
        }
        $requestProductId = $request->input('product_id');
        $checkExpiryDateExist = ExpiryDate::where('product_id', '=', $requestProductId)
            ->where('date', '=', $request->date)
            ->where('amount', '=', $request->amountValue)
            ->first();
        if ($checkExpiryDateExist != null) {
            $errors = ['status' => '500', 'message' => 'Taki termin już istnieje'];
            return to_route('eds', ['errors' => $errors]);
        }
        $expiryDate->date = $request->date;
        $expiryDate->product_id = $requestProductId;
        $expiryDate->amount = $request->amountValue;
        $expiryDate->save();
        return to_route('eds');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, ExpiryDate $expiryDate)
    {
        if ($request->user()->cannot('delete', $expiryDate)) {
            $errors = ['status' => '500', 'message' => 'Brak uprawnień!'];
            return to_route('eds', ['errors' => $errors]);
        }
        $expiryDate->delete();
        return to_route('eds');
    }

    /**
     * Generate data for report.
     */
    public function report(ReportExpiryDateRequest $request)
    {
        $expiryDates = ExpiryDate::with('product')->whereBetween('date', [$request->dateStart, $request->dateEnd])->orderBy('date')->get();
        return response()->json([
            'expiryDates' => $expiryDates,
        ]);
    }
}
