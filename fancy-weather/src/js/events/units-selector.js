import { TEMPERATURE_UNITS } from '../../constants/constants';
import switchUnits from '../utils/switch-units';

const SELECTED_UNIT_CLASS = 'selected-unit-system';

export default function unitSelector(userObj) {
  const newUserObj = userObj;
  const possibleUnitSystems = Object.keys(TEMPERATURE_UNITS);
  const unitsNodeContainer = document.querySelector('.units-selection-set');
  const unitsNodeArr = document.querySelectorAll('.unit-system');
  unitsNodeArr.forEach((currentDiv) => {
    if ([...currentDiv.classList].includes(newUserObj.userUnitSystem)) {
      currentDiv.classList.add(SELECTED_UNIT_CLASS);
    }
  });
  unitsNodeContainer.addEventListener('click', (e) => {
    const classListOfSelection = [...(e.target.classList)];
    if (!classListOfSelection.includes(newUserObj.userUnitSystem)) {
      const removeCurrentSelection = document.querySelector(`.${SELECTED_UNIT_CLASS}`);
      removeCurrentSelection.classList.remove(SELECTED_UNIT_CLASS);
      const mergedArr = classListOfSelection.concat(possibleUnitSystems);
      e.target.classList.add(SELECTED_UNIT_CLASS);
      newUserObj.userUnitSystem = mergedArr.find((curr) => {
        const firstIndex = mergedArr.indexOf(curr);
        const lastIndex = mergedArr.lastIndexOf(curr);
        return firstIndex !== lastIndex;
      });
    }
    switchUnits(newUserObj);
  });
}
