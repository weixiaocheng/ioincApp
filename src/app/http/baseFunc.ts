/**
 *
 *
 * @export
 * @abstract
 * @class BaseFunction
 */
export abstract class BaseFunction {

  // 用户id
  public USERID = 'userId';

  // 用户的sessionKey
  public USERSESSIONKEY = 'sessionKey';

  // 用户昵称
  public USERNICKNAME = 'userNickName';
   constructor() {

   }
    /**
     * 1. 基础方法 拼接字符串
     * 需要传递的字符串 传入字典
     *
     * @param Dict
     * @memberof BaseFunction
     */
    mosaicJsonWithDict(Dict): string {
    let bodyString = ``;
    for (const key in Dict) {
      if (Dict.hasOwnProperty(key)) {
        const element = Dict[key];
        if (typeof element === 'object') {
          bodyString = bodyString + key + '=' + this.mosaicJsonWithDict(element) + '&';
        } else {
          if ( element == null || element === '' || element === '<null>' || element === undefined || element === 0) {

          } else {
            bodyString = bodyString + key + '=' + element + '&';
          }
        }

      }
    }

    bodyString = bodyString.substring(0, bodyString.length - 1);

    return bodyString;

    }



    /**
     * get 请求拼接 url
     */
    mosaicaUrlWith(baseIp: string , perfix: string , apiName: string) {
      const urlString = baseIp + perfix + apiName;
      return urlString;
    }

    // 判断是否 为手机号
    isMobileString(number: string) {
      const reg: RegExp = /^1|[35678]{1}[0-9]{9}$/;
      if (!reg.test(number)) {
        return false;
      }
      return true;
    }

    isEmailString(email: string) {
      const reg: RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(email)) {
        return false;
      }
      return true;
    }

    /**
     *  添加用户信息 存入到本地
     *
     * @param {string[]} userDict
     * @memberof BaseFunction
     */
    storageUserBaseInformationWithUser(userDict: string[]) {

      window.localStorage.setItem('SessionKey' , userDict['SessionKey']);
      window.localStorage.setItem(this.USERID , userDict['User']['UserId']);
      window.localStorage.setItem(this.USERNICKNAME , userDict['User']['NativeName']);

      window.localStorage.setItem('isRefreshCar', 'true');
    }

    /**
     * 清除用户信息
     *
     * @memberof BaseFunction
     */
    storageClearAllUserInformation() {
      window.localStorage.removeItem('SessionKey');
      window.localStorage.removeItem(this.USERID);
      window.localStorage.removeItem(this.USERNICKNAME);
      window.localStorage.setItem('isRefreshCar', 'true');
    }



  /**
   * 判断输入的是否全部为数字
   *
   * @param {any} numberstring
   * @returns {boolean}
   * @memberof BaseFunction
   */
  isAllNumbers(numberstring): boolean {
      // 判断是否全部是数字
      const reg: RegExp = /[0-9]/;
      if (!reg.test(numberstring)) {

        return false;
      }
      return true;
    }


}
