const Pagination = () =>{
    return(
        <div className="navbar">
            <div className="nav-item">
                <a href="/index"><img src="/icons/home.png" alt="" />Inicío</a>
            </div>
                <div className="nav-item">
                    <a href="/activities"><img src="/icons/search.png" alt="" />Atividades</a>
                </div>
                <div className="nav-item">
                    <a href="/profile"><img src="/icons/user.png" alt="" />Perfil</a>
                </div>

        </div>
    )
}

export default Pagination;