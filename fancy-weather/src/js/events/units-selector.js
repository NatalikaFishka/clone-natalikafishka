import { TEMPERATURE_UNITS } from '../../constants/constants';
import switchUnits from '../utils/switch-units';

const SELECTED_UNIT_CLASS = 'selected-unit-system';

export default function unitSelector(userObj) {
    const possibleUnitSystems = Object.keys(TEMPERATURE_UNITS);
    const unitsNodeContainer = document.querySelector('.units-selection-set');
    const unitsNodeArr = document.querySelectorAll('.unit-system');
    unitsNodeArr.forEach((curentDiv) => {
        if ([...curentDiv.classList].includes(userObj.userUnitSystem)) {
            curentDiv.classList.add(SELECTED_UNIT_CLASS);
        }
    });
    unitsNodeContainer.addEventListener('click', (e) => {
        const classListOfSelection = [...(e.target.classList)];
        if (!classListOfSelection.includes(userObj.userUnitSystem)) {
            const removeCurrentSelection = document.querySelector(`.${SELECTED_UNIT_CLASS}`);
            removeCurrentSelection.classList.remove(SELECTED_UNIT_CLASS);
            const mergedArr = classListOfSelection.concat(possibleUnitSystems);
            e.target.classList.add(SELECTED_UNIT_CLASS);
            userObj.userUnitSystem = mergedArr.find((curr) => {
                return (mergedArr.indexOf(curr) !== mergedArr.lastIndexOf(curr));
            })
        }
        console.log(userObj.userUnitSystem);
        switchUnits(userObj);
    });
}