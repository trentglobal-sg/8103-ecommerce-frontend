import { useFlashMessage } from "./FlashMessageStore"

export default function FlashMessage() {
    const { flashMessage } = useFlashMessage();
    return (
        <>
            {
                flashMessage.message ? (<div className={`flash-message alert alert-${flashMessage.type}`}>
                    {flashMessage.message}
                </div>) : null
            }
        </>


    )
}