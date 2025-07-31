<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Salt extends Model
{
    use HasUuids ;
    protected $fillable = ["salt" , "iv"];
    protected $hidden = ["id"];

    public function journal(){
        return $this->hasMany(Journal::class);
    }
}
