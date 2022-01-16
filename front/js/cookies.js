const setCookie = (cname, cval, expDays = 2) => {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expire = "expires=" + date.toUTCString;
    document.cookie = cname + "=" + cval + ";" + expire + ";path=/";
}

const getCookie = (cname) => {
    let cookie = document.cookie;
    if (document.cookie !== "") {
        cookie = cookie.split(";");
        for (let i in cookie) {
            let tmp = cookie[i].split("=");
            if (tmp[0].trim() === cname) {
                return tmp[1];
            }
        }
        return false;
    }
    else
        return false;
}

window.onload = () => {
    if (!getCookie("cart")) {
        setCookie("cart", "[]");
    }
}