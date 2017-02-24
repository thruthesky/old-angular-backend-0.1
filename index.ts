import { Http } from '@angular/http';
export class AngularBackend {
    private urlBackend: string = "http://localhost/www/backend/index.php";
    constructor( http: Http ) {
        http.get( this.urlBackend ).subscribe( re => {
            console.log( re );
        });
        
    }
    getUrlBackend() {
        return this.urlBackend;
    }
}