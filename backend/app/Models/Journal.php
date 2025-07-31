<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasUuids ; 
    protected $fillable = ["content" , "title" , "user_id" , "salt_id"]; 
    protected $hidden = ['salt_id'];



    protected static function booted()
{
    static::deleting(function ($journal) {
        $salt = $journal->salt;
        if ($salt && $salt->journal()->count() === 1) {
            $salt->delete();
        }
    });
}



    public function salt(){
        return $this->belongsTo(Salt::class) ;
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
