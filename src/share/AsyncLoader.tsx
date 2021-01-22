import AsyncBundle from './AsyncBundle';
import React from 'react';
function AsyncLoader (loader: () => Promise<object>) {
    function asyncFn(props: any) {
       return <AsyncBundle load={loader} >
            {(Comp) => <Comp {...props}/>}
        </AsyncBundle>
    }
    
    return asyncFn;
}

export default AsyncLoader;

