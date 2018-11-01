const Footer = () => {
    return (
        <div className="footer clearfix">
            <div className="ui fluid container footer_contain clearfix">
                <div className="ui vertically divided grid marginLR20 clearfix">
                    <div className="two column row padT10">
                        <div className="column logo_min eight wide computer eight wide tablet mobile only sixteen wide column">
                            <a className="link_tl" href="/"><img src="/static/img/logo_light.svg" className="ui image logo_light" /></a>
                        </div>
                        <div className="column eight wide computer eight wide tablet mobile only sixteen wide column">
                            <ul className="footerR">
                                <li><a className="link_tl" target="_blank" href="https://t.me/stibvn"><i aria-hidden="true" className="telegram plane icon"></i></a></li>
                                <li><a className="link_in" target="_blank" href="https://linkedin.com/company/stib-labs"><i aria-hidden="true" className="linkedin in icon"></i></a></li>
                                <li><a className="link_tw" target="_blank" href="https://twitter.com/stiblabs"><i aria-hidden="true" className="twitter icon"></i></a></li>
                                <li><a className="link_fb" target="_blank" href="https://facebook.com/stiblabs"><i aria-hidden="true" className="facebook f icon"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="clearfix marginLR20 footer_contain2">
                    <div className="alginL"><ul className="footerL">
                        <li><a href="/contact"><span>Contact Us</span></a></li>
                        <li><a href="/careers"><span>Careers</span></a></li>
                        <li><a href="/Terms">ToS</a></li>
                        <li><a href="/Privacy">Privacy</a></li>
                        <li><a href="/">Download</a></li>
                    </ul>
                    </div>
                    <div className="alginR textR">
                        <span className="copyright">© StiB Labs 2014-2140, All Rights Reserved</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;