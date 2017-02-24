import { Injectable } from '@angular/core';

import { Base } from './base';
import { User } from './user';
import { URL_BACKEND_API } from './config';



@Injectable()
export class Test {
    constructor( private base: Base, private user: User ) {
        console.info('Test::constructor()');
        setTimeout( () => this.run(), 500 );
    }


    run() {
        console.info('Test::run()');
        this.result();
        this.system();
    }

    result() {
        this.base.successCall().subscribe( re => {
            console.log(re);
            if ( this.base.isError( re ) ) return this.base.errorHandler( re );
            console.log("successCall() : success");
        }, this.base.errorHandler);


        this.base.errorCall().subscribe( re => {
            if ( this.base.isError( re ) ) return this.base.errorHandler( re );
            console.log("errorCall() : success");
        }, this.base.errorHandler);

        
        this.base.scriptError().subscribe( re => {
            if ( this.base.isError( re ) ) return this.base.errorHandler( re );
            console.log("scriptError() : success");
        }, this.base.errorHandler);

        
        this.base.internalError().subscribe( re => {
            if ( this.base.isError( re ) ) return this.base.errorHandler( re );
            console.log("internalError() : success");
        }, this.base.errorHandler );
        
    }

    system() {
/*
        this.base.version().subscribe( re => {
            console.log(re);
        }, this.base.errorHandler);
*/
    }
}