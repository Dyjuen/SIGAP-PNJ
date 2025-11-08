<?php

namespace App\Validators;

use App\Core\Validator;

class PencairanValidator extends Validator
{
    /**
     * Validasi untuk pengajuan pencairan
     */
    public static function validateCreate(array $data): array
    {
        $rules = [
            'kegiatan_id' => 'required|integer',
            'nominal_pencairan' => 'required|numeric|min:1',
            'keterangan' => 'required|string|min:10|max:1000'
        ];

        $messages = [
            'kegiatan_id.required' => 'ID Kegiatan harus diisi',
            'kegiatan_id.integer' => 'ID Kegiatan harus berupa angka',
            'nominal_pencairan.required' => 'Nominal pencairan harus diisi',
            'nominal_pencairan.numeric' => 'Nominal pencairan harus berupa angka',
            'nominal_pencairan.min' => 'Nominal pencairan minimal Rp 1',
            'keterangan.required' => 'Keterangan harus diisi',
            'keterangan.string' => 'Keterangan harus berupa teks',
            'keterangan.min' => 'Keterangan minimal 10 karakter',
            'keterangan.max' => 'Keterangan maksimal 1000 karakter'
        ];

        return self::validate($data, $rules, $messages);
    }

    /**
     * Validasi untuk approval/reject pencairan
     */
    public static function validateApproval(array $data): array
    {
        $rules = [
            'catatan_bendahara' => 'nullable|string|max:1000'
        ];

        $messages = [
            'catatan_bendahara.string' => 'Catatan bendahara harus berupa teks',
            'catatan_bendahara.max' => 'Catatan bendahara maksimal 1000 karakter'
        ];

        return self::validate($data, $rules, $messages);
    }

    /**
     * Validasi untuk rejection (catatan wajib)
     */
    public static function validateReject(array $data): array
    {
        $rules = [
            'catatan_bendahara' => 'required|string|min:10|max:1000'
        ];

        $messages = [
            'catatan_bendahara.required' => 'Catatan penolakan harus diisi',
            'catatan_bendahara.string' => 'Catatan harus berupa teks',
            'catatan_bendahara.min' => 'Catatan minimal 10 karakter',
            'catatan_bendahara.max' => 'Catatan maksimal 1000 karakter'
        ];

        return self::validate($data, $rules, $messages);
    }
}