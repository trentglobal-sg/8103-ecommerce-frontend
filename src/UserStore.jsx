import { atom, useAtom} from 'jotai';

const jwtAtom = atom(null);

export function useJwt() {
    const [jwt, setJwtAtom] = useAtom(jwtAtom);

    const setJwt = (newJwt) => {
        // localStorage is just a dictionary (aka object) with key/value pairs
        // the key must be string and the value can only be a primitive.
        // localStorage is per domain name
        localStorage.setItem('jwt', newJwt);
        setJwtAtom(newJwt);
    }
    
    const getJwt = () => {
        // if a JWT is not set in the atom, but there's one in localstorage,
        // use the localstorage one
        const storedJwt = localStorage.getItem('jwt');
        if (storedJwt && !jwt) {
            // if there is a JWT in localstorage but not one in the atom
            // we save the stored JWT to the atom as well
            setJwtAtom(storedJwt);
        }
        return jwt || storedJwt;
    }

    const clearJwt  = () => {
        localStorage.removeItem('jwt');
        setJwtAtom(null);
    }

    return {jwt, setJwt, clearJwt, getJwt}
}