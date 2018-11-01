import Head from 'next/head';
import Footer from './Footer';
import LightDarkTheme from './LightDarkTheme';

const Layout = (props) => {
    const currnetUserId = props.currentUserId;
    let menu;

    if (currnetUserId === null || currnetUserId === undefined) {
        menu = (
            <div id="menu">
                <a href="/" style={{ marginLeft: 20 }}><img src="/static/img/logo_inside.svg" width={83} height={45} /></a>
                <div style={{ float: 'right' }}>
                    <a href="/register">Sign Up</a>
                    <a href="/login">Login</a>
                    <LightDarkTheme />
                </div>
            </div>
        )
    } else {
        menu = (
            <div id="menu">
                <a href="/" style={{ marginLeft: 20 }}><img src="/static/img/logo_inside.svg" width={83} height={45} /></a>
                <div style={{ float: 'right' }}>
                    <a href='#' onClick={props.signout}>Sign Out</a>
                    <LightDarkTheme />
                </div>
            </div>)
    }

    return (
        <div id="main">
            <Head>
                <link rel="stylesheet" type="text/css" href="/static/css/style.css" />
                <link rel="stylesheet" type="text/css" href="/static/css/custom.css" />
                <title>StiB.co</title>
                <link rel="icon" href="https://stib.co/images/stib114x114.png" />
            </Head>
            {menu}
            <div id="content">{props.children}</div>
            <Footer />
        </div>
    )
}

export default Layout;