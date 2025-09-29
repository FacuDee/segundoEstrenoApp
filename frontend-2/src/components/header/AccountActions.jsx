const AccountActions = ({ onLogin, onRegister }) => (
  <div className="account-actions">
    <button className="account-link" id="btnRegister" type="button" onClick={onRegister}>
      CREAR CUENTA
    </button>
    <span className="divider">|</span>
    <button className="account-link" id="btnLogin" type="button" onClick={onLogin}>
      INICIAR SESIÓN
    </button>
  </div>
);
export default AccountActions;
