import React from 'react';
import {Link} from "react-router-dom";


/**
 * Some of the very first pieces of react I've written. I am opposite of proud of this.
 */
function Footer() {
    return (
        <div class="footer">
            <div class="footer-buttons">
                <div to="/" class="footerhead" type="b1"> SatVI </div>
                <div to="/" class="footerhead" type="b2"> Subscribe </div>
                <div to="/" class="footerhead" type="b3"> Contact </div>
                <div to="/" class="footerhead" type="b4"> App</div>

                <Link to="/" class="footerelement" type="b5"> About </Link>
                <Link to="/" class="footerelement" type="b6"> Seller </Link>
                <Link to="/" class="footerelement" type="b7"> yektaseckinsatir.com </Link>
                <Link to="/" class="footerelement" type="b8"> Google Play </Link>

                <Link to="/" class="footerelement" type="b9"> Help </Link>
                <Link to="/" class="footerelement" type="b10"> Buyer </Link>
                <Link to="/" class="footerelement" type="b11"> Contribute </Link>
                <Link to="/" class="footerelement" type="b12"> App Store </Link>
            </div>
        </div>
    );
}

export default Footer;
