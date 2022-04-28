import { check } from 'express-validator'
import { checkErrors } from './checkValidation'
import { query, param } from 'express-validator'

export const postFavoritesValidation = [
    check('listName')
        .trim()
        .not().isEmpty().withMessage('list name can not be empty'),
    check('films')
        .not().isEmpty().withMessage('please select at least one film')
        .isArray().withMessage('flims must be an array'),
    check('films.*')
        .isInt({ min: 1, max : 6}).withMessage('pleses select film by passing its numeric id from 1 to 6'),
    checkErrors
]

export const getFavoritesValidation = [
    query('search')
        .optional()
        .trim()
        .isAlphanumeric('pl-PL', { ignore: ' ' }).withMessage('title of list must be alphanumeric'),
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('page must be int greater than 0'),
    query('limit')
        .optional()
        .isInt({ min: 1 }).withMessage('limit must be int greater than 0'),
    checkErrors
]

export const getListValidation = [
    param('id')
        .isInt().withMessage('invalid identificator'),
    checkErrors
]