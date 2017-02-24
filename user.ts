import { Injectable } from '@angular/core';
import { Base } from './base';
import {
    USER_LOGIN_REQUEST_DATA,
    USER_LOGIN_REPONSE_DATA,
    USER_LOGOUT_REQUEST_DATA,
    USER_REGISTER_REQUEST_DATA,
    USER_REGISTER_RESPONSE_DATA,
    USER_UPDATE_REQUEST_DATA,
    USER_UPDATE_RESPONSE_DATA,
    USER_DATA_RESPONSE_DATA,
    USER_META_RESPONSE_DATA,
    USER_META_REQUEST_DATA, USER_DATA_REQUEST_DATA
} from './interface';
import { KEY_SESSION_ID } from './defines';
@Injectable()
export class User {
    constructor( public base: Base ) {

    }


    /**
     * 
     * @code

        let req : USER_REGISTER_REQUEST_DATA = {
            id:         this.id,
            password:   this.password,
            name:       this.name,
            nickname:   this.nickname,
            email:      this.email,
            mobile:     this.mobile,
            landline:   this.landline,
            gender:     this.gender,
            birthday:   this.birthday,
            meta:       {
                type: this.type,
                classid: 'my-skype-id'
            }
        }
        console.log(req);
        this.user.register( req, ( res: USER_REGISTER_RESPONSE_DATA ) => {
            console.info('register success: ', res);
        },
        error => alert(error),
        () => console.log('user registration complete') );

     * @endcode
     */
    register( req: USER_REGISTER_REQUEST_DATA ) {
        req.mc = 'user.create';
        return this.base.post( req );

    }



}
