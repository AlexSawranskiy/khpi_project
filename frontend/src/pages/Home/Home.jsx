import React, { useEffect } from "react";
import "./Home.css";
import { useLanguage } from "../../contexts/LanguageContext";

function Home() {
  const { t } = useLanguage();
  
  useEffect(() => {
    document.title = t('home.title') + " · KHPI Project";
  }, [t]);

  return (
    <main className="home-page">
      <div className="container">
        <div className="content">
          <div>
            <h1>{t('home.welcome')}</h1>
            <p>{t('home.description1')}</p>
            <p>{t('home.description2')}</p>
            <p>{t('home.description3')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
