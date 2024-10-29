import React from 'react';
import Banner from '../../components/Banner.jsx';
import Item from '../../components/Item.jsx';
import FeaturesItemData from '../../data/FeaturesItemData.json';
import iconChat from '../../assets/icons/icon-chat.png';
import iconMoney from '../../assets/icons/icon-money.png';
import iconSecurity from '../../assets/icons/icon-security.png';
import '../../sass/pages/_Home.scss';

function Home () {
    const imageData = {
        "icon-chat.png": iconChat,
        "icon-money.png": iconMoney,
        "icon-security.png": iconSecurity
    }

    return (
        <div className='homepage'>
            <main>
                {}
                <Banner />
                <section className="features">
                    <h2 className='sr-only'>Features</h2>
                    {}
                    {FeaturesItemData.map((data) => (
                        < Item 
                            key={data.id}
                            image={imageData[data.image]}
                            descriptionImage={data.descriptionImage}
                            title={data.title}
                            description={data.description}
                        />
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Home