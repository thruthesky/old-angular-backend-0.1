import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URL_BACKEND_API, BACKEND_API_CONNECTION_TIMEOUT } from './config';
import { RESPONSE } from './interface';
import * as d from './defines';
import 'rxjs/add/operator/timeout';

@Injectable()
export class Base {
    constructor( private http: Http ) {

    }

    error( error_code ) {
        return {
            code: -999,
            message: error_code
        };
    }
    get requestOptions() : RequestOptions {
        let headers  = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options  = new RequestOptions({ headers: headers });
        return options;
    }


    /**
     * 
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     * 
     */
    get( url: string ) : Observable<Response> {
        console.log(url);
        return this.http.get( url )
            .timeout( BACKEND_API_CONNECTION_TIMEOUT, this.error( d.ERROR_TIMEOUT ) )
            .map( this.extractData );
    }



    /**
     *
     * 
     * Returns 'Observable' which gives an Object of 'sucess' or 'error' from PHP Backend.
     *
     */
    
    post( data: any ) : Observable<Response> {
        
        data = this.buildQuery( data );

        let url = URL_BACKEND_API + '?' + data;
        console.log("post: ", url); // debug in console

        return this.http.post( URL_BACKEND_API, data, this.requestOptions )
            .timeout( BACKEND_API_CONNECTION_TIMEOUT, this.error( d.ERROR_TIMEOUT ) )
            .map( this.extractData );
    }
    

    extractData( res: Response ) {
        try {
            return res.json();
        }
        catch ( e ) {
            //console.error( e );
            return this.error( d.ERROR_JSON_PARSE );
        }
            
    }


    /**
     * return true if the obj is error.
     */
    isError( obj: any ) {
        if ( obj ) {
            if ( obj['code'] === void 0 ) return true;
            if ( obj['code'] ) return true;
        }
        return false;
    }
    errorHandler( error ) {
        if ( error['code'] !== void 0 ) {
            console.info( "ERROR: ", error['message'] );
        }
        else if ( error['status'] !== void 0 ) {
            if ( error['status'] == 500 ) console.info("INTERNAL ERROR: It is a server error.");
            else console.info("ERROR RESPONSE CODE: ", error['status'] );
        }
        else if ( error == d.ERROR_JSON_PARSE ) {
          console.info("ERROR: JSON PARSE ERROR: ", error);
        }
        else {
            console.log("unhandled error:", error );
            alert("CRITICAL - UNHANDLED ERROR"); // this should never happen
        }
    }

    version() {
        return this.get( URL_BACKEND_API + '?mc=system.version');
    }

    errorCall() {
        return this.get( URL_BACKEND_API + '?mc=system.error');
    }
    successCall() {
        return this.version();
    }
    scriptError() {
        return this.get( URL_BACKEND_API + '?mc=system.scriptError');
    }
    internalError() {
        return this.get( URL_BACKEND_API + '?mc=system.internalError');
    }
    

/*
responseData( re, successCallback: ( data: any ) => void, failureCallback: ( error: string ) => void ) : any {
    // console.log('Api::responseData() re: ', re);
    let data;
    try {
      data = JSON.parse( re['_body'] );
    }
    catch( e ) {
      //console.error(e);
      console.info(re['_body']);
      if ( failureCallback ) failureCallback( ERROR_JSON_PARSE );
      return;
    }
    if ( this.isRequestError(data) ) {
      if ( failureCallback ) failureCallback( data.message );
      return;
    }
    
    if ( successCallback ) successCallback( data );
  }

  isRequestError( data ) {
      if ( data === void 0 || data['code'] === void 0 ) return true;
      if ( data['code'] == 0 || data['code'] == '0' )  return false;
      return true;
  }

*/
  /**
   * Response on http.get() / http.post()
   * @note responseData() 가 서버로 부터 올바른 값이 넘어 온 경우, 처리를 한다면,
   *          responseError() 는 서버로 부터 올바른 값이 넘어 오지 않은 경우를 처리한다.
   *
   * @update 2016-12-17 error message change from "http-request-error maybe no-internet or wrong-domain or timeout or server-down" to "No Internet!..."
   * @warning the error message "No Internet!" NOT only means for 'no internet' but also for 'no connection' to server maybe because of slow internet or wrong domain or server script error etc.
   */
  /*
  responseConnectionError( error: Response | any, errorCallback: ( error : string ) => void ) {
    console.error('base::responseConnectionError() : ', Response);
    if ( errorCallback ) errorCallback( NO_INTERNET );
  }

*/




















  /**
   * Returns the body of POST method.
   *
   * @attention This addes 'module', 'submit'. If you don't needed just user http_build_query()
   *
   * @param params must be an object.
   */
  buildQuery( params ) {
    // params[ 'module' ] = 'ajax'; // 'module' must be ajax.
    // params[ 'submit' ] = 1; // all submit must send 'submit'=1
    return this.http_build_query( params );
  }




  http_build_query (formdata, numericPrefix='', argSeparator='') {
    var urlencode = this.urlencode;
    var value
    var key
    var tmp = []
    var _httpBuildQueryHelper = function (key, val, argSeparator) {
      var k
      var tmp = []
      if (val === true) {
        val = '1'
      } else if (val === false) {
        val = '0'
      }
      if (val !== null) {
        if (typeof val === 'object') {
          for (k in val) {
            if (val[k] !== null) {
              tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
            }
          }
          return tmp.join(argSeparator)
        } else if (typeof val !== 'function') {
          return urlencode(key) + '=' + urlencode(val)
        } else {
          throw new Error('There was an error processing for http_build_query().')
        }
      } else {
        return ''
      }
    }

    if (!argSeparator) {
      argSeparator = '&'
    }
    for (key in formdata) {
      value = formdata[key]
      if (numericPrefix && !isNaN(key)) {
        key = String(numericPrefix) + key
      }
      var query = _httpBuildQueryHelper(key, value, argSeparator)
      if (query !== '') {
        tmp.push(query)
      }
    }

    return tmp.join(argSeparator)
  }



  urlencode (str) {
    str = (str + '')
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+')
  }



}