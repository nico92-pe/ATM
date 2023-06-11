const ATMDeposit = ({ onChange, isDeposit, atmMode, validTransaction}) => {
  const choice = ['Deposit', 'Cash Back'];
  let visible = (atmMode == "") ? false : true;
  console.log(`ATM isDeposit: ${atmMode}`);
  let isValid = validTransaction;
  return (
    <label className="label huge">
      <h3> {atmMode}</h3>
      {
        visible && <div>
            <input id="number-input" type="number" width="200" onChange={onChange}></input>
            <input type="submit" width="200" value="Submit" id="submit-input" disabled={isValid}></input>
        </div>
      }
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setatmMode] = React.useState('');
  const atmOpt = ['', 'Deposit', 'Cash Back'];
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if ((atmMode == 'Cash Back') && (event.target.value > totalState)){
      setValidTransaction(true);
    } else {
      setValidTransaction(false);
      setDeposit(Number(event.target.value));
    }
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setatmMode(event.target.value);
    event.preventDefault();
    if (event.target.value == 'Deposit') {
      setIsDeposit(true);
    } else if (event.target.value == 'Cash Back') {
      setIsDeposit(false);
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select className="container" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} validTransaction={validTransaction}></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
