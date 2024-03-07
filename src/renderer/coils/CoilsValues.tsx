import './CoilsValues.css';
import NumberDisplay from '../reusable/NumberDisplay/NumberDisplay';

interface CoilsValuesInterface {
  voltage: number;
  amperage: number;
  color: string;
}

function CoilsValues({ voltage, amperage, color }: CoilsValuesInterface) {
  return (
    <div className="CoilsValuesContainer">
      <div className="CoilsValuesOne">
        <NumberDisplay
          value={voltage}
          color={color}
          unit="V"
          width={100}
          height={40}
        />
      </div>
      <div className="CoilsValuesTwo">
        <NumberDisplay
          value={amperage}
          color={color}
          unit="A"
          width={100}
          height={40}
        />
      </div>
    </div>
  );
}

export default CoilsValues;
