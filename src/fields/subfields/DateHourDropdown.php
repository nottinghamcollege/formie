<?php
namespace verbb\formie\fields\subfields;

use verbb\formie\base\SubFieldInnerFieldInterface;
use verbb\formie\fields\Dropdown;
use verbb\formie\helpers\SchemaHelper;

use Craft;

class DateHourDropdown extends Dropdown implements SubFieldInnerFieldInterface
{
    // Static Methods
    // =========================================================================

    public static function displayName(): string
    {
        return Craft::t('formie', 'Date - Hour');
    }

    public static function getFrontEndInputTemplatePath(): string
    {
        return 'fields/dropdown';
    }

    public static function getEmailTemplatePath(): string
    {
        return 'fields/dropdown';
    }
}