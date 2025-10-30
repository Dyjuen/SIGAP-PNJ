<?php

namespace App\Validators;

use App\Core\Validator;

class AnggaranValidator extends Validator
{
    /**
     * Validate anggaran item
     */
    public function validateAnggaran(array $data): bool
    {
        // Basic validation rules
        $rules = [
            'uraian' => 'required|min:5|max:255',
            'volume' => 'required|integer',
            'satuan_id' => 'required|integer',
            'harga_satuan' => 'required|numeric'
        ];

        // Apply basic validation
        if (!$this->validate($data, $rules)) {
            return false;
        }

        // Custom validations
        $this->validateVolume($data['volume'] ?? 0);
        $this->validateHargaSatuan($data['harga_satuan'] ?? 0);

        return !$this->hasErrors();
    }

    /**
     * Validate volume
     */
    private function validateVolume($volume)
    {
        if ($volume <= 0) {
            $this->addError('volume', 'Volume harus lebih dari 0.');
        }

        if ($volume > 999999) {
            $this->addError('volume', 'Volume maksimal 999,999.');
        }
    }

    /**
     * Validate harga satuan
     */
    private function validateHargaSatuan($hargaSatuan)
    {
        if ($hargaSatuan < 0) {
            $this->addError('harga_satuan', 'Harga satuan tidak boleh negatif.');
        }

        if ($hargaSatuan > 999999999999) {
            $this->addError('harga_satuan', 'Harga satuan terlalu besar (maks 999,999,999,999).');
        }
    }
}