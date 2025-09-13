import React from 'react';

const SocialLogin: React.FC = () => {
    const handleGoogleLogin = () => {
        // Implement Google login logic here
    };

    const handleFacebookLogin = () => {
        // Implement Facebook login logic here
    };

    return (
        <div className="social-login">
            <h2>Login with</h2>
            <button onClick={handleGoogleLogin} className="google-login">
                Login with Google
            </button>
            <button onClick={handleFacebookLogin} className="facebook-login">
                Login with Facebook
            </button>
        </div>
    );
};

export default SocialLogin;