import {useDispatch, useSelector} from "react-redux";
import {changeShowName} from "../../store/profile/action";
import './profile.css';

export const Profile = () => {
const dispatch = useDispatch()
    const date = useSelector((state) =>state)

    const handleChangeShowName = () => {
 dispatch(changeShowName)
    }

console.log(date);

    return (
        <>
    <h3> ПРОФИЛЬ</h3>
            <div className="profileRed">
                <input onClick={handleChangeShowName} type="checkbox" id="hello" name="hello" value="yes" />
                <label htmlFor="hello">Привет</label>
                {date.showName && <div>HELLO I BOT</div>}
                <button onClick={handleChangeShowName}>Change show name</button>
            </div>
        </>
    );
}
