import { atom, useAtom } from 'jotai'

const flashMessageAtom = atom({
    message: "",
    type: "info"
});

let timerId = null;

// a hook is like a component without JSX
// most react stuff will work in a hook -> useState, useAtom, useEffect etc. etc. etc.
export const useFlashMessage = () => {
    const [flashMessage, setFlashMessage] = useAtom(flashMessageAtom);

    const showMessage = (message, type = "info") => {
        setFlashMessage({
            "message": message,
            "type": type
        })

        // if there's already a timer going, stop the previous one
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            clearMessage();
        }, 3000)
    }

    const clearMessage = () => {
        if (timerId) {
            // stop existing timer
            clearTimeout(timerId);
        }

        setFlashMessage({
            "message": "",
            "type": "info"
        })
    }

    return {
        showMessage,
        flashMessage
    }

}