import logo from '../../img/logo.png';

function AuthLogo() {
    return (
        <div className="auth-logo">
            <img src={logo} alt="logo" />
            <p>World Tours</p>
        </div>
    );
}

export default AuthLogo;