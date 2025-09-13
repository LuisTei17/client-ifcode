import { useRouter } from "next/router";

const Pagination = () =>{

    const router = useRouter();

    return(
        <div className="navbar">
            <div className={`nav-item ${router.pathname === '/' ? 'active' : ''}`}>
                <a href="/"><img src="/icons/home.png" alt="" />Inicío</a>
            </div>
                <div className={`nav-item ${router.pathname === '/activities' ? 'active' : ''}`}>
                    <a href="/activities"><img src="/icons/search.png" alt="" />Atividades</a>
                </div>
                <div className={`nav-item ${router.pathname === '/profile' ? 'active' : ''}`}>
                    <a href="/profile"><img src="/icons/user.png" alt="" />Perfil</a>
                </div>
        </div>
    )
}

export default Pagination;