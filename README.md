# angular-backend
Angular API for Backend.




# Example Code

## Get version


````

        base.get( URL_BACKEND_API + '?mc=system.version')
            .subscribe( re => {
                console.log(re);
            }, error => {
                console.log('error: ', error);
            });

````
