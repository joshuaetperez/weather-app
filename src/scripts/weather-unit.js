const CurrentUnit = (() => {
  let weatherUnit = 'imperial';

  const getUnit = () => weatherUnit;
  const toggleUnit = () => {
    weatherUnit = weatherUnit === 'imperial' ? 'metric' : 'imperial';
    return weatherUnit;
  };

  return { getUnit, toggleUnit };
})();

export default CurrentUnit;
