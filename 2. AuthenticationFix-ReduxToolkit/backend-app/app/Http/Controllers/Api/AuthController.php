<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    //
    public function getuser()
    {
        $user = User::orderBy('id', 'desc')->get();
        $response = [
            'success' => true,
            'message' => 'List data',
            'data' => UserResource::collection($user)
        ];
        return response()->json($response, Response::HTTP_OK);
    }

    public function show($id)
    {
        $user = User::find($id);
        $response = [
            'success' => true,
            'message' => 'List data',
            'data' => $user
        ];
        return response()->json($response, Response::HTTP_OK);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|min:8|same:password',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => null
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            $token = $user->createToken($user->email . '_Token')->plainTextToken; //jika perlu
            $response = [
                'success' => true,
                'message' => "data added successfully",
                'data' => $user,
                'token'=>$token
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required|min:8',
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => true,
                'message' => $validator->errors(),
                'data' => null
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                $response = [
                    'status' => 401,
                    'message' => 'invalid credensial'
                ];
                return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
            } else {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                $response = [
                    'username' => $user->name,
                    'user_id' => $user->id,
                    'token' => $token,
                    'message' => 'Login Succesfully',
                ];
                return response()->json($response, Response::HTTP_OK);
            }
        }
    }
    public function logout(Request $request)
    {
        $accessToken = $request->bearerToken();
        $token = PersonalAccessToken::findToken($accessToken);
        $token->delete();
        $response = [
            'message' => 'logged out Successfullys'
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
