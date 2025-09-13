import React from 'react';

const SocialLogin: React.FC = () => {
    const handleGoogleLogin = () => {
        // Implement Google login logic here
    };


    return (
        <div className="social-login">
            <h2>Login with</h2>
            <button onClick={handleGoogleLogin} className="google-login">
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;