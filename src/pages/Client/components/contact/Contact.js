import React from "react";
import "./Contact.css";

const Contact = () => (
  <div id="email">
    <div className="swan-bounded-content swan-px-0 swan-pt-7 swan-pt-0-sm">
      <section className="email-section">
        <div className="contact-container">
          <div className="contact-image">
            <img
              loading="lazy"
              src="https://cms.cloudinary.vpsvc.com/image/upload/c_scale,f_auto,q_auto,w_800/v1699834084/legacy_dam/fr-fr/S001690217.png"
              srcSet="https://cms.cloudinary.vpsvc.com/image/upload/c_scale,f_auto,q_auto,w_400/v1699834084/legacy_dam/fr-fr/S001690217.png 400w,https://cms.cloudinary.vpsvc.com/image/upload/c_scale,f_auto,q_auto,w_800/v1699834084/legacy_dam/fr-fr/S001690217.png 800w,https://cms.cloudinary.vpsvc.com/image/upload/c_scale,f_auto,q_auto,w_960/v1699834084/legacy_dam/fr-fr/S001690217.png 1920w"
              alt="Sign up for email"
              className="contact-image"
            />
          </div>
          <div className="contact-content">
            <div className="swan-p-4 swan-py-6">
              <div className="swan-text-4 swan-font-weight-bold swan-text-center swan-mb-4">
                Bienvenue sur notre liste de diffusion.
              </div>
              <div className="swan-text-3 swan-font-weight-bold swan-text-center swan-mb-6">
                Profitez de -15% sur votre commande en vous inscrivant à notre
                newsletter
              </div>
              <input
                aria-required="true"
                aria-invalid="false"
                aria-describedby="email-input-error"
                placeholder="Adresse e-mail associée à l’abonnement"
                autoComplete="email"
                type="text"
                className="swan-input swan-input-mini swan-mb-1"
                value=""
                id="auto-id-e2ox9u8a1-18"
                style={{ borderRadius: "8px", padding: "12px", width: "100%" }}
              />
              <div
                id="email-input-error"
                hidden
                className="swan-text-1 swan-text-alert"
              >
                Adresse e-mail non valide. Exemple d’adresse e-mail :{" "}
                <span>moi@email.com</span>
              </div>
              <p className="swan-text-1 swan-text-center">
                Oui, je souhaite recevoir des offres spéciales par e-mail de la
                part de Printhub, ainsi que des informations sur les produits,
                les services et mes créations en cours. Lisez notre{" "}
                <a
                  href="/politique-de-confidentialite"
                  to="/politique-de-confidentialite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swan-link"
                  style={{ display: "inline" }}
                >
                  Politique de confidentialité et d'utilisation des cookies
                </a>
                .
              </p>
              <div className="swan-grid-container" style={{ width: "100%", marginTop: "30px" }}>
                <div className="swan-row" style={{ justifyContent: "center", padding: "2px", marginBottom: "10px" }}>
                  <button
                    disabled
                    type="button"
                    className="swan-button swan-button-skin-primary swan-button-mini"
                    style={{ minWidth: "200px", borderRadius: "20px" }}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default Contact;
