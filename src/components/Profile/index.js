import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import './profile.css';
import {useContext} from "react";
import {ThemeContext} from "@emotion/react";
import {Form} from "../Form";
import {selectName, selectShowName} from "../../store/profile/selectors";
import {changeName, changeShowName} from "../../store/profile/actions";

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

export const ProfileToConnect = ({ showName, name, setName, setShowName }) => {
    const { setMessageColor } = useContext(ThemeContext);

    const handleChangeShowName = () => {
        // dispatch(changeShowName);
        setShowName();
    };

    const handleClick = () => {
        setMessageColor((prevColor) => (prevColor === "red" ? "blue" : "red"));
    };

    const handleChangeName = (text) => {
        // dispatch(changeName(text));
        setName(text);
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
