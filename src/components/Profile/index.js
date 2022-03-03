import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import './profile.css';
import { useContext,  useState } from "react";
import { set } from "@firebase/database";
import {ThemeContext} from "@emotion/react";
import {Form} from "../Form";
import {selectName, selectShowName} from "../../store/profile/selectors";
import {changeName, changeShowName} from "../../store/profile/actions";
import {usePrev} from "../../utils/usePrev";
import {
    auth,
    getProfileNameRef,
    logout,
    profileShowNameRef,
} from "../../services/firebase";


export const Profile = () => {
    const { setMessageColor } = useContext(ThemeContext);

    const dispatch = useDispatch();
    const showName = useSelector(selectShowName , shallowEqual);
    const name = useSelector(selectName);

    const handleChangeShowName = () => {
        dispatch(changeShowName);
    };

    const handleClick = () => {
        setMessageColor((prevColor) => (prevColor === "red" ? "blue" : "red"));
    };

    const handleChangeName = (text) => {
        dispatch(changeName(text));
    };

    return (
        <>
            <h3>Profile</h3>
            <div>
                <button onClick={handleClick}>Change theme</button>
            </div>
            <div>
                {showName && <span>{name}</span>}
                <input type="checkbox" />
                <button onClick={handleChangeShowName}>Change show name</button>
            </div>
            <Form onSubmit={handleChangeName} />
        </>
    );
};

export const ProfileToConnect = () => {
    const { setMessageColor } = useContext(ThemeContext);
    const [name, setName] = useState ("");
    const [showName, setShowName] = useState(false);

    const handleChangeShowName = () => {
        set(profileShowNameRef , !showName);
    };

    const handleClick = () => {
        setMessageColor((prevColor) => (prevColor === "red" ? "blue" : "red"));
    };
    const prevShowName = usePrev(showName);
    const handleChangeName = (text) => {
        console.log(auth.currentUser);
        set(getProfileNameRef(auth.currentUser.uid), text);
    };
    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.warn(e);
        }
    };
    return (
        <>
            <h3>Profile</h3>
            <div>
                <button onClick={handleLogout}>login</button>
            </div>
            <div>
                <button onClick={handleClick}>change</button>
            </div>
            <div>
                {showName && <span>{name}</span>}
                <input type="checkbox" />
                <button onClick={handleChangeShowName}>Change show name</button>
            </div>
            <Form onSubmit={handleChangeName} />
        </>
    );
};

const mapStateToProps = (state) => ({
    showName: selectShowName(state),
    name: selectName(state),
});

const mapDispatchToProps = {
    setShowName: () => changeShowName,
    setName: changeName,
};

const ConnectedProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileToConnect);
export default ConnectedProfile;
