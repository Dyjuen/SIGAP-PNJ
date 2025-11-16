<?php

namespace App\Validators;

class PanduanValidator
{
    public static function validate($data)
    {
        $errors = [];

        if (empty($data['judul_panduan'])) {
            $errors['judul_panduan'] = 'Judul panduan tidak boleh kosong.';
        } elseif (!is_string($data['judul_panduan'])) {
            $errors['judul_panduan'] = 'Judul panduan harus berupa teks.';
        }

        if (empty($data['isi_panduan'])) {
            $errors['isi_panduan'] = 'Isi panduan tidak boleh kosong.';
        } elseif (!is_string($data['isi_panduan'])) {
            $errors['isi_panduan'] = 'Isi panduan harus berupa teks.';
        }

        if (isset($data['target_role_id']) && !is_numeric($data['target_role_id']) && !is_null($data['target_role_id'])) {
            $errors['target_role_id'] = 'Target Role ID harus berupa angka atau null.';
        }

        return $errors;
    }
}