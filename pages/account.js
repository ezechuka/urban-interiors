import { useSelector } from "react-redux"

const Account = () => {
    const account = useSelector(state => state.persistFirebase.auth)
    return (
        <p>
            {account.uid}
        </p>
    )
}

export default Account