/**
 * @desc Library to manage application errors.
 * @author Tremaine Buchanan
 * @since 2017-06-18
 */
'use strict'
const ERR = {
  BAD_REQUEST : {
        message: 'Your username/password is incorrect.',
        developer_msg: 'Username/password supplied by the user is invalid.',
        success: false
  },
  UNAUTHORIZED: {
    message: 'Your session has expired. Please enter your username and password',
    developer_msg: 'Unable to validate/verify user credentials',
    success: false
  },
  EMPTY_VALUES : {
    message: 'Required fields are missing.',
    developer_msg: 'Empty data was supplied in one or more fields.',
    success: false
  },
  LDAP: {
    BIND_FAILURE: {
      message: 'Unable to successfully authenticate user.',
      developer_msg: 'Credentials provided are not valid to complete LDAP bind operation',
      success: false
    },
    USER_NOT_FOUND: {
      message: 'Unable to locate username provided.',
      developer_msg: 'Unable to locate username provided in LDAP server',
      success: false
    }
  },
  TOKEN: {
    BAD_REQUEST: {
      message: 'Token not present in request.',
      developer_msg: 'JSON Web Token not present in request headers.',
      success: false
    }
  },
  PERMISSION: {
    UNAUTHORIZED: {
      message: 'Unathorized endpoint access',
      developer_msg: 'User not authorized to access endpoint',
      success: false
    }
  }
}

exports.error = ERR
