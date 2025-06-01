import logo from '../../image/mission3-login-logo.png'
import CategoryList from './footer-child/category-list'
import CompanyList from './footer-child/company-list'
import ComunityList from './footer-child/comunity-list'
import FooterMobile from './footer-mobile/footer-mobile'
import Copyright from './bottom-footer/copyright'
import SocialMedia from './bottom-footer/social-media'

const Footer = () => {
    return (
        <>
        <footer>
                <div className="box-footer">
                    <div className="top-footer">
                        <div className="card-left-footer">
                            <div className="logo-footer">
                                <img src={logo} alt="logo" />
                            </div>
                            <h4>Gali Potensi Anda Melalui Pembelajaran Video di videobelajar.com</h4>
                            <p className="address-footer">Jl. Usman Effendi No. 50 Lowokwaru, Malang <br /> +62 877-7123-1234</p>
                        </div>
                        <div className="card-right-footer">
                            <CategoryList />
                            <CompanyList />
                            <ComunityList />
                        </div>
                        <FooterMobile />
                    </div>
                    <div className="bottom-footer">
                        <Copyright />
                        <SocialMedia />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer