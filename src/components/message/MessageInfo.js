const MessageInfo = ({
    messageInfoHeaderText,
    messageInfoBodyText
}) => {
    return (
        <div className="my-4 bg-gray-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
            <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></svg></div>
                <div>
                    <p className="font-bold">{messageInfoHeaderText}</p>
                    <p className="text-sm">
                        {messageInfoBodyText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MessageInfo;