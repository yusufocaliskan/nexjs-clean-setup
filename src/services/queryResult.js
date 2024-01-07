export const queryResult = {
  Success: 1,
  Warning: 2,
  Error: 4,
  /**
   *
   * @param {*} code
   */
  isSuccess(input) {
    return (input && input.StatusCode === 1) || input.data?.StatusCode === 1;
  },
  /**
   *
   * @param {*} code
   */
  isWarning(input) {
    console.log(input);
    return (
      (input && input.StatusCode === 2) || input.error?.data?.StatusCode === 2
    );
  },
  /**
   *
   * @param {*} code
   */
  isError(input) {
    return (
      (input && input.StatusCode === 4) || input.error?.data?.StatusCode === 4
    );
  },
  /**
   *
   * @param {*} code
   */
  IS_EMAIL_NOT_CONFIRMED(input) {
    return input && input.StatusCode === 5001;
  },
  /**
   *
   * @param {*} code
   */
  IS_PHONE_NOT_CONFIRMED(input) {
    return input && input.StatusCode === 5002;
  },
  /**
   *
   * @param {*} code
   */
  IS_GOOGLE_AUTHENTICATOR_NOT_ENABLED(input) {
    return input && input.StatusCode === 5003;
  },
  /**
   *
   * @param {*} code
   */
  IS_ACCOUNT_NOT_VERIFIED(input) {
    return input && input.StatusCode === 5004;
  },
  /**
   *
   * @param {*} code
   */
  IS_GOOGLE_AUTHENTICATOR_ENABLED(input) {
    return input && input.StatusCode === 2001;
  },

  /**
   *
   * @param {*} code
   */
  IS_RELOGIN(input) {
    return input && input.StatusCode === 2002;
  },

  /**
   *
   * @param {*} code
   */
  IS_REDIRECT_TO_PAPARA(input) {
    return input && input.StatusCode === 2003;
  },

  /**
   *
   * @param {*} code
   */
  IS_VERIFICATION_MAIL_SEND(input) {
    return input && input.StatusCode === 2004;
  },
  IS_UNDER_MAINTENANCE(input) {
    return input && input.StatusCode === 5005;
  },
  /**
   *
   * @param {*} code
   */
  IS_USER_DEACTIVATED(input) {
    return input && input.StatusCode === 5006;
  },

  /**
   *
   * @param {*} code
   */
  USER_DEACTIVATED_FOR_LOGIN_REQUEST(input) {
    return input && input.StatusCode === 5009;
  },

  /**
   *
   * @param {*} code
   */
  IS_TRADE_NOT_ACTIVE(input) {
    return input && input.StatusCode === 5007;
  },
  IIS_REDIRECTS_REDIRECT(input) {
    console.log(input.data);
    return (
      (input && input.StatusCode === 5008) || input.data?.StatusCode === 5008
    );
  },
  /**
   *
   * @param {*} code
   */
  IS_UNAUTHORIZED(input) {
    return input && input.status === 401;
  },
};

export default queryResult;
