const isLogin = () => {
    return !!sessionStorage.getItem("user");
};

export default isLogin;