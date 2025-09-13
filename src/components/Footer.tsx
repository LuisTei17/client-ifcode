import Script from "next/script";

const Footer = () => {
    return (
        <>
        <Script
                src="https://kit.fontawesome.com/fff353ec8e.js"
                crossOrigin="anonymous"
                strategy="beforeInteractive" // carrega antes do React
            />

        <footer>
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="/icons/Logo.svg" alt="" />
                </div>

                <div className="Sobre">
                    <ul>
                        <li>ConectaCare</li>
                        <p><a href="">Sobre</a></p>
                        <p><a href="">Contato</a></p>
                        <p><a href="">Endereço</a></p>
                    </ul>
                </div>


                <div className="Servicos">
                    <ul>
                        <li>Clientes</li>
                        <p><a href="">Serviços</a></p>
                        <p><a href="">Encontros</a></p>
                        <p><a href="">Pessoas</a></p>
                    </ul>
                </div>


                <div className="Perfil">
                    <ul>
                        <li>Colaboradores</li>
                        <p>Mauricio Scheffer<a href=""><i className="fa-brands fa-instagram"></i></a>
                            <a href=""><i className="fa-brands fa-linkedin"></i></a>
                            <a href=""><i className="fa-brands fa-github"></i></a></p>

                        <p>João Andrey<a href=""><i className="fa-brands fa-instagram"></i></a>
                            <a href=""><i className="fa-brands fa-linkedin"></i></a>
                            <a href=""><i className="fa-brands fa-github"></i></a></p>

                        <p>Luis Eduardo<a href=""><i className="fa-brands fa-instagram"></i></a>
                            <a href=""><i className="fa-brands fa-linkedin"></i></a>
                            <a href=""><i className="fa-brands fa-github"></i></a></p>

                        <p>Denis Jesus<a href=""><i className="fa-brands fa-instagram"></i></a>
                            <a href=""><i className="fa-brands fa-linkedin"></i></a>
                            <a href=""><i className="fa-brands fa-github"></i></a></p>

                        <p>Ismael Machado<a href=""><i className="fa-brands fa-instagram"></i></a>
                            <a href=""><i className="fa-brands fa-linkedin"></i></a>
                            <a href=""><i className="fa-brands fa-github"></i></a></p>
                    </ul>
                </div>
                <a href="#" className="flecha"><i className="fa-solid fa-arrow-up"></i></a>
            </div>

            <div className="bottom-footer">

                <div className="copyright">
                    <p>© 2024 - Todos Os Direitos Reservados</p>
                    <p>Pensado, projetado e desenvolvido pelos Colaboradores</p>
                    <p>Política de Privacidade</p>
                </div>
            </div>
        </footer>
        </>
    );
};

export default Footer;