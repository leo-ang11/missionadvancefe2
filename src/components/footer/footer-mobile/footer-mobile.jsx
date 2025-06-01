import { Link } from 'react-router'
import { useEffect } from 'react';

const FooterMobile = () => {

     useEffect(() => {
        const items = document.querySelectorAll('.btn-show-opt-footer');

        const toggleHandler = (event) => {
            const boxCard = event.currentTarget.querySelector('.box-opt-mobile-footer');
            boxCard.classList.toggle('active');
        };

        items.forEach((item) => {
            item.addEventListener('click', toggleHandler);
        });

        // Cleanup function
        return () => {
            items.forEach((item) => {
                item.removeEventListener('click', toggleHandler);
            });
        };
    }, []);

    return (
        <>
            <div className="list-option-mobile-footer">
                <div className="btn-show-opt-footer">
                    <button type='button'>
                        <p>Kategori</p>
                        <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.41692 20L15.0036 13.4134C15.3749 13.0367 15.5831 12.529 15.5831 12C15.5831 11.471 15.3749 10.9633 15.0036 10.5866L8.41692 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                    <ul className="box-opt-mobile-footer">
                        <li>
                            <Link to="/digital-technology">Digital & Teknologi</Link>
                        </li>
                        <li>
                            <Link to="/marketing">Pemasaran</Link>
                        </li>
                        <li>
                            <Link to="/management">Manajeman Bisnis</Link>
                        </li>
                        <li>
                            <Link to="/self-development">Pengembangan Diri</Link>
                        </li>
                        <li>
                            <Link to="/design">Desain</Link>
                        </li>
                    </ul>
                </div>
                <div className="btn-show-opt-footer">
                    <button type="button">
                        <p>Perusahaan</p>
                        <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.41692 20L15.0036 13.4134C15.3749 13.0367 15.5831 12.529 15.5831 12C15.5831 11.471 15.3749 10.9633 15.0036 10.5866L8.41692 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                    <ul className="box-opt-mobile-footer">
                        <li>
                            <Link to="/tips">Tentang Kami</Link>
                        </li>
                        <li>
                            <Link to="/faq">FAQ</Link>
                        </li>
                        <li>
                            <Link to="/privacy">Kebijakan Privasi</Link>
                        </li>
                        <li>
                            <Link to="/terms">Ketentuan Layanan</Link>
                        </li>
                        <li>
                            <Link to="/help">Bantuan</Link>
                        </li>
                    </ul>
                </div>
                <div className="btn-show-opt-footer">
                    <button type="button">
                        <p>Komunitas</p>
                        <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.41692 20L15.0036 13.4134C15.3749 13.0367 15.5831 12.529 15.5831 12C15.5831 11.471 15.3749 10.9633 15.0036 10.5866L8.41692 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                    <ul className="box-opt-mobile-footer">
                        <li>
                            <Link to="/tips">Tips Sukses</Link>
                        </li>
                        <li>
                            <Link to="/blogs">Blog</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default FooterMobile